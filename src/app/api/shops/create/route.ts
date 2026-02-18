import { Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { withAuthRole } from "@/libs/auth-middleware";
import prisma from "@/libs/prisma";

/**
 * Normalise une chaîne en slug (minuscules, sans accents, tirets).
 */
function normalizeSlug(value: string): string {
  return value
    .toLowerCase()
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "");
}

/**
 * POST /api/shops/create — Création d'une boutique (Seller).
 * Réservé aux utilisateurs connectés avec le rôle OWNER ou ADMIN.
 * Body: { name: string, slug?: string } — si slug absent, il est dérivé du name.
 */
export async function POST(req: NextRequest) {
  return withAuthRole(
    req,
    {
      allowedRoles: [Role.OWNER, Role.ADMIN],
      messageUnauthorized: "Vous devez être connecté pour créer une boutique",
      messageForbidden: "Seuls les administrateurs et propriétaires peuvent créer une boutique",
    },
    async () => {
      try {
        const body = await req.json();
        const rawName = typeof body.name === "string" ? body.name.trim() : "";
        const rawSlug = typeof body.slug === "string" ? body.slug.trim() : "";

        if (!rawName) {
          return NextResponse.json(
            { error: "Le nom de la boutique est requis" },
            { status: 400 }
          );
        }

        const name = rawName;
        const slug = rawSlug ? normalizeSlug(rawSlug) : normalizeSlug(name);

        if (!slug) {
          return NextResponse.json(
            { error: "Impossible de générer un slug valide à partir du nom" },
            { status: 400 }
          );
        }

        const existing = await prisma.seller.findUnique({
          where: { slug },
        });

        if (existing) {
          return NextResponse.json(
            { error: "Une boutique avec ce slug existe déjà" },
            { status: 409 }
          );
        }

        const seller = await prisma.seller.create({
          data: {
            name,
            slug,
          },
        });

        return NextResponse.json(
          {
            seller: {
              id: seller.id,
              name: seller.name,
              slug: seller.slug,
              createdAt: seller.createdAt,
            },
            message: "Boutique créée avec succès",
          },
          { status: 201 }
        );
      } catch (error: unknown) {
        console.error("Erreur lors de la création de la boutique:", error);
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Une erreur est survenue lors de la création de la boutique",
          },
          { status: 500 }
        );
      }
    }
  );
}
