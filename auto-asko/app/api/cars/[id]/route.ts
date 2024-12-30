import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function GET(
  req: Request,
  { params }: { params: { id: string } }
) {
  const carId = parseInt(params.id, 10);

  if (isNaN(carId)) {
    return NextResponse.json(
      { error: "Nieprawidłowe ID samochodu" },
      { status: 400 }
    );
  }

  try {
    const car = await prisma.car.findUnique({
      where: { id: carId },
    });

    if (!car) {
      return NextResponse.json(
        { error: "Samochód nie znaleziony" },
        { status: 404 }
      );
    }

    return NextResponse.json(car);
  } catch (error) {
    console.error("Błąd podczas pobierania samochodu:", error);
    return NextResponse.json(
      { error: "Nie udało się pobrać samochodu" },
      { status: 500 }
    );
  }
}

// Obsługa metody DELETE
export async function DELETE(req: Request) {
  const url = new URL(req.url);
  const id = url.pathname.split("/").pop();
  const carId = parseInt(id || "", 10);

  if (isNaN(carId)) {
    return NextResponse.json(
      { error: "Nieprawidłowe ID samochodu" },
      { status: 400 }
    );
  }

  try {
    await prisma.car.delete({
      where: { id: carId },
    });

    return NextResponse.json(
      { message: "Samochód został usunięty" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Błąd podczas usuwania samochodu:", error);
    return NextResponse.json(
      { error: "Nie udało się usunąć samochodu" },
      { status: 500 }
    );
  }
}
