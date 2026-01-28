import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import prisma from "@/libs/prisma";
import { signUpEmailNoName } from "@/libs/auth-client";


export async function POST(req: NextRequest) {
  try {
    // Vider toute session existante avant la création de compte
    // pour éviter qu'une ancienne session interfère avec le nouveau compte
    try {
      const session = await auth.api.getSession({ headers: req.headers });
      if (session?.session?.id) {
        // Invalider la session existante si elle existe
        // On crée une réponse temporaire pour récupérer les headers de déconnexion
        const signOutResponse = await auth.api.signOut({
          headers: req.headers,
        });
        // Les cookies de session seront automatiquement supprimés par Better Auth
      }
    } catch (error) {
      // Ignorer les erreurs si aucune session n'existe
      console.debug("Aucune session à déconnecter:", error);
    }

    const body = await req.json();
    const { email, password } = body;

    // Validation
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

    // Créer l'utilisateur via better-auth (sans nom requis, comme signUpEmailNoName)
    const signUpResponse = await signUpEmailNoName({
      email: email.trim(),
      password: password,
    });

    if (!signUpResponse || signUpResponse.error) {
      const errorMessage =
        signUpResponse?.error?.message || "Erreur lors de la création de l'utilisateur";
      return NextResponse.json(
        { error: errorMessage },
        { status: 400 }
      );
    }

    const userId = signUpResponse.data?.user?.id;
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
        subscriptionType: true,
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
