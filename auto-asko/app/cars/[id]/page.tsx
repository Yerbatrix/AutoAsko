import { cars } from "../data";

export default function CarDetailsPage({ params }: { params: { id: string } }) {
  const car = cars.find((c) => c.id === parseInt(params.id));

  if (!car) {
    return <h2 className="text-2xl font-bold">Samochód nie znaleziony!</h2>;
  }

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
