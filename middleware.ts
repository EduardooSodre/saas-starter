// middleware.ts na raiz do projeto

import { NextRequest, NextResponse } from "next/server";
import { getUserSession } from "@/lib/auth/session";

export async function middleware(req: NextRequest) {
  const user = await getUserSession();
  const path = req.nextUrl.pathname;

  if (!user) {
    return new NextResponse("Não autenticado", { status: 401 });
  }

  if (path.startsWith("/dashboard/admin") && user.role !== "Owner") {
    return new NextResponse("Acesso negado: somente admins", { status: 403 });
  }

  if (path.startsWith("/dashboard/plus-only") && user.plan !== "Plus") {
    return new NextResponse("Acesso negado: plano Plus necessário", {
      status: 403,
    });
  }

  if (path.startsWith("/dashboard/free-only") && user.plan !== "Free") {
    return new NextResponse("Acesso negado: apenas usuários free", {
      status: 403,
    });
  }

  return NextResponse.next();
}

// 👇 esta configuração é válida só nesse arquivo
export const config = {
  matcher: ["/dashboard/admin", "/dashboard/plus-only", "/dashboard/free-only"],
};
