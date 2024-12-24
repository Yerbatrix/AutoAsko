import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cars = [
    { id: 1, name: "Toyota Corolla", description: "Ekonomiczny", price: "45,000 PLN", image: "https://via.placeholder.com/300x200" },
    { id: 2, name: "BMW 3 Series", description: "Luksusowy sedan", price: "120,000 PLN", image: "https://via.placeholder.com/300x200" },
  ];

// GET - Pobierz wszystkie samochody
export async function GET() {
  const cars = await prisma.car.findMany();
  return NextResponse.json(cars);
}

// POST - Dodaj nowy samochód
export async function POST(req: Request) {
  const { name, description, image, price } = await req.json();

  const newCar = await prisma.car.create({
    data: { name, description, image, price },
  });

  return NextResponse.json(newCar);
}