import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import prisma from "@/libs/prisma";

export async function POST(req: NextRequest) {
  try {
    // Vider toute session existante avant la création de compte
    try {
      const session = await auth.api.getSession({ headers: req.headers });
      if (session?.session?.id) {
        await auth.api.signOut({ headers: req.headers });
      }
    } catch {
      // Ignorer si aucune session
    }

    const body = await req.json();
    const { email, password } = body;

    if (!email || !email.trim()) {
      return NextResponse.json(
        { error: "L'email est requis" },
        { status: 400 }
      );
    }

    if (!password || password.length < 8) {
      return NextResponse.json(
        { error: "Le mot de passe doit contenir au moins 8 caractères" },
        { status: 400 }
      );
    }

    // Création côté serveur via auth.api (pas de fetch = pas d'erreur "Missing Origin")
    const signUpResponse = await auth.api.signUpEmail({
      body: {
        name: "",
        email: email.trim(),
        password,
      },
    });

    if (!signUpResponse?.user?.id) {
      const errorMessage =
        (signUpResponse as { error?: { message?: string } })?.error?.message ||
        "Erreur lors de la création de l'utilisateur";
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const userId = signUpResponse.user.id;
    if (!userId) {
      return NextResponse.json(
        { error: "Impossible de récupérer l'ID de l'utilisateur créé" },
        { status: 500 }
      );
    }

    // Récupérer l'utilisateur créé par Better Auth
    const user = await prisma.user.findUnique({
      where: { id: userId },
      select: {
        id: true,
        email: true,
        firstName: true,
        lastName: true,
        emailVerified: true,
        isVerified: true,
        isActive: true,
        createdAt: true,
      },
    });

    // Retourner la réponse avec les informations de l'utilisateur
    return NextResponse.json(
      {
        user: user,
        message: "Compte créé avec succès",
      },
      { status: 201 }
    );
  } catch (error: any) {
    console.error("Erreur lors de l'inscription:", error);
    return NextResponse.json(
      {
        error: error.message || "Une erreur est survenue lors de l'inscription",
      },
      { status: 500 }
    );
  }
}
