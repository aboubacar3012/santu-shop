import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";
import prisma from "@/libs/prisma";

const STRIPE_SECRET = process.env.STRIPE_SECRET_KEY;
const STRIPE_WEBHOOK_SECRET = process.env.STRIPE_WEBHOOK_SECRET;

/**
 * POST /api/webhooks/stripe
 * 
 * Point d'entrée unique pour tous les webhooks Stripe.
 * Vérifie la signature, puis traite les événements :
 * - checkout.session.completed : active l'abonnement
 * - customer.subscription.updated : met à jour le statut
 * - customer.subscription.deleted : annule l'abonnement
 * 
 * Configuration dans Stripe Dashboard :
 * Developers → Webhooks → Add endpoint → URL: https://<domain>/api/webhooks/stripe
 * Événements à écouter : checkout.session.completed, customer.subscription.*
 */
export async function POST(req: NextRequest) {
  if (!STRIPE_SECRET || !STRIPE_WEBHOOK_SECRET) {
    console.error("STRIPE_SECRET_KEY ou STRIPE_WEBHOOK_SECRET manquant");
    return NextResponse.json(
      { error: "Configuration Stripe manquante" },
      { status: 500 }
    );
  }

  const stripe = new Stripe(STRIPE_SECRET);
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
    event = stripe.webhooks.constructEvent(body, signature, STRIPE_WEBHOOK_SECRET);
  } catch (err) {
    console.error("Webhook signature invalide:", err);
    return NextResponse.json(
      { error: `Signature invalide: ${err instanceof Error ? err.message : ""}` },
      { status: 400 }
    );
  }

  try {
    switch (event.type) {
      case "checkout.session.completed": {
        const session = event.data.object as Stripe.Checkout.Session;
        await handleCheckoutCompleted(session, stripe);
        break;
      }

      case "customer.subscription.updated": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionUpdated(subscription);
        break;
      }

      case "customer.subscription.deleted": {
        const subscription = event.data.object as Stripe.Subscription;
        await handleSubscriptionDeleted(subscription);
        break;
      }

      default:
        console.log(`Événement non géré: ${event.type}`);
    }

    return NextResponse.json({ received: true });
  } catch (error) {
    console.error(`Erreur lors du traitement du webhook ${event.type}:`, error);
    return NextResponse.json(
      { error: "Erreur lors du traitement" },
      { status: 500 }
    );
  }
}

/**
 * Gère checkout.session.completed
 * Active l'abonnement pour l'utilisateur correspondant
 */
async function handleCheckoutCompleted(
  session: Stripe.Checkout.Session,
  stripe: Stripe
) {
  if (session.mode !== "subscription") return;
  if (session.payment_status !== "paid") return;

  const customerEmail = session.customer_details?.email || session.customer_email;
  if (!customerEmail) {
    console.warn("Email client manquant dans la session", session.id);
    return;
  }

  const user = await prisma.user.findUnique({
    where: { email: customerEmail },
  });

  if (!user) {
    console.warn(`Utilisateur non trouvé pour email: ${customerEmail}`);
    return;
  }

  const subscriptionId = session.subscription as string;
  const customerId = session.customer as string;

  if (!subscriptionId) {
    console.warn("subscription_id manquant dans la session", session.id);
    return;
  }

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionType: "PRO",
      stripeCustomerId: customerId,
      stripeSubscriptionId: subscriptionId,
      subscriptionStatus: subscription.status,
      subscriptionEndDate: null,
    },
  });

  console.log(`✅ Abonnement activé pour ${user.email} (sub: ${subscriptionId})`);
}

/**
 * Gère customer.subscription.updated
 * Met à jour le statut de l'abonnement
 */
async function handleSubscriptionUpdated(subscription: Stripe.Subscription) {
  const user = await prisma.user.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!user) {
    console.warn(`Utilisateur non trouvé pour subscription ${subscription.id}`);
    return;
  }

  const isActive = subscription.status === "active";
  const subscriptionType = isActive ? "PRO" : "FREE";

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionType,
      subscriptionStatus: subscription.status,
      subscriptionEndDate: !isActive && subscription.cancel_at
        ? new Date(subscription.cancel_at * 1000)
        : null,
    },
  });

  console.log(`📝 Abonnement mis à jour pour ${user.email}: ${subscription.status}`);
}

/**
 * Gère customer.subscription.deleted
 * Annule l'abonnement pour l'utilisateur
 */
async function handleSubscriptionDeleted(subscription: Stripe.Subscription) {
  const user = await prisma.user.findUnique({
    where: { stripeSubscriptionId: subscription.id },
  });

  if (!user) {
    console.warn(`Utilisateur non trouvé pour subscription ${subscription.id}`);
    return;
  }

  await prisma.user.update({
    where: { id: user.id },
    data: {
      subscriptionType: "FREE",
      subscriptionStatus: "canceled",
      stripeSubscriptionId: null,
      subscriptionEndDate: subscription.cancel_at
        ? new Date(subscription.cancel_at * 1000)
        : new Date(),
    },
  });

  console.log(`❌ Abonnement annulé pour ${user.email}`);
}
