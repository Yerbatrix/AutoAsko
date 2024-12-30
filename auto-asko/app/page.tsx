export default function Home() {
  return (
    <section>
      <h2 className="text-4xl font-bold mb-4">Witamy w AutoAśko!</h2>
      <p className="text-lg">
        Znajdź swoje wymarzone auto już dziś. Oferujemy najlepsze samochody nowe
        i używane.
      </p>
      <a href="/cars" className="text-blue-600 underline mt-4 inline-block">
        Zobacz naszą ofertę samochodów &rarr;
      </a>
    </section>
  );
}
