export async function getStripePlanDetails(plan: "free" | "plus") {
  if (plan === "plus") {
    return {
      name: "Plano Plus",
      price: "R$ 29,90/mês",
      benefits: [
        "Suporte prioritário",
        "Acesso a recursos premium",
        "Maior capacidade de uso",
      ],
    };
  }

  return {
    name: "Plano Free",
    price: "Gratuito",
    benefits: ["Acesso limitado", "Sem suporte prioritário"],
  };
}
