import { redirect } from "next/navigation";

export async function createCustomerPortalSession(user: {
    email: string;
    stripeCustomerId: string | null;
}) {
    if (!user.stripeCustomerId) {
        redirect("/pricing");
    }

    const portalUrl = `${process.env.NEXT_PUBLIC_STRIPE_CUSTOMER_PORTAL_URL}?prefilled_email=${encodeURIComponent(
        user.email
    )}`;

    redirect(portalUrl);
}
