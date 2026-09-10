import { CalendarDays, Heart, MapPin } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { EventType } from "../types/event.types";

interface EventCardProps {
  event: EventType;
}

export default function EventCard({ event }: EventCardProps) {
  const navigate = useNavigate();

  const providerLabel = {
    EVENTZ: "🟢 Venda no Eventz",
    TICKETMASTER: "🔵 Ticketmaster",
    SYMPLA: "🟣 Sympla",
  };

  const buttonLabel = {
    EVENTZ: "Comprar ingresso",
    TICKETMASTER: "Comprar na Ticketmaster",
    SYMPLA: "Comprar na Sympla",
  };

  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-xl transition duration-300">
      
      <div className="relative h-52 sm:h-60">
        <button className="absolute top-3 right-3 bg-white p-2 rounded-full shadow">
          <Heart size={18} />
        </button>

        <img
          src={event.imageUrl}
          alt={event.title}
          className="w-full h-full object-cover"
        />
      </div>
     

      
      <div className="p-4 sm:p-6">
        {/* Selo */}
        <p className="text-sm font-semibold text-gray-700">
          {providerLabel[event.provider]}
        </p>

        {/* Nome */}
        <h3 className="text-xl sm:text-xl font-bold mt-2 min-h-[56px]">{event.title}</h3>

        {/* Local */}
        <div className="flex items-center gap-2 mt-5 text-gray-600">
          <MapPin size={16} />
          <span className="text-sm sm:text-base line-clamp-2">{event.location}</span>
        </div>

        {/* Data */}
        <div className="flex items-center gap-2 mt-2 text-gray-600">
          <CalendarDays size={16} />
          <span className="text-sm sm:text-base">
            {event.eventDate} • {event.eventTime}
          </span>
        </div>

        {/* Botão */}
        <div className="mt-6">
          <button
            className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-xl font-semibold transition"
            onClick={() => {
              if (event.provider === "EVENTZ") {
                navigate(`/events/${event.id}`);
              } else {
                window.open(event.purchaseUrl!, "_blank");
              }
            }}
          >
            {buttonLabel[event.provider]}
          </button>
        </div>
      </div>
    </div>
  );
}
