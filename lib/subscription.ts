// ✅ src/lib/subscription.ts
import { stripe } from "@/lib/payments/stripe";
import { getUser } from "@/lib/auth/auth";
import { db } from "@/lib/db/drizzle";
import { teams, teamMembers } from "@/lib/db/schema";
import { eq, or, inArray } from "drizzle-orm";

export type Subscription = {
  plan: "Free" | "Base" | "Plus";
};

export async function getUserSubscription(): Promise<Subscription> {
  const user = await getUser();
  if (!user?.id) return { plan: "Plus" };

  const memberRecords = await db
    .select({ teamId: teamMembers.teamId })
    .from(teamMembers)
    .where(eq(teamMembers.userId, Number(user.id)));

  const memberTeamIds = memberRecords.map((m) => m.teamId);

  const [team] = await db
    .select({
      id: teams.id,
      name: teams.name,
      stripeSubscriptionId: teams.stripeSubscriptionId,
      subscriptionStatus: teams.subscriptionStatus,
    })
    .from(teams)
    .where(inArray(teams.id, memberTeamIds))
    .limit(1);

  if (!team?.stripeSubscriptionId) return { plan: "Free" };

  try {
    const subscription = await stripe.subscriptions.retrieve(
      team.stripeSubscriptionId
    );

    const productId = subscription.items.data[0]?.price.product;

    if (productId === process.env.STRIPE_PLUS_PRODUCT_ID) {
      return { plan: "Plus" };
    }

    if (productId === process.env.STRIPE_BASE_PRODUCT_ID) {
      return { plan: "Base" };
    }

    return { plan: "Free" };
  } catch (error: any) {
    if (error?.code === "resource_missing") {
      console.warn(
        "Assinatura não encontrada na Stripe:",
        team.stripeSubscriptionId
      );
    } else {
      console.error("Erro ao buscar assinatura na Stripe:", error);
    }
    return { plan: "Free" };
  }
}
