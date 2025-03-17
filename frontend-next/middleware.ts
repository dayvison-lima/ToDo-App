import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(req: NextRequest) {
  const token = req.cookies.get("access_token")?.value; // 🚀 Obtém o JWT dos cookies

  // Se o usuário tentar acessar "/tarefas" sem token, redirecionamos para "/login"
  if (!token && req.nextUrl.pathname.startsWith("/tarefas")) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

// 🚀 Definimos quais rotas serão protegidas
export const config = {
  matcher: ["/tarefas/:path*"], // Protege todas as rotas dentro de "/tarefas"
};
