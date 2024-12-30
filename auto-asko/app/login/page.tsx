"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async () => {
    const res = await fetch("/api/auth", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, password }),
    });

    if (res.ok) {
      router.push("/admin");
    } else {
      setError("Nieprawidłowe dane logowania");
    }
  };

  return (
    <section className="p-6">
      <h1 className="text-4xl font-bold mb-4">Logowanie</h1>
      <div className="max-w-md mx-auto">
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="border rounded w-full p-2 mb-4"
        />
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white py-2 px-4 rounded w-full"
        >
          Zaloguj się
        </button>
        {error && <p className="text-red-500 mt-2">{error}</p>}
      </div>
    </section>
  );
}
