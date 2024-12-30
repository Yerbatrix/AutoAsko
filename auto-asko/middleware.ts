import { NextRequest, NextResponse } from "next/server";
import { jwtVerify } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY!); // Użyj TextEncoder dla jose

export async function middleware(req: NextRequest) {
  const token = req.cookies.get("token")?.value;

  if (req.nextUrl.pathname.startsWith("/admin")) {
    if (!token) {
      return NextResponse.redirect(new URL("/login", req.url));
    }

    try {
      const { payload } = await jwtVerify(token, SECRET_KEY);

      // Sprawdzenie roli admina
      if (payload.role !== "admin") {
        return NextResponse.redirect(new URL("/login", req.url));
      }

      return NextResponse.next();
    } catch (err) {
      console.error("Błąd podczas weryfikacji tokenu:", err);
      return NextResponse.redirect(new URL("/login", req.url));
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin/:path*", "/login"],
};
