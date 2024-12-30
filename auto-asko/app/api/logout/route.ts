import { NextResponse } from "next/server";

export async function POST() {
  const response = NextResponse.json({ message: "Wylogowano pomyślnie" });

  // Usunięcie ciasteczka `token`
  response.cookies.set("token", "", { httpOnly: true, expires: new Date(0) });
  return response;
}
