import { notFound } from "next/navigation";

export default async function CarDetailsPage({ params }: { params: { id: string } }) {
  const apiUrl = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

  // Pobieranie danych samochodu z API
  const res = await fetch(`${apiUrl}/api/cars/${params.id}`);
  if (!res.ok) {
    notFound(); // Automatycznie pokazuje stronę 404
  }

  const car = await res.json();

  return (
    <section>
      <h2 className="text-4xl font-bold mb-4">{car.name}</h2>
      <img
        src={car.image}
        alt={car.name}
        className="w-full max-w-3xl h-auto object-cover mb-4"
      />
      <p className="text-gray-700 text-lg">{car.description}</p>
      <p className="text-2xl font-semibold mt-4">Cena: {car.price}</p>
      <a href="/cars" className="text-blue-500 underline mt-6 inline-block">
        &larr; Powrót do listy samochodów
      </a>
    </section>
  );
}