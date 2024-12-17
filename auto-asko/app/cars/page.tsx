import Link from "next/link";
import { cars } from "./data";

export default function CarsPage() {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-6">Nasze Samochody</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {cars.map((car) => (
          <div
            key={car.id}
            className="border rounded-lg shadow-md overflow-hidden"
          >
            <img
              src={car.image}
              alt={car.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-2xl font-bold">{car.name}</h3>
              <p className="text-gray-600">{car.description}</p>
              <p className="text-lg font-semibold mt-2">{car.price}</p>
              <Link href={`/cars/${car.id}`}>
                <span className="text-blue-500 hover:underline mt-4 inline-block">
                  Zobacz szczegóły &rarr;
                </span>
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
