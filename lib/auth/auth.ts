export type User = {
  id: string;
  email: string;
  role: "Member" | "Owner";
  plan: "Free" | "Base" | "Plus" | null;
};

export async function getUser(): Promise<User | null> {
  // Mock estático para testes
  return {
    id: "1",
    email: "free@email.com", // troque aqui para testar base ou free
    role: "Member",
    plan: "Free",
  };
}
