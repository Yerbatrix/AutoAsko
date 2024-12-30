import { NextResponse } from "next/server";
import { SignJWT } from "jose";

const SECRET_KEY = new TextEncoder().encode(process.env.SECRET_KEY!);
const ADMIN_CREDENTIALS = {
  username: process.env.ADMIN_USERNAME!,
  password: process.env.ADMIN_PASSWORD!,
};

if (!SECRET_KEY || !ADMIN_CREDENTIALS.username || !ADMIN_CREDENTIALS.password) {
  throw new Error("Brak wymaganych zmiennych środowiskowych");
}

export async function POST(req: Request) {
  const { username, password } = await req.json();

  if (
    username === ADMIN_CREDENTIALS.username &&
    password === ADMIN_CREDENTIALS.password
  ) {
    const token = await new SignJWT({ role: "admin" })
      .setProtectedHeader({ alg: "HS256" })
      .setExpirationTime("1h")
      .sign(SECRET_KEY);

    const response = NextResponse.json({ message: "Zalogowano pomyślnie" });
    response.cookies.set("token", token, { httpOnly: true, secure: true });
    return response;
  }

  return NextResponse.json(
    { error: "Nieprawidłowe dane logowania" },
    { status: 401 }
  );
}
