import { getUser } from "./auth/auth";

export type Subscription = {
  plan: "Base" | "Plus";
};

export async function getUserSubscription(): Promise<Subscription | null> {
  const user = await getUser();

  // Simula um plano baseado no e-mail
  if (!user) return null;

  if (user.email === "plus@email.com") {
    return { plan: "Plus" };
  }

  if (user.email === "base@email.com") {
    return { plan: "Base" };
  }

  return null; // usuário free
}
