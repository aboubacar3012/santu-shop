import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

/**
 * GET /api/products — Liste des produits (route publique).
 * Query params:
 *   - sellerId?: string — Filtrer par ID de seller
 *   - sellerSlug?: string — Filtrer par slug de seller
 * Si aucun paramètre n'est fourni, retourne tous les produits.
 */
export async function GET(req: NextRequest) {
  try {
    const { searchParams } = new URL(req.url);
    const sellerId = searchParams.get("sellerId");
    const sellerSlug = searchParams.get("sellerSlug");

    // Construire les conditions de filtrage
    const where: { sellerId?: string; seller?: { slug: string } } = {};

    if (sellerId) {
      where.sellerId = sellerId;
    } else if (sellerSlug) {
      where.seller = { slug: sellerSlug };
    }

    const products = await prisma.product.findMany({
      where,
      orderBy: { createdAt: "desc" },
      include: {
        seller: {
          select: {
            id: true,
            name: true,
            slug: true,
          },
        },
        category: {
          select: {
            id: true,
            label: true,
            slug: true,
          },
        },
      },
    });

    return NextResponse.json({
      products: products.map((p) => ({
        id: p.id,
        title: p.title,
        description: p.description,
        categoryId: p.categoryId,
        images: p.images,
        price: p.price,
        originalPrice: p.originalPrice,
        available: p.available,
        quantity: p.quantity,
        likes: p.likes,
        comments: p.comments,
        sellerName: p.seller.name,
        sellerSlug: p.seller.slug,
        createdAt: p.createdAt,
      })),
    });
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des produits:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de la récupération des produits",
      },
      { status: 500 }
    );
  }
}
