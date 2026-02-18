import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRole } from "@/libs/auth-middleware";
import prisma from "@/libs/prisma";

/**
 * GET /api/shops — Liste des boutiques (sellers).
 * Réservé aux utilisateurs connectés avec le rôle OWNER ou ADMIN.
 */
export async function GET(req: NextRequest) {
  return withAuthRole(
    req,
    {
      allowedRoles: [Role.OWNER, Role.ADMIN],
      messageUnauthorized: "Vous devez être connecté pour voir la liste des boutiques",
      messageForbidden: "Seuls les administrateurs et propriétaires peuvent accéder à cette liste",
    },
    async () => {
      try {
        const sellers = await prisma.seller.findMany({
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            slug: true,
            createdAt: true,
            _count: { select: { products: true } },
          },
        });

        return NextResponse.json({
          sellers: sellers.map((s) => ({
            id: s.id,
            name: s.name,
            slug: s.slug,
            createdAt: s.createdAt,
            productCount: s._count.products,
          })),
        });
      } catch (error: unknown) {
        console.error("Erreur lors de la récupération des boutiques:", error);
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Une erreur est survenue lors de la récupération des boutiques",
          },
          { status: 500 }
        );
      }
    }
  );
}
