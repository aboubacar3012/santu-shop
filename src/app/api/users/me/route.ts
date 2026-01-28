import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import prisma from "@/libs/prisma";

export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    // Récupérer l'utilisateur complet depuis la base de données
    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
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

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    return NextResponse.json(user);
  } catch (error: any) {
    console.error("Erreur lors de la récupération de l'utilisateur:", error);
    return NextResponse.json(
      {
        error: error.message || "Erreur lors de la récupération de l'utilisateur",
      },
      { status: 500 }
    );
  }
}
