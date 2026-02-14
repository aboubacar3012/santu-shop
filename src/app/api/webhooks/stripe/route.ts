import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * POST /api/webhooks/stripe
 *
 * Webhook Stripe désactivé : aucun système de paiement pour le moment.
 * Retourne 200 pour accepter les événements et éviter les retries Stripe.
 * Réactiver la logique (abonnements, etc.) quand un paiement sera intégré.
 */
export async function POST(req: NextRequest) {
  if (!STRIPE_SECRET || !STRIPE_WEBHOOK_SECRET) {
    return NextResponse.json(
      { error: "Configuration Stripe manquante" },
      { status: 500 }
    );
  }

  const body = await req.text();
  const signature = req.headers.get("stripe-signature");
  if (!signature) {
    return NextResponse.json(
      { error: "Signature Stripe manquante" },
      { status: 400 }
    );
  }

  let event: Stripe.Event;
  try {
    const stripe = new Stripe(STRIPE_SECRET);
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      STRIPE_WEBHOOK_SECRET
    );
  } catch (err) {
    console.error("Webhook Stripe: signature invalide", err);
    return NextResponse.json(
      { error: `Signature invalide: ${err instanceof Error ? err.message : ""}` },
      { status: 400 }
    );
  }

  // Paiement désactivé : on ne fait rien, on accepte juste l'événement
  console.log(`Webhook Stripe reçu (ignoré): ${event.type}`);
  return NextResponse.json({ received: true });
}
