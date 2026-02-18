import { type Role } from "@prisma/client";
import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import prisma from "@/libs/prisma";

export interface AuthenticatedRequest extends NextRequest {
  user: {
    id: string;
    email: string;
  };
}

/** Requête authentifiée avec le rôle utilisateur (après withAuthRole). */
export interface AuthenticatedRequestWithRole extends AuthenticatedRequest {
  user: AuthenticatedRequest["user"] & { role: Role };
}

export interface WithAuthRoleOptions {
  /** Liste des rôles autorisés (ex. ["OWNER", "ADMIN"]). */
  allowedRoles: Role[];
  /** Message retourné en 401 si non connecté. */
  messageUnauthorized?: string;
  /** Message retourné en 403 si rôle insuffisant. */
  messageForbidden?: string;
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

/**
 * Middleware d'authentification + vérification de rôle.
 * Vérifie que l'utilisateur est connecté et que son rôle figure dans allowedRoles.
 *
 * @param req - La requête Next.js
 * @param options - allowedRoles et messages optionnels (401 / 403)
 * @param handler - Le handler avec req.user contenant id, email et role
 * @returns NextResponse ou 401 (non connecté) / 403 (rôle insuffisant)
 *
 * @example
 * ```ts
 * import { Role } from "@prisma/client";
 *
 * export async function POST(req: NextRequest) {
 *   return withAuthRole(
 *     req,
 *     { allowedRoles: [Role.OWNER, Role.ADMIN] },
 *     async (authenticatedReq) => {
 *       // authenticatedReq.user.role est OWNER ou ADMIN
 *       return NextResponse.json({ ok: true });
 *     }
 *   );
 * }
 * ```
 */
export async function withAuthRole(
  req: NextRequest,
  options: WithAuthRoleOptions,
  handler: (req: AuthenticatedRequestWithRole) => Promise<NextResponse>
): Promise<NextResponse> {
  const {
    allowedRoles,
    messageUnauthorized = "Vous devez être connecté pour effectuer cette action",
    messageForbidden = "Vous n'avez pas les droits nécessaires pour effectuer cette action",
  } = options;

  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json({ error: messageUnauthorized }, { status: 401 });
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { id: true, email: true, role: true },
    });

    if (!user) {
      return NextResponse.json({ error: messageUnauthorized }, { status: 401 });
    }

    if (!allowedRoles.includes(user.role)) {
      return NextResponse.json({ error: messageForbidden }, { status: 403 });
    }

    const authenticatedReq = req as AuthenticatedRequestWithRole;
    authenticatedReq.user = {
      id: user.id,
      email: user.email,
      role: user.role,
    };

    return await handler(authenticatedReq);
  } catch (error) {
    console.error("Erreur d'authentification (withAuthRole):", error);
    return NextResponse.json(
      { error: "Erreur d'authentification" },
      { status: 500 }
    );
  }
}
