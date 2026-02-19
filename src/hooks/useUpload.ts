"use client";

import { useCallback, useState } from "react";

export interface UseUploadOptions {
  /** Type de fichier pour le chemin S3 (ex: product, profile) */
  type?: string;
  /** Préfixe du chemin S3 (ex: sellers/abc123, users/userId) */
  prefix?: string;
  /** URL de l'endpoint d'upload (défaut: /api/upload) */
  endpoint?: string;
}

export interface UseUploadResult {
  /** Envoie les fichiers vers l'API et retourne les URLs publiques */
  uploadFiles: (
    files: File[],
    overrides?: Pick<UseUploadOptions, "type" | "prefix">
  ) => Promise<string[]>;
  /** True pendant l'upload */
  isUploading: boolean;
  /** Dernière erreur rencontrée */
  error: Error | null;
  /** Réinitialise l'état d'erreur */
  reset: () => void;
}

/**
 * Hook réutilisable pour l'upload de fichiers vers S3 via l'API /api/upload.
 * Utilisable dans ProductFormModal, profil, etc.
 */
export function useUpload(options: UseUploadOptions = {}): UseUploadResult {
  const { type = "upload", prefix = "uploads", endpoint = "/api/upload" } = options;
  const [isUploading, setIsUploading] = useState(false);
  const [error, setError] = useState<Error | null>(null);

  const reset = useCallback(() => {
    setError(null);
  }, []);

  const uploadFiles = useCallback(
    async (
      files: File[],
      overrides?: Pick<UseUploadOptions, "type" | "prefix">
    ): Promise<string[]> => {
      if (files.length === 0) return [];
      setError(null);
      setIsUploading(true);
      const resolvedType = overrides?.type ?? type;
      const resolvedPrefix = overrides?.prefix ?? prefix;
      const urls: string[] = [];

      try {
        for (const file of files) {
          const formData = new FormData();
          formData.append("file", file);
          formData.append("type", resolvedType);
          formData.append("prefix", resolvedPrefix);

          const res = await fetch(endpoint, {
            method: "POST",
            body: formData,
            credentials: "include",
          });

          const data = await res.json().catch(() => ({}));
          if (!res.ok) {
            throw new Error(data.error ?? `Upload échoué (${res.status})`);
          }
          if (data.url) {
            urls.push(data.url);
          }
        }
        return urls;
      } catch (err) {
        const e = err instanceof Error ? err : new Error(String(err));
        setError(e);
        throw e;
      } finally {
        setIsUploading(false);
      }
    },
    [type, prefix, endpoint]
  );

  return { uploadFiles, isUploading, error, reset };
}
