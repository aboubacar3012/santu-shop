"use client";

import { useMemo, useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { useQuery } from "@tanstack/react-query";
import slugify from "slugify";
import type { Product, ProductFormData, CreateProductInput } from "../types";
import { useUpload } from "@/hooks/useUpload";
import { ImageUpload } from "./ImageUpload";

type Category = {
  id: string;
  label: string;
  slug: string;
  description?: string;
};

type CategoriesApiResponse = {
  categories: Category[];
};

async function fetchCategories(): Promise<CategoriesApiResponse> {
  const res = await fetch("/api/categories", { credentials: "include" });
  if (!res.ok) {
    const json = await res.json().catch(() => ({}));
    throw new Error(json.error ?? "Erreur lors du chargement des catégories");
  }
  return res.json();
}

const defaultProductForm: ProductFormData = {
  title: "",
  description: "",
  categoryId: "",
  price: "",
  available: true,
  quantity: "",
};

export interface ProductFormModalProps {
  isOpen: boolean;
  editingProduct: Product | null;
  /** id, name, slug requis ; firstName + lastName optionnels pour le préfixe S3 (firstname-lastname-id) */
  seller: {
    id: string;
    name: string;
    slug: string;
    firstName?: string;
    lastName?: string;
  };
  onClose: () => void;
  onSubmit: (product: CreateProductInput) => void;
  isLoading?: boolean;
  error?: string;
}

export function ProductFormModal({
  isOpen,
  editingProduct,
  seller,
  onClose,
  onSubmit,
  isLoading = false,
  error,
}: ProductFormModalProps) {
  const [productForm, setProductForm] = useState<ProductFormData>(defaultProductForm);
  const [images, setImages] = useState<File[]>([]);
  const [imagePreviews, setImagePreviews] = useState<string[]>([]);
  const lastInitializedKeyRef = useRef<string | null>(null);

  const uploadPrefix = useMemo(() => {
    const { id, firstName, lastName } = seller;
    if (firstName && lastName) {
      return `${slugify(firstName, { lower: true })}-${slugify(lastName, { lower: true })}-${id}`;
    }
    return `sellers/${id}`;
  }, [seller.id, seller.firstName, seller.lastName]);

  const { uploadFiles, isUploading: isUploadingImages, error: uploadError } = useUpload({
    type: "product",
    prefix: uploadPrefix,
  });

  // Récupérer les catégories depuis l'API
  const {
    data: categoriesData,
    isLoading: categoriesLoading,
    error: categoriesError,
  } = useQuery({
    queryKey: ["categories"],
    queryFn: fetchCategories,
  });

  const categories = categoriesData?.categories ?? [];

  const editingProductId = editingProduct?.id ?? null;
  const initKey = isOpen ? (editingProductId ?? "new") : null;

  useEffect(() => {
    if (!isOpen) {
      lastInitializedKeyRef.current = null;
      setProductForm(defaultProductForm);
      setImages([]);
      setImagePreviews([]);
      return;
    }

    if (initKey === null) return;
    if (lastInitializedKeyRef.current === initKey) return;

    lastInitializedKeyRef.current = initKey;

    if (editingProductId && editingProduct) {
      setProductForm({
        title: editingProduct.title,
        description: editingProduct.description,
        categoryId: editingProduct.categoryId,
        price: editingProduct.price.toString(),
        originalPrice: editingProduct.originalPrice?.toString() ?? "",
        available: editingProduct.available ?? true,
        quantity: (editingProduct.quantity ?? 0).toString(),
      });
      setImagePreviews([...editingProduct.images]);
      setImages([]);
      return;
    }

    if (categories.length === 0 && categoriesLoading) return;

    const defaultCategoryId = categories.length > 0 ? categories[0].id : "";
    setProductForm({
      ...defaultProductForm,
      categoryId: defaultCategoryId,
    });
    setImages([]);
    setImagePreviews([]);
    // initKey (isOpen + editingProductId) évite de réagir au changement de référence de editingProduct
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isOpen, initKey, editingProductId, categories.length, categoriesLoading]);

  const handleImagesChange = (newImages: File[], newPreviews: string[]) => {
    setImages(newImages);
    setImagePreviews(newPreviews);
  };

  const updateProductForm = (
    field: keyof ProductFormData,
    value: string | boolean
  ) => {
    setProductForm((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (isLoading || isUploadingImages) return;

    const totalImages = imagePreviews.length;
    if (totalImages < 2) {
      alert("Veuillez uploader au moins 2 images");
      return;
    }

    // URLs existantes (édition) + upload des nouveaux fichiers vers S3
    const existingUrls = imagePreviews.filter((p) => !p.startsWith("blob:"));
    let imageUrls: string[];
    if (images.length > 0) {
      try {
        const uploadedUrls = await uploadFiles(images, {
          type: "product",
          prefix: uploadPrefix,
        });
        imageUrls = [...existingUrls, ...uploadedUrls];
      } catch {
        return; // uploadFiles already set error state
      }
    } else {
      imageUrls = existingUrls;
    }

    const price = parseFloat(productForm.price);
    const quantity = parseInt(productForm.quantity, 10) || 0;
    const originalPriceRaw = productForm.originalPrice?.trim();
    const originalPrice =
      originalPriceRaw !== undefined && originalPriceRaw !== ""
        ? parseFloat(originalPriceRaw)
        : undefined;

    const payload: CreateProductInput = {
      title: productForm.title.trim(),
      description: productForm.description.trim(),
      categoryId: productForm.categoryId,
      images: imageUrls,
      price: Number.isFinite(price) ? price : 0,
      originalPrice:
        originalPrice !== undefined && Number.isFinite(originalPrice)
          ? originalPrice
          : undefined,
      available: productForm.available,
      quantity: quantity >= 0 ? quantity : 0,
    };
    onSubmit(payload);

    // Note: Le cleanup et la fermeture du modal sont gérés par le parent (SellerDetailView)
  };


  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
        <div className="sticky top-0 bg-white border-b border-gray-200 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl font-bold text-gray-900">
            {editingProduct ? "Modifier le produit" : "Ajouter un produit"}
          </h2>
          <button
            type="button"
            onClick={onClose}
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Fermer"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {(error || uploadError) && (
            <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
              {uploadError?.message ?? error}
            </div>
          )}
          <div>
            <label
              htmlFor="admin-product-title"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Titre du produit
            </label>
            <input
              id="admin-product-title"
              type="text"
              required
              value={productForm.title}
              onChange={(e) => updateProductForm("title", e.target.value)}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
              placeholder="Ex: T-shirt coton premium"
            />
          </div>
          <div>
            <label
              htmlFor="admin-product-desc"
              className="block text-sm font-medium text-gray-900 mb-2"
            >
              Description
            </label>
            <textarea
              id="admin-product-desc"
              required
              value={productForm.description}
              onChange={(e) => updateProductForm("description", e.target.value)}
              rows={4}
              className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent resize-none"
              placeholder="Décrivez votre produit..."
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="admin-product-category"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Catégorie
              </label>
              <select
                id="admin-product-category"
                value={productForm.categoryId}
                onChange={(e) => updateProductForm("categoryId", e.target.value)}
                disabled={categoriesLoading || categories.length === 0}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {categoriesLoading ? (
                  <option value="">Chargement des catégories...</option>
                ) : categories.length === 0 ? (
                  <option value="">Aucune catégorie disponible</option>
                ) : (
                  categories.map((cat) => (
                    <option key={cat.id} value={cat.id}>
                      {cat.label}
                    </option>
                  ))
                )}
              </select>
              {categoriesError && (
                <p className="text-xs text-red-600 mt-1">
                  Erreur lors du chargement des catégories
                </p>
              )}
            </div>
            <div>
              <label
                htmlFor="admin-product-price"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Prix (GNF)
              </label>
              <input
                id="admin-product-price"
                type="number"
                required
                min={0}
                step={1000}
                value={productForm.price}
                onChange={(e) => updateProductForm("price", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="50000"
              />
            </div>
            <div>
              <label
                htmlFor="admin-product-original-price"
                className="block text-sm font-medium text-gray-500 mb-2"
              >
                Prix barré (optionnel, GNF)
              </label>
              <input
                id="admin-product-original-price"
                type="number"
                min={0}
                step={1000}
                value={productForm.originalPrice ?? ""}
                onChange={(e) => updateProductForm("originalPrice", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder=""
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="admin-product-quantity"
                className="block text-sm font-medium text-gray-900 mb-2"
              >
                Quantité en stock
              </label>
              <input
                id="admin-product-quantity"
                type="number"
                required
                min={0}
                value={productForm.quantity}
                onChange={(e) => updateProductForm("quantity", e.target.value)}
                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-gray-900 focus:border-transparent"
                placeholder="0"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-900 mb-2">
                Disponibilité
              </label>
              <label className="flex items-center gap-3 cursor-pointer">
                <input
                  type="checkbox"
                  checked={productForm.available}
                  onChange={(e) =>
                    updateProductForm("available", e.target.checked)
                  }
                  className="w-5 h-5 rounded border-gray-300 text-gray-900 focus:ring-2 focus:ring-gray-900"
                />
                <span className="text-sm text-gray-700">
                  {productForm.available ? "Disponible" : "Indisponible"}
                </span>
              </label>
            </div>
          </div>

          {/* Section Upload d'images */}
          <ImageUpload
            images={images}
            imagePreviews={imagePreviews}
            onChange={handleImagesChange}
            minImages={2}
            label="Images du produit"
          />

          <div className="flex gap-3 pt-4">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-gray-100 text-gray-700 rounded-lg font-medium hover:bg-gray-200 transition-colors"
            >
              Annuler
            </button>
            <button
              type="submit"
              disabled={imagePreviews.length < 2 || isLoading || isUploadingImages}
              className="flex-1 py-2.5 px-4 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-800 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {isUploadingImages
                ? "Upload des images..."
                : isLoading
                  ? "Création..."
                  : editingProduct
                    ? "Enregistrer"
                    : "Ajouter"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
