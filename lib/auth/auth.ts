export type User = {
  id: string;
  email: string;
  role: "user" | "admin";
};

export async function getUser(): Promise<User | null> {
  // Mock estático para testes
  return {
    id: "1",
    email: "plus@email.com", // troque aqui para testar base ou free
    role: "user",
  };
}
