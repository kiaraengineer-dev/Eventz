import Footer from "../../../shared/components/layout/Footer";
import EventCard from "../components/EventCard";
import { useEvents } from "../../../shared/components/context/EventContext";

export default function Explore() {
  const { events, loading } = useEvents();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="flex items-center justify-center h-screen text-xl font-semibold">
          Carregando eventos...
        </p>
      </div>
    );
  }

  
  const eventsByCategory = events.reduce(
    (groups, event) => {
      if (!groups[event.category]) {
        groups[event.category] = [];
      }

      groups[event.category].push(event);

      return groups;
    },
    {} as Record<string, typeof events>,
  );

  return (
    <div className="min-h-screen bg-gray-50">
     

      <main className="max-w-7xl mx-auto px-6 py-12">
       
        <div className="mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-orange-500">
            Explorar eventos
          </h1>

          <p className="mt-3 text-lg text-gray-500">
            Encontre experiências, shows, cursos e muito mais.
          </p>
        </div>

        
        {events.length === 0 ? (
          <p className="text-gray-500">Nenhum evento encontrado.</p>
        ) : (
          <div className="space-y-16">
            {Object.entries(eventsByCategory).map(
              ([category, categoryEvents]) => (
                <section key={category}>
                 
                  <div className="flex items-center justify-between mb-6">
                    <div>
                      <h2 className="text-2xl md:text-3xl font-bold text-gray-900">
                        {category}
                      </h2>

                      <div className="w-12 h-1 bg-orange-500 rounded-full mt-2" />
                    </div>

                    <button
                      type="button"
                      className="text-orange-500 font-semibold hover:text-orange-600 transition"
                    >
                      Ver mais →
                    </button>
                  </div>

                  
                  <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                    {categoryEvents.map((event) => (
                      <EventCard key={event.id} event={event} />
                    ))}
                  </div>
                </section>
              ),
            )}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
