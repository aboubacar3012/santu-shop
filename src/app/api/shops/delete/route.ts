import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRole } from "@/libs/auth-middleware";
import prisma from "@/libs/prisma";

/**
 * POST /api/shops/delete — Suppression d'une boutique (Seller).
 * Réservé aux utilisateurs connectés avec le rôle OWNER ou ADMIN.
 * Body: { id: string }
 */
export async function POST(req: NextRequest) {
  return withAuthRole(
    req,
    {
      allowedRoles: [Role.OWNER, Role.ADMIN],
      messageUnauthorized: "Vous devez être connecté pour supprimer une boutique",
      messageForbidden:
        "Seuls les administrateurs et propriétaires peuvent supprimer une boutique",
    },
    async () => {
      try {
        const body = await req.json();
        const id = typeof body.id === "string" ? body.id.trim() : "";

        if (!id) {
          return NextResponse.json(
            { error: "L'identifiant de la boutique est requis" },
            { status: 400 }
          );
        }

        const seller = await prisma.seller.findUnique({
          where: { id },
          include: {
            _count: { select: { products: true } },
          },
        });

        if (!seller) {
          return NextResponse.json(
            { error: "Boutique introuvable" },
            { status: 404 }
          );
        }

        await prisma.seller.delete({
          where: { id },
        });

        return NextResponse.json({
          message: "Boutique supprimée avec succès",
          deletedSeller: {
            id: seller.id,
            name: seller.name,
            slug: seller.slug,
            productCount: seller._count.products,
          },
        });
      } catch (error: unknown) {
        console.error("Erreur lors de la suppression de la boutique:", error);
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Une erreur est survenue lors de la suppression de la boutique",
          },
          { status: 500 }
        );
      }
    }
  );
}
