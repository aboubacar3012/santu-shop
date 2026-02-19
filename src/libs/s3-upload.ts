/**
 * Module pour la gestion des uploads vers AWS S3.
 * Utilisé par l'API route /api/upload (côté serveur uniquement).
 */

import { DeleteObjectCommand, PutObjectCommand, S3Client } from "@aws-sdk/client-s3";
import slugify from "slugify";

const region = process.env.AWS_REGION || "eu-west-3";

export const s3Client = new S3Client({
  region,
  ...(process.env.AWS_ACCESS_KEY_ID &&
    process.env.AWS_SECRET_ACCESS_KEY && {
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
    }),
});

export const CONFIG = {
  buckets: {
    images: process.env.AWS_S3_BUCKET || process.env.AWS_S3_BUCKET_IMAGES || "santu-images",
    documents: process.env.AWS_S3_BUCKET_DOCUMENTS || "santu-documents",
  },
  mimeTypes: {
    "image/png": "image/png",
    "image/jpeg": "image/jpeg",
    "image/jpg": "image/jpeg",
    "image/gif": "image/gif",
    "image/webp": "image/webp",
    "application/pdf": "application/pdf",
  },
} as const;

export function getContentType(filename: string): string {
  const ext = filename.split(".").pop()?.toLowerCase() || "";
  const map: Record<string, string> = {
    pdf: "application/pdf",
    jpg: "image/jpeg",
    jpeg: "image/jpeg",
    png: "image/png",
    gif: "image/gif",
    webp: "image/webp",
  };
  return map[ext] || "application/octet-stream";
}

/**
 * Génère un nom de fichier unique pour S3.
 * @param originalName - Nom original du fichier
 * @param prefix - Préfixe du chemin (ex: "sellers/abc123", "users/userId")
 * @param type - Type de fichier (product, profile, etc.)
 */
export function generateFileName(
  originalName: string,
  prefix: string,
  type: string = "upload"
): string {
  const ext = originalName.split(".").pop() || "";
  const timestamp = Date.now();
  const typeSlug = slugify(type, { lower: true });
  const safeName = `${typeSlug}-${timestamp}.${ext}`;
  return prefix ? `${prefix}/${safeName}` : safeName;
}

export interface UploadToS3Options {
  file: Buffer;
  fileName: string;
  prefix: string;
  type?: string;
  bucket?: keyof typeof CONFIG.buckets;
}

/**
 * Upload un fichier vers S3 et retourne l'URL publique.
 * L'URL utilise AWS_CLOUDFRONT_URL si défini, sinon construction manuelle du bucket.
 */
export async function uploadToS3(
  options: UploadToS3Options
): Promise<{ url: string; key: string }> {
  const { file, fileName, prefix, type = "upload", bucket = "images" } = options;
  const bucketName = CONFIG.buckets[bucket];
  if (!bucketName) {
    throw new Error(`Bucket "${bucket}" inconnu`);
  }

  const key = generateFileName(fileName, prefix, type);

  await s3Client.send(
    new PutObjectCommand({
      Bucket: bucketName,
      Key: key,
      Body: file,
      ContentType: getContentType(fileName),
    })
  );

  const baseUrl =
    process.env.AWS_CLOUDFRONT_URL || "https://d3bbqgk5b9zmaq.cloudfront.net";
  const url = `${baseUrl.replace(/\/$/, "")}/${key}`;

  return { url, key };
}

/**
 * Extrait la clé S3 à partir d'une URL (CloudFront ou S3).
 * Ex: https://d3bbqgk5b9zmaq.cloudfront.net/prefix/product-123.jpg → prefix/product-123.jpg
 */
export function getS3KeyFromUrl(imageUrl: string): string | null {
  try {
    const url = new URL(imageUrl);
    const path = url.pathname.replace(/^\//, "");
    return path || null;
  } catch {
    return null;
  }
}

/**
 * Supprime des objets S3 à partir de leurs URLs (CloudFront ou S3).
 * Ignore les URLs qui ne correspondent pas à notre bucket (ex: blob:, autres domaines).
 */
export async function deleteImagesFromS3(
  imageUrls: string[],
  bucket: keyof typeof CONFIG.buckets = "images"
): Promise<void> {
  const bucketName = CONFIG.buckets[bucket];
  if (!bucketName) return;

  const cloudfrontHost = "d3bbqgk5b9zmaq.cloudfront.net";
  const customHost = process.env.AWS_CLOUDFRONT_URL
    ? new URL(process.env.AWS_CLOUDFRONT_URL).hostname
    : cloudfrontHost;

  const keys: string[] = [];
  for (const urlStr of imageUrls) {
    if (!urlStr || urlStr.startsWith("blob:")) continue;
    try {
      const url = new URL(urlStr);
      const isOurCdn =
        url.hostname === cloudfrontHost ||
        url.hostname === customHost ||
        url.hostname.endsWith(".s3." + region + ".amazonaws.com");
      if (!isOurCdn) continue;
      const key = url.pathname.replace(/^\//, "");
      if (key) keys.push(key);
    } catch {
      // URL invalide, on ignore
    }
  }

  await Promise.all(
    keys.map((key) =>
      s3Client.send(
        new DeleteObjectCommand({
          Bucket: bucketName,
          Key: key,
        })
      )
    )
  );
}
