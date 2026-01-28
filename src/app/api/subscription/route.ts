import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import prisma from "@/libs/prisma";

/**
 * GET /api/subscription
 * Retourne le statut d'abonnement de l'utilisateur connecté.
 * Enrichi avec les infos Stripe (customer_id, subscription_id, status).
 */
export async function GET(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: {
        subscriptionType: true,
        subscriptionStatus: true,
        stripeCustomerId: true,
        stripeSubscriptionId: true,
        subscriptionEndDate: true,
      },
    });

    if (!user) {
      return NextResponse.json(
        { error: "Utilisateur non trouvé" },
        { status: 404 }
      );
    }

    // hasSubscription = PRO/etc ET (status active OU pas de status [legacy])
    const hasSubscription =
      user.subscriptionType !== "FREE" &&
      (!user.subscriptionStatus || user.subscriptionStatus === "active");

    return NextResponse.json({
      hasSubscription,
      subscriptionType: user.subscriptionType,
      subscriptionStatus: user.subscriptionStatus,
      stripeCustomerId: user.stripeCustomerId,
      stripeSubscriptionId: user.stripeSubscriptionId,
      subscriptionEndDate: user.subscriptionEndDate,
    });
  } catch (error) {
    console.error("GET /api/subscription:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
