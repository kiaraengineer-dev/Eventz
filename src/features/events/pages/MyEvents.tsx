import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { CalendarDays, MapPin, Plus, Pencil, Trash2 } from "lucide-react";

import Header from "../../../shared/components/layout/Header";
import Footer from "../../../shared/components/layout/Footer";
import eventService from "../services/event.service";
import type { EventType } from "../types/event.types";

export default function MyEvents() {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    const loadMyEvents = async () => {
      try {
        const data = await eventService.getMyEvents();
        setEvents(data);
      } catch (error) {
        console.error("Erro ao carregar meus eventos:", error);
      } finally {
        setLoading(false);
      }
    };

    loadMyEvents();
  }, []);

  const handleDelete = async (id: number) => {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este evento?",
    );

    if (!confirmDelete) return;

    try {
      await eventService.deleteEvent(id);

      setEvents((currentEvents) =>
        currentEvents.filter((event) => event.id !== id),
      );
    } catch (error) {
      console.error("Erro ao excluir evento:", error);
      alert("Não foi possível excluir o evento.");
    }
  };

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-10">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-3xl sm:text-4xl font-bold text-white">
              Meus Eventos
            </h1>

            <p className="text-gray-700 mt-2 sm:mt-4 text-sm sm:text-lg font-semibold">
              Crie seus novos eventos
            </p>
          </div>

          <Link
            to="/create-event"
            className="inline-flex items-center justify-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-4 sm:px-5 py-2.5 sm:py-3 rounded-xl font-semibold text-sm sm:text-base transition"
          >
            <Plus size={20} />
            Criar evento
          </Link>
        </div>

        {loading && (
          <div className="text-center py-16">
            <p className="text-xl sm:text-xl font-semibold text-gray-700 ">
              Carregando seus eventos...
            </p>
          </div>
        )}

        {!loading && events.length === 0 && (
          <div className="bg-white/10 border border-[#1e3f7f] rounded-2xl p-8 sm:p-12 text-center">
            <h2 className="text-xl sm:text-2xl font-bold text-white mb-2">
              Você ainda não criou nenhum evento.
            </h2>

            <p className="text-gray-700 mb-6">
              Voce ainda não criou nenhum evento. Clique no botão abaixo para criar seu primeiro evento.
            </p>

            <Link
              to="/create-event"
              className="inline-flex items-center gap-2 bg-orange-500 hover:bg-orange-600 text-white px-5 py-3 rounded-xl font-semibold transition"
            >
              <Plus size={20} />
              Novo Evento
            </Link>
          </div>
        )}

        {!loading && events.length > 0 && filteredEvents.length === 0 && (
          <div className="text-center py-16">
            <p className="text-gray-300">Nenhum evento encontrado.</p>
          </div>
        )}

        {!loading && filteredEvents.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredEvents.map((event) => (
              <div
                key={event.id}
                className="bg-white rounded-2xl shadow-md overflow-hidden"
              >
                <div className="relative h-52 sm:h-60">
                  <img
                    src={event.imageUrl}
                    alt={event.title}
                    className="w-full h-full object-cover"
                  />
                </div>

                <div className="p-4 sm:p-6">
                  <h3 className="text-xl font-bold text-gray-900">
                    {event.title}
                  </h3>

                  <div className="flex items-center gap-2 mt-4 text-gray-600">
                    <MapPin size={16} />
                    <span className="text-sm line-clamp-2">
                      {event.location}
                    </span>
                  </div>

                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <CalendarDays size={16} />
                    <span className="text-sm">
                      {event.eventDate} • {event.eventTime}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2 mt-6">
                    <button
                      onClick={() => navigate(`/events/${event.id}`)}
                      className="flex-1 bg-[#1e3f7f] hover:bg-[#163264] text-white py-2.5 rounded-lg font-semibold text-sm sm:text-base transition"
                    >
                      Ver evento
                    </button>

                    <div className="grid grid-cols-2 gap-2">
                      <button
                        onClick={() => navigate(`/events/${event.id}/edit`)}
                        className="flex items-center justify-center gap-1.5 border border-[#1e3f7f] text-[#1e3f7f] hover:bg-[#1e3f7f] hover:text-white px-3 py-2.5 rounded-lg text-sm font-medium transition"
                        title="Editar evento"
                      >
                        <Pencil size={15} />
                        Editar
                      </button>

                      <button
                        onClick={() => handleDelete(event.id)}
                        className="flex items-center justify-center gap-1.5 border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 py-2.5 rounded-lg text-sm font-medium transition"
                        title="Excluir evento"
                      >
                        <Trash2 size={15} />
                        Excluir
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}
