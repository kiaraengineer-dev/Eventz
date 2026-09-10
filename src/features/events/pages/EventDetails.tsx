import { useEffect, useState } from "react";

import { useNavigate, useParams } from "react-router-dom";

import {
  ArrowLeft,
  CalendarDays,
  Clock,
  MapPin,
  Ticket,
  Pencil,
  Trash2,
} from "lucide-react";

import Header from "../../../shared/components/layout/Header";
import Footer from "../../../shared/components/layout/Footer";

import eventService from "../services/event.service";
import type { EventType } from "../types/event.types";

export default function EventDetails() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [event, setEvent] = useState<EventType | null>(null);
  const [loading, setLoading] = useState(true);
  const [deleting, setDeleting] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    const loadEvent = async () => {
      try {
        if (!id) return;

        const data = await eventService.getEventById(Number(id));

        setEvent(data);
      } catch (error) {
        console.error("Erro ao carregar evento:", error);
      } finally {
        setLoading(false);
      }
    };

    loadEvent();
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <p className="text-xl sm:text-xl font-semibold text-gray-700">
          Carregando evento...
        </p>
      </div>
    );
  }

  if (!event) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

        <div className="min-h-[70vh] flex flex-col items-center justify-center px-6 sm:px-5 text-center ">
          <h1 className="text-3xl sm:text-3xl font-bold text-gray-900">
            Evento não encontrado
          </h1>

          <p className="text-gray-500 mt-3 max-w-md text-sm sm:text-base">
            O evento que você procura não existe ou foi removido.
          </p>

          <button
            onClick={() => navigate("/")}
            className="mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold px-6 sm:px-6 py-3 rounded-xl transition"
          >
            Voltar para eventos
          </button>
        </div>

        <Footer />
      </div>
    );
  }

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Tem certeza que deseja excluir este evento?",
    );

    if (!confirmed) {
      return;
    }

    try {
      setDeleting(true);

      await eventService.deleteEvent(event.id);

      alert("Evento excluído com sucesso!");

      navigate("/");
    } catch (error) {
      console.error("Erro ao excluir evento:", error);

      alert("Não foi possível excluir o evento.");
    } finally {
      setDeleting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header searchQuery={searchQuery} onSearchChange={setSearchQuery} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 text-gray-600 hover:text-orange-500 transition mb-6 sm:mb-8 text-sm sm:text-base font-semibold"
        >
          <ArrowLeft size={20} />
          <span>Voltar</span>
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 sm:gap-7 items-start">
          <div className="lg:col-span-2">
            <div className="relative">
              <div className="relative h-[380px] rounded-3xl sm:rounded-3xl overflow-hidden bg-blue-950 shadow-lg">
                <img
                  src={event.imageUrl}
                  alt={event.title}
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="absolute top-6 left-6 sm:top-6 sm:left-6 bg-orange-500 text-white px-4 sm:px-4 py-2 sm:py-2 rounded-xl text-sm sm:text-sm font-bold">
                EVENTZ
              </div>
            </div>

            <div className="mt-8 sm:mt-10">
              <span className="inline-block bg-indigo-50 text-indigo-700 px-4 sm:px-4 py-2 rounded-xl text-sm sm:text-base font-semibold">
                {event.category}
              </span>

              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mt-4">
                {event.title}
              </h1>

              <div className="mt-8 sm:mt-8 space-y-4">
                <div className="flex items-center gap-3 text-gray-700">
                  <CalendarDays
                    size={22}
                    className="text-orange-500 shrink-0"
                  />

                  <span>{event.eventDate}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <Clock size={22} className="text-orange-500 shrink-0" />

                  <span>{event.eventTime}</span>
                </div>

                <div className="flex items-center gap-3 text-gray-700">
                  <MapPin size={22} className="text-orange-500" />

                  <span>{event.location}</span>
                </div>
              </div>

              <div className="mt-10 sm:mt-10">
                <h2 className="text-2xl sm:text-2xl font-bold text-gray-900">
                  Sobre o evento
                </h2>

                <p className="mt-4 text-sm sm:text-base text-gray-600 leading-relaxed whitespace-pre-line">
                  {event.description}
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-3 mt-8 sm:mt-9">
                <button
                  type="button"
                  onClick={() => navigate(`/events/${event.id}/edit`)}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-blue-800 text-blue-800 font-semibold hover:bg-blue-800 hover:text-white transition sm:w-auto"
                >
                  <Pencil size={18} />
                  Editar
                </button>

                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={deleting}
                  className="flex items-center justify-center gap-2 px-5 py-3 rounded-xl border border-red-500 text-red-500 font-semibold hover:bg-red-500 hover:text-white transition disabled:opacity-50"
                >
                  <Trash2 size={18} />

                  {deleting ? "Excluindo..." : "Excluir"}
                </button>
              </div>
            </div>
          </div>

          <div className="min-w-0">
            <div className="bg-white rounded-3xl sm:rounded-3xl shadow-xl p-7 sm:p-7 sticky top-24 border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 shrink-0 rounded-xl bg-orange-50 flex items-center justify-center">
                  <Ticket size={24} className="text-orange-500" />
                </div>

                <div>
                  <p className="text-sm text-gray-500">Ingresso</p>

                  <p className="text-2xl sm:text-2xl font-bold text-gray-900">
                    R$ {event.price.toFixed(2).replace(".", ",")}
                  </p>
                </div>
              </div>

              <div className="border-t border-gray-200 my-6 sm:my-6" />

              <div className="flex items-center justify-between">
                <span className="text-gray-500">Disponíveis</span>

                <span className="font-bold text-gray-900">
                  {event.availableTickets}
                </span>
              </div>

              <div className="mt-6 sm:mt-6">
                <label
                  htmlFor="ticketQuantity"
                  className="block text-gray-700 font-semibold mb-2"
                >
                  Quantidade
                </label>

                <input
                  type="number"
                  id="ticketQuantity"
                  name="ticketQuantity"
                  min={1}
                  max={event.availableTickets}
                  defaultValue={1}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 text-gray-900 focus:outline-none focus:ring-2 focus:ring-orange-500 transition"
                />
              </div>

              <button
                type="button"
                className="w-full mt-6 bg-orange-500 hover:bg-orange-600 text-white font-semibold text-sm sm:text-base py-3 sm:py-3.5 rounded-xl transition flex items-center justify-center gap-2"
              >
                <Ticket size={20} />
                Comprar
              </button>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}
