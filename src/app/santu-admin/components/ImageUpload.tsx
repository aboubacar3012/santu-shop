"use client";

import { useState, useRef, useEffect } from "react";
import Image from "next/image";
import { Upload, Trash2 } from "lucide-react";

export interface ImageUploadProps {
  /** Images sélectionnées (fichiers) */
  images: File[];
  /** URLs de prévisualisation (blob URLs ou URLs existantes) */
  imagePreviews: string[];
  /** Callback appelé quand les images changent */
  onChange: (images: File[], previews: string[]) => void;
  /** Nombre minimum d'images requises */
  minImages?: number;
  /** Nombre maximum d'images autorisées */
  maxImages?: number;
  /** Label affiché au-dessus de la zone d'upload */
  label?: string;
  /** Désactiver l'upload */
  disabled?: boolean;
}

export function ImageUpload({
  images,
  imagePreviews,
  onChange,
  minImages = 2,
  maxImages,
  label = "Images",
  disabled = false,
}: ImageUploadProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (disabled) return;

    const files = Array.from(e.target.files || []);
    const imageFiles = files.filter((file) => file.type.startsWith("image/"));

    if (imageFiles.length === 0) return;

    // Vérifier la limite maximale
    const totalAfterAdd = images.length + imageFiles.length;
    if (maxImages && totalAfterAdd > maxImages) {
      const allowed = maxImages - images.length;
      if (allowed <= 0) {
        alert(`Vous ne pouvez pas ajouter plus de ${maxImages} images`);
        return;
      }
      imageFiles.splice(allowed);
      alert(`Seulement ${allowed} image(s) ajoutée(s) (limite: ${maxImages})`);
    }

    const newImages = [...images, ...imageFiles];

    // Créer les previews pour les nouveaux fichiers
    const newPreviews = imageFiles.map((file) => URL.createObjectURL(file));
    const updatedPreviews = [...imagePreviews, ...newPreviews];

    onChange(newImages, updatedPreviews);

    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const removeImage = (index: number) => {
    if (disabled) return;

    const newImages = images.filter((_, i) => i !== index);
    const previewToRemove = imagePreviews[index];

    // Révoquer l'URL blob si c'est une preview temporaire
    if (previewToRemove.startsWith("blob:")) {
      URL.revokeObjectURL(previewToRemove);
    }

    const newPreviews = imagePreviews.filter((_, i) => i !== index);
    onChange(newImages, newPreviews);
  };

  // Nettoyer les URLs blob lors du démontage
  useEffect(() => {
    return () => {
      imagePreviews.forEach((preview) => {
        if (preview.startsWith("blob:")) {
          URL.revokeObjectURL(preview);
        }
      });
    };
  }, []);

  const isMinReached = imagePreviews.length >= minImages;
  const remainingSlots = maxImages ? maxImages - imagePreviews.length : null;

  return (
    <div className="space-y-3">
      <label className="block text-sm font-medium text-gray-900">
        {label}
        {minImages > 0 && (
          <>
            {" "}
            <span className="text-red-500">*</span>
            <span className="text-xs text-gray-500 font-normal ml-2">
              (minimum {minImages} image{minImages > 1 ? "s" : ""} requise
              {minImages > 1 ? "s" : ""}
              {maxImages ? `, maximum ${maxImages}` : ""})
            </span>
          </>
        )}
      </label>

      {/* Zone de drop/upload */}
      {(!maxImages || imagePreviews.length < maxImages) && (
        <div
          onClick={() => !disabled && fileInputRef.current?.click()}
          className={`border-2 border-dashed rounded-lg p-6 text-center transition-colors ${
            disabled
              ? "border-gray-200 bg-gray-50 cursor-not-allowed"
              : "border-gray-300 cursor-pointer hover:border-gray-400 hover:bg-gray-50"
          }`}
        >
          <Upload
            className={`w-8 h-8 mx-auto mb-2 ${
              disabled ? "text-gray-300" : "text-gray-400"
            }`}
          />
          <p className={`text-sm mb-1 ${disabled ? "text-gray-400" : "text-gray-600"}`}>
            Cliquez pour sélectionner des images
          </p>
          <p className="text-xs text-gray-500">
            Formats acceptés: JPG, PNG, WEBP
            {remainingSlots !== null && remainingSlots > 0 && (
              <> ({remainingSlots} emplacement{remainingSlots > 1 ? "s" : ""} restant{remainingSlots > 1 ? "s" : ""})</>
            )}
          </p>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleImageSelect}
            disabled={disabled}
            className="hidden"
          />
        </div>
      )}

      {/* Prévisualisation des images */}
      {imagePreviews.length > 0 && (
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mt-4">
          {imagePreviews.map((preview, index) => (
            <div
              key={index}
              className="relative group aspect-square rounded-lg overflow-hidden border border-gray-200"
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
                sizes="(max-width: 640px) 50vw, 33vw"
                unoptimized={preview.startsWith("blob:")}
              />
              {!disabled && (
                <button
                  type="button"
                  onClick={() => removeImage(index)}
                  className="absolute top-2 right-2 p-1.5 bg-red-500 text-white rounded-full opacity-0 group-hover:opacity-100 transition-opacity hover:bg-red-600"
                  aria-label="Supprimer l'image"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              )}
              <div className="absolute bottom-0 left-0 right-0 bg-black/50 text-white text-xs py-1 px-2 text-center">
                Image {index + 1}
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Message d'erreur si moins que le minimum */}
      {imagePreviews.length > 0 && imagePreviews.length < minImages && (
        <p className="text-sm text-red-600">
          ⚠️ Veuillez ajouter au moins {minImages - imagePreviews.length} image(s)
          supplémentaire(s)
        </p>
      )}

      {/* Message d'info si le maximum est atteint */}
      {maxImages && imagePreviews.length >= maxImages && (
        <p className="text-sm text-blue-600">
          ✓ Limite de {maxImages} image{maxImages > 1 ? "s" : ""} atteinte
        </p>
      )}
    </div>
  );
}
