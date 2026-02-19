import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRole } from "@/libs/auth-middleware";
import { deleteImagesFromS3 } from "@/libs/s3-upload";
import prisma from "@/libs/prisma";

/**
 * GET /api/products/[productId] — Récupère un produit par ID (route publique).
 */
export async function GET(
  _req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  try {
    const { productId } = await context.params;
    if (!productId) {
      return NextResponse.json(
        { error: "Identifiant produit manquant" },
        { status: 400 }
      );
    }

    const product = await prisma.product.findUnique({
      where: { id: productId },
      include: {
        seller: { select: { name: true, slug: true } },
      },
    });

    if (!product) {
      return NextResponse.json(
        { error: "Produit introuvable" },
        { status: 404 }
      );
    }

    return NextResponse.json({
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
        sellerName: product.seller.name,
        sellerSlug: product.seller.slug,
        createdAt: product.createdAt,
      },
    });
  } catch (error: unknown) {
    console.error("Erreur récupération produit:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Erreur lors de la récupération du produit",
      },
      { status: 500 }
    );
  }
}

/**
 * DELETE /api/products/[productId] — Supprime un produit et toutes ses images sur S3.
 * Réservé aux utilisateurs OWNER ou ADMIN.
 */
export async function DELETE(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  return withAuthRole(
    req,
    {
      allowedRoles: [Role.OWNER, Role.ADMIN],
      messageUnauthorized: "Vous devez être connecté pour supprimer un produit",
      messageForbidden:
        "Seuls les administrateurs et propriétaires peuvent supprimer un produit",
    },
    async () => {
      try {
        const { productId } = await context.params;
        if (!productId) {
          return NextResponse.json(
            { error: "Identifiant produit manquant" },
            { status: 400 }
          );
        }

        const product = await prisma.product.findUnique({
          where: { id: productId },
          select: { id: true, images: true },
        });

        if (!product) {
          return NextResponse.json(
            { error: "Produit introuvable" },
            { status: 404 }
          );
        }

        if (product.images.length > 0) {
          await deleteImagesFromS3(product.images, "images");
        }

        await prisma.product.delete({
          where: { id: productId },
        });

        return NextResponse.json({
          message: "Produit et images associées supprimés",
        });
      } catch (err) {
        console.error("Erreur suppression produit:", err);
        const message =
          err instanceof Error ? err.message : "Erreur lors de la suppression";
        const isConflict =
          typeof message === "string" &&
          (message.includes("Foreign key") ||
            message.includes("orderItems") ||
            message.includes("OrderItem"));
        return NextResponse.json(
          {
            error: isConflict
              ? "Impossible de supprimer ce produit : des commandes y sont liées."
              : message,
          },
          { status: isConflict ? 409 : 500 }
        );
      }
    }
  );
}

/**
 * PUT /api/products/[productId] — Met à jour un produit.
 * Réservé aux utilisateurs OWNER ou ADMIN.
 * Body: { title, description, categoryId, images: string[], price, originalPrice?, available, quantity }
 * Supprime automatiquement de S3 les images qui ne sont plus dans la nouvelle liste.
 */
export async function PUT(
  req: NextRequest,
  context: { params: Promise<{ productId: string }> }
) {
  return withAuthRole(
    req,
    {
      allowedRoles: [Role.OWNER, Role.ADMIN],
      messageUnauthorized: "Vous devez être connecté pour modifier un produit",
      messageForbidden:
        "Seuls les administrateurs et propriétaires peuvent modifier un produit",
    },
    async () => {
      try {
        const { productId } = await context.params;
        if (!productId) {
          return NextResponse.json(
            { error: "Identifiant produit manquant" },
            { status: 400 }
          );
        }

        const body = await req.json();
        const title = typeof body.title === "string" ? body.title.trim() : "";
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

        if (!title || !description || !categoryId) {
          return NextResponse.json(
            { error: "Titre, description et catégorie sont requis" },
            { status: 400 }
          );
        }

        if (!Array.isArray(images) || images.length < 2) {
          return NextResponse.json(
            { error: "Au moins 2 images sont requises" },
            { status: 400 }
          );
        }

        const priceGnf = Math.round(priceRaw);
        if (priceGnf < 0) {
          return NextResponse.json(
            { error: "Le prix doit être un nombre positif" },
            { status: 400 }
          );
        }

        const originalPriceGnf =
          originalPriceRaw !== null ? Math.round(originalPriceRaw) : null;
        if (originalPriceGnf !== null && originalPriceGnf < 0) {
          return NextResponse.json(
            { error: "Le prix original doit être un nombre positif" },
            { status: 400 }
          );
        }

        const quantity = quantityRaw < 0 ? 0 : quantityRaw;

        const existingProduct = await prisma.product.findUnique({
          where: { id: productId },
          select: { id: true, images: true, categoryId: true },
        });

        if (!existingProduct) {
          return NextResponse.json(
            { error: "Produit introuvable" },
            { status: 404 }
          );
        }

        const category = await prisma.category.findUnique({
          where: { id: categoryId },
        });
        if (!category) {
          return NextResponse.json(
            { error: "Catégorie introuvable" },
            { status: 400 }
          );
        }

        const imagesToDelete = existingProduct.images.filter(
          (url) => !images.includes(url)
        );

        if (imagesToDelete.length > 0) {
          await deleteImagesFromS3(imagesToDelete, "images");
        }

        const updatedProduct = await prisma.product.update({
          where: { id: productId },
          data: {
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

        return NextResponse.json({
          product: {
            id: updatedProduct.id,
            title: updatedProduct.title,
            description: updatedProduct.description,
            categoryId: updatedProduct.categoryId,
            images: updatedProduct.images,
            price: updatedProduct.price,
            originalPrice: updatedProduct.originalPrice,
            available: updatedProduct.available,
            quantity: updatedProduct.quantity,
            sellerName: updatedProduct.seller.name,
            sellerSlug: updatedProduct.seller.slug,
            createdAt: updatedProduct.createdAt,
          },
          message: "Produit mis à jour",
        });
      } catch (err) {
        console.error("Erreur mise à jour produit:", err);
        return NextResponse.json(
          {
            error:
              err instanceof Error
                ? err.message
                : "Erreur lors de la mise à jour du produit",
          },
          { status: 500 }
        );
      }
    }
  );
}
