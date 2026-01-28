import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import prisma from "@/libs/prisma";

export async function PATCH(
  req: NextRequest,
  { params }: { params: Promise<{ userId: string }> }
) {
  try {
    const { userId } = await params;
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Vérifier que l'utilisateur modifie son propre profil
    if (session.user.id !== userId) {
      return NextResponse.json(
        { error: "Vous ne pouvez modifier que votre propre profil" },
        { status: 403 }
      );
    }

    const body = await req.json();
    const { firstName, lastName, dateOfBirth, title, phone } = body;

    // Mettre à jour l'utilisateur
    const updatedUser = await prisma.user.update({
      where: { id: userId },
      data: {
        ...(firstName !== undefined && { firstName: firstName || null }),
        ...(lastName !== undefined && { lastName: lastName || null }),
        ...(dateOfBirth !== undefined && { dateOfBirth: dateOfBirth || null }),
        ...(title !== undefined && { title: title || null }),
        ...(phone !== undefined && { phone: phone || null }),
      },
      select: {
        id: true,
        firstName: true,
        lastName: true,
        dateOfBirth: true,
        title: true,
        email: true,
        emailVerified: true,
        image: true,
        phone: true,
        isVerified: true,
        subscriptionType: true,
        isActive: true,
        twoFactorEnabled: true,
        createdAt: true,
        updatedAt: true,
      },
    });

    return NextResponse.json(updatedUser);
  } catch (error: any) {
    console.error("Erreur lors de la mise à jour de l'utilisateur:", error);
    return NextResponse.json(
      {
        error: error.message || "Erreur lors de la mise à jour de l'utilisateur",
      },
      { status: 500 }
    );
  }
}
