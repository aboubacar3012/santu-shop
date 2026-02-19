import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRole } from "@/libs/auth-middleware";
import prisma from "@/libs/prisma";

/**
 * POST /api/products/create — Création d'un produit pour une boutique.
 * Réservé aux utilisateurs connectés avec le rôle OWNER ou ADMIN.
 * Body: {
 *   sellerId: string,
 *   title: string,
 *   description: string,
 *   categoryId: string,
 *   images: string[],
 *   price: number,
 *   originalPrice?: number,
 *   available?: boolean,
 *   quantity?: number
 * }
 */
export async function POST(req: NextRequest) {
  return withAuthRole(
    req,
    {
      allowedRoles: [Role.OWNER, Role.ADMIN],
      messageUnauthorized: "Vous devez être connecté pour créer un produit",
      messageForbidden:
        "Seuls les administrateurs et propriétaires peuvent créer un produit",
    },
    async () => {
      try {
        const body = await req.json();
        const sellerId =
          typeof body.sellerId === "string" ? body.sellerId.trim() : "";
        const title =
          typeof body.title === "string" ? body.title.trim() : "";
        const description =
          typeof body.description === "string" ? body.description.trim() : "";
        const categoryId =
          typeof body.categoryId === "string" ? body.categoryId.trim() : "";
        const images = Array.isArray(body.images) ? body.images : [];
        const priceRaw =
          typeof body.price === "number" ? body.price : parseFloat(body.price) || 0;
        const originalPriceRaw =
          body.originalPrice !== undefined
            ? typeof body.originalPrice === "number"
              ? body.originalPrice
              : parseFloat(body.originalPrice) || null
            : null;
        const available =
          typeof body.available === "boolean" ? body.available : true;
        const quantityRaw =
          typeof body.quantity === "number"
            ? body.quantity
            : parseInt(body.quantity, 10) || 0;

        // Validation des champs requis
        if (!sellerId) {
          return NextResponse.json(
            { error: "L'identifiant de la boutique (sellerId) est requis" },
            { status: 400 }
          );
        }
        if (!title) {
          return NextResponse.json(
            { error: "Le titre du produit est requis" },
            { status: 400 }
          );
        }
        if (!description) {
          return NextResponse.json(
            { error: "La description du produit est requise" },
            { status: 400 }
          );
        }
        if (!categoryId) {
          return NextResponse.json(
            { error: "La catégorie du produit est requise" },
            { status: 400 }
          );
        }

        // Validation des images (minimum 2)
        if (!Array.isArray(images) || images.length < 2) {
          return NextResponse.json(
            { error: "Au moins 2 images sont requises" },
            { status: 400 }
          );
        }

        // Validation du prix
        const priceGnf = Math.round(priceRaw);
        if (priceGnf < 0) {
          return NextResponse.json(
            { error: "Le prix doit être un nombre positif" },
            { status: 400 }
          );
        }

        // Validation du prix original si fourni
        const originalPriceGnf =
          originalPriceRaw !== null ? Math.round(originalPriceRaw) : null;
        if (originalPriceGnf !== null && originalPriceGnf < 0) {
          return NextResponse.json(
            { error: "Le prix original doit être un nombre positif" },
            { status: 400 }
          );
        }

        // Validation de la quantité
        const quantity = quantityRaw < 0 ? 0 : quantityRaw;

        // Vérifier que la boutique existe
        const seller = await prisma.seller.findUnique({
          where: { id: sellerId },
        });
        if (!seller) {
          return NextResponse.json(
            { error: "Boutique introuvable" },
            { status: 404 }
          );
        }

        // Vérifier que la catégorie existe
        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });
        if (!category) {
          return NextResponse.json(
            { error: "Catégorie introuvable" },
            { status: 400 }
          );
        }

        // Créer le produit
        const product = await prisma.product.create({
          data: {
            sellerId,
            title,
            description,
            categoryId,
            images,
            price: priceGnf,
            originalPrice: originalPriceGnf,
            available,
            quantity,
          },
          include: {
            seller: { select: { id: true, name: true, slug: true } },
            category: { select: { id: true, label: true, slug: true } },
          },
        });

        return NextResponse.json(
          {
            product: {
              id: product.id,
              title: product.title,
              description: product.description,
              categoryId: product.categoryId,
              images: product.images,
              price: product.price,
              originalPrice: product.originalPrice,
              available: product.available,
              quantity: product.quantity,
              likes: product.likes,
              comments: product.comments,
              sellerName: product.seller.name,
              sellerSlug: product.seller.slug,
              createdAt: product.createdAt,
            },
            message: "Produit créé avec succès",
          },
          { status: 201 }
        );
      } catch (error: unknown) {
        console.error("Erreur lors de la création du produit:", error);
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Une erreur est survenue lors de la création du produit",
          },
          { status: 500 }
        );
      }
    }
  );
}
