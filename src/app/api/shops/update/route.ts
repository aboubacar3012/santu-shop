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
 * POST /api/shops/update — Mise à jour d'une boutique (Seller).
 * Réservé aux utilisateurs connectés avec le rôle OWNER ou ADMIN.
 * Body: { id: string, name?: string, slug?: string }
 */
export async function POST(req: NextRequest) {
  return withAuthRole(
    req,
    {
      allowedRoles: [Role.OWNER, Role.ADMIN],
      messageUnauthorized: "Vous devez être connecté pour modifier une boutique",
      messageForbidden:
        "Seuls les administrateurs et propriétaires peuvent modifier une boutique",
    },
    async () => {
      try {
        const body = await req.json();
        const id = typeof body.id === "string" ? body.id.trim() : "";
        const rawName =
          typeof body.name === "string" ? body.name.trim() : undefined;
        const rawSlug =
          typeof body.slug === "string" ? body.slug.trim() : undefined;

        if (!id) {
          return NextResponse.json(
            { error: "L'identifiant de la boutique est requis" },
            { status: 400 }
          );
        }

        const seller = await prisma.seller.findUnique({
          where: { id },
        });

        if (!seller) {
          return NextResponse.json(
            { error: "Boutique introuvable" },
            { status: 404 }
          );
        }

        const updateData: { name?: string; slug?: string } = {};

        if (rawName !== undefined) {
          updateData.name = rawName;
        }

        if (rawSlug !== undefined) {
          const slug = normalizeSlug(rawSlug);
          if (!slug) {
            return NextResponse.json(
              { error: "Impossible de générer un slug valide" },
              { status: 400 }
            );
          }

          // Vérifier si le slug existe déjà pour une autre boutique
          const existing = await prisma.seller.findUnique({
            where: { slug },
          });

          if (existing && existing.id !== id) {
            return NextResponse.json(
              { error: "Une boutique avec ce slug existe déjà" },
              { status: 409 }
            );
          }

          updateData.slug = slug;
        }

        // Si seul le nom est fourni et pas de slug, générer le slug à partir du nom
        if (rawName !== undefined && rawSlug === undefined) {
          const slug = normalizeSlug(rawName);
          if (slug) {
            const existing = await prisma.seller.findUnique({
              where: { slug },
            });
            if (!existing || existing.id === id) {
              updateData.slug = slug;
            }
          }
        }

        if (Object.keys(updateData).length === 0) {
          return NextResponse.json(
            { error: "Aucune donnée à mettre à jour" },
            { status: 400 }
          );
        }

        const updatedSeller = await prisma.seller.update({
          where: { id },
          data: updateData,
        });

        return NextResponse.json({
          seller: {
            id: updatedSeller.id,
            name: updatedSeller.name,
            slug: updatedSeller.slug,
            createdAt: updatedSeller.createdAt,
          },
          message: "Boutique mise à jour avec succès",
        });
      } catch (error: unknown) {
        console.error("Erreur lors de la mise à jour de la boutique:", error);
        return NextResponse.json(
          {
            error:
              error instanceof Error
                ? error.message
                : "Une erreur est survenue lors de la mise à jour de la boutique",
          },
          { status: 500 }
        );
      }
    }
  );
}
