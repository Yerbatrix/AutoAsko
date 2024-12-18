"use client";
import { useState } from "react";
import { cars as carlist } from "../cars/data";

export default function AdminPage() {
  // Stan z listą samochodów
  const [cars, setCars] = useState(carlist);

  // Stan dla nowego samochodu
  const [newCar, setNewCar] = useState({
    name: "",
    description: "",
    price: "",
  });

  // Funkcja do dodawania nowego samochodu
  const addCar = () => {
    if (newCar.name && newCar.description && newCar.price) {
      const newCarData = {
        id: cars.length + 1,
        ...newCar,
        image: "https://via.placeholder.com/300x200",
      };
      setCars([...cars, newCarData]);
      setNewCar({ name: "", description: "", price: "" }); // Czyszczenie formularza
    }
  };

  // Funkcja do usuwania samochodu
  const deleteCar = (id: number) => {
    setCars(cars.filter((car) => car.id !== id));
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
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Opis samochodu"
            value={newCar.description}
            onChange={(e) =>
              setNewCar({ ...newCar, description: e.target.value })
            }
            className="border rounded p-2"
          />
          <input
            type="text"
            placeholder="Cena samochodu"
            value={newCar.price}
            onChange={(e) => setNewCar({ ...newCar, price: e.target.value })}
            className="border rounded p-2"
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
