import { useEvents } from "../../../shared/components/context/EventContext";
import { useState } from "react";
import Header from "../../../shared/components/layout/Header";
import Footer from "../../../shared/components/layout/Footer";
import SearchBar from "../../../shared/components/ui/SearchBar";
import CategoryFilter from "../components/CategoryFilter";
import EventCard from "../components/EventCard";
import CollectionSection from "../components/CollectionsSection";
import CarrosselCard from "../components/CarrosselCard";

export default function Home() {
  const { events, loading } = useEvents();
  const [activeCategory, setActiveCategory] = useState("Todos");
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCity, setSelectedCity] = useState("Qualquer lugar");

  const featuredEvents = events
    .filter((event) => event.provider === "EVENTZ")
    .slice(0, 6);

  const filteredEvents = featuredEvents.filter((event) => {
    const matchesCategory =
      activeCategory === "Todos" || event.category === activeCategory;

    const matchesSearch =
      searchQuery.trim() === "" ||
      event.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      event.description?.toLowerCase().includes(searchQuery.toLowerCase());

    const matchesCity =
      selectedCity === "Qualquer lugar" ||
      event.location.toLowerCase().includes(selectedCity.toLowerCase());

    return matchesCategory && matchesSearch && matchesCity;
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen text-xl font-semibold">
        Carregando eventos...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <section className="bg-gradient-to-r from-gray-950 via-gray-950 to-blue-900 py-12 sm:py-16 lg:py-20 text-center">
        <p className="text-xs sm:text-sm text-orange-500 mb-4 uppercase tracking-wider  sm:tracking-wider font-semibold px-4 ">
          PLATAFORMA #1 DE EVENTOS DO BRASIL
        </p>

        <h1 className="text-4xl md:text-5xl font-bold mb-6 leading-tight max-w-2xl mx-auto text-white px-4">
          Descubra eventos{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-400 to-orange-600">
            incríveis
          </span>{" "}
          perto de você
        </h1>

        <p className="text-gray-400 mb-10 sm:mb-12 text-base sm:text-lg max-w-xl mx-auto px-6 sm:px-4 leading-relaxed">
          Shows, festivais, cursos e muito mais — tudo em um só lugar para você
          curtir ao máximo.
        </p>

        <div className="max-w-2xl mx-auto px-4">
          <SearchBar
            query={searchQuery}
            onQueryChange={setSearchQuery}
            selectedCity={selectedCity}
            onCityChange={setSelectedCity}
          />
        </div>
      </section>

      <CategoryFilter
        activeCategory={activeCategory}
        onCategoryChange={setActiveCategory}
      />

      <section className="max-w-7xl mx-auto px-6 py-12">
        <h2 className="text-3xl font-bold mb-8 ">Eventos em destaque</h2>

        {featuredEvents.length === 0 ? (
          <p className="text-gray-500">Nenhum evento encontrado.</p>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredEvents.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </section>

      <CollectionSection />

      <CarrosselCard />

      <Footer />
    </div>
  );
}
