import { NextRequest, NextResponse } from "next/server";
import { auth } from "@/libs/auth";
import prisma from "@/libs/prisma";
import Stripe from "stripe";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;

/**
 * POST /api/subscription/cancel
 * Annule l'abonnement Stripe de l'utilisateur connecté.
 * Le webhook customer.subscription.deleted mettra à jour la BDD.
 */
export async function POST(req: NextRequest) {
  try {
    const session = await auth.api.getSession({ headers: req.headers });

    if (!session?.user?.id) {
      return NextResponse.json(
        { error: "Non authentifié" },
        { status: 401 }
      );
    }

    if (!STRIPE_SECRET) {
      return NextResponse.json(
        { error: "Configuration Stripe manquante" },
        { status: 500 }
      );
    }

    const user = await prisma.user.findUnique({
      where: { id: session.user.id },
      select: { stripeSubscriptionId: true, email: true },
    });

    if (!user?.stripeSubscriptionId) {
      return NextResponse.json(
        { error: "Aucun abonnement actif trouvé" },
        { status: 404 }
      );
    }

    const stripe = new Stripe(STRIPE_SECRET);
    await stripe.subscriptions.cancel(user.stripeSubscriptionId);

    return NextResponse.json({
      success: true,
      message: "Abonnement annulé. La mise à jour sera effective sous quelques secondes.",
    });
  } catch (error: unknown) {
    const err = error as { type?: string; message?: string };
    if (err?.type === "StripeError") {
      return NextResponse.json(
        { error: err?.message ?? "Erreur Stripe" },
        { status: 400 }
      );
    }
    console.error("Erreur lors de la résiliation:", error);
    return NextResponse.json(
      { error: "Erreur serveur" },
      { status: 500 }
    );
  }
}
