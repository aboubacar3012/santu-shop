import { NextRequest, NextResponse } from "next/server";
import prisma from "@/libs/prisma";

/**
 * GET /api/categories — Liste des catégories disponibles.
 * Accessible à tous (pas besoin d'authentification pour voir les catégories).
 */
export async function GET(req: NextRequest) {
  try {
    const categories = await prisma.category.findMany({
      orderBy: { label: "asc" },
      select: {
        id: true,
        label: true,
        slug: true,
        description: true,
      },
    });

    return NextResponse.json({
      categories: categories.map((cat) => ({
        id: cat.id,
        label: cat.label,
        slug: cat.slug,
        description: cat.description,
      })),
    });
  } catch (error: unknown) {
    console.error("Erreur lors de la récupération des catégories:", error);
    return NextResponse.json(
      {
        error:
          error instanceof Error
            ? error.message
            : "Une erreur est survenue lors de la récupération des catégories",
      },
      { status: 500 }
    );
  }
}
