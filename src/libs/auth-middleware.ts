import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
  };
}

/**
 * Middleware d'authentification pour les routes API
 * Vérifie que l'utilisateur est authentifié et enrichit la requête avec les informations utilisateur
 *
 * @param req - La requête Next.js
 * @param handler - Le handler de la route qui sera exécuté si l'authentification est valide
 * @returns NextResponse avec le résultat du handler ou une erreur 401 si non authentifié
 *
 * @example
 * ```ts
 * export async function POST(req: NextRequest) {
 *   return withAuth(req, async (authenticatedReq) => {
 *     const userId = authenticatedReq.user.id;
 *     // Votre logique ici
 *   });
 * }
 * ```
 */
export async function withAuth(
  req: NextRequest,
  handler: (req: AuthenticatedRequest) => Promise<NextResponse>
): Promise<NextResponse> {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: "Non authentifié" }, { status: 401 });
    }

    // Créer une requête enrichie avec les informations utilisateur
    const authenticatedReq = req as AuthenticatedRequest;
    authenticatedReq.user = {
      id: session.user.id,
      email: session.user.email,
    };

    return await handler(authenticatedReq);
  } catch (error) {
    console.error("Erreur d'authentification:", error);
    return NextResponse.json(
      { error: "Erreur d'authentification" },
      { status: 500 }
    );
  }
}
