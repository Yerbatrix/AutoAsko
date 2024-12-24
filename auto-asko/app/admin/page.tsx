"use client";
import { useState, useEffect } from "react";
import { Car } from "../../types";
export default function AdminPage() {
  const [cars, setCars] = useState<Car[]>([]);
  const [newCar, setNewCar] = useState<Partial<Car>>({
    name: "",
    description: "",
    price: "",
    image: "https://via.placeholder.com/300x200", // Domyślny obrazek
  });

  useEffect(() => {
    const fetchCars = async () => {
      const res = await fetch("/api/cars");
      const data = await res.json();
      setCars(data);
    };

    fetchCars();
  }, []);

  const addCar = async () => {
    if (newCar.name && newCar.description && newCar.price) {
      const res = await fetch("/api/cars", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newCar),
      });

      if (res.ok) {
        const createdCar = await res.json();
        setCars([...cars, createdCar]);
        setNewCar({ name: "", description: "", price: "", image: "" });
      }
    }
  };

  const deleteCar = async (id: number) => {
    console.log(`Wysyłam żądanie DELETE do /api/cars/${id}`);
    const res = await fetch(`/api/cars/${id}`, { method: "DELETE" });
  
    if (res.ok) {
      setCars(cars.filter((car) => car.id !== id)); // Usuń samochód lokalnie
    } else {
      console.error("Nie udało się usunąć samochodu");
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-4xl font-bold mb-4">Panel Administratora</h1>

      {/* Formularz dodawania samochodów */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-2">Dodaj nowy samochód</h2>
        <div className="flex flex-col gap-4 max-w-md">
          <input
            type="text"
            placeholder="Nazwa samochodu"
            value={newCar.name}
            onChange={(e) => setNewCar({ ...newCar, name: e.target.value })}
            className="border rounded p-2 text-black"
          />
          <input
            type="text"
            placeholder="Opis samochodu"
            value={newCar.description}
            onChange={(e) =>
              setNewCar({ ...newCar, description: e.target.value })
            }
            className="border rounded p-2 text-black"
          />
          <input
            type="text"
            placeholder="Cena samochodu"
            value={newCar.price}
            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
            className="border rounded p-2 text-black"
          />
          <button
            onClick={addCar}
            className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
          >
            Dodaj samochód
          </button>
        </div>
      </div>

      {/* Lista samochodów */}
      <div>
        <h2 className="text-2xl font-semibold mb-2">Lista samochodów</h2>
        <ul className="space-y-4">
          {cars.map((car) => (
            <li
              key={car.id}
              className="flex justify-between items-center border p-4 rounded shadow"
            >
              <div>
                <h3 className="text-xl font-bold">{car.name}</h3>
                <p>{car.description}</p>
                <p className="font-semibold mt-1">{car.price}</p>
              </div>
              <button
                onClick={() => deleteCar(car.id)}
                className="bg-red-500 text-white py-1 px-3 rounded hover:bg-red-600"
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}