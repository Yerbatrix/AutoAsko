import "./globals.css";

export const metadata = {
  title: "AutoAśko - Sprzedaż samochodów",
  description: "Najlepsze samochody nowe i używane w jednym miejscu!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pl">
      <body>
        <header className="bg-gray-800 text-white p-4">
          <nav className="container mx-auto flex justify-between">
            <h1 className="text-2xl font-bold">Auto Asko</h1>
            <ul className="flex gap-4">
              <li>
                <a href="/">Strona główna</a>
              </li>
              <li>
                <a href="/about">O nas</a>
              </li>
              <li>
                <a href="/cars">Nasze samochody</a>
              </li>
              <li>
                <a href="/contact">Kontakt</a>
              </li>
            </ul>
          </nav>
        </header>
        <main className="container mx-auto p-4">{children}</main>
        <footer className="bg-gray-800 text-white text-center p-4">
          &copy; {new Date().getFullYear()} Auto Asko. Wszystkie prawa
          zastrzeżone.
        </footer>
      </body>
    </html>
  );
}
