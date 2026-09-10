import { createContext, useContext, useEffect, useState } from "react";

import eventService from "../../../features/events/services/event.service";
import type {
  EventType,
  CreateEventRequest,
} from "../../../features/events/types/event.types";

interface EventContextType {
  events: EventType[];
  loading: boolean;
  loadEvents: () => Promise<void>;
  createEvent: (event: CreateEventRequest) => Promise<EventType>;
  updateEvent: (id: number, event: EventType) => Promise<EventType>;
  deleteEvent: (id: number) => Promise<void>;
}

const EventContext = createContext<EventContextType | undefined>(undefined);

export function EventProvider({ children }: { children: React.ReactNode }) {
  const [events, setEvents] = useState<EventType[]>([]);
  const [loading, setLoading] = useState(true);

  const loadEvents = async () => {
    try {
      const data = await eventService.getAllEvents();
      setEvents(data);
    } catch (error) {
      console.error("Erro ao carregar eventos:", error);
    } finally {
      setLoading(false);
    }
  };

  const createEvent = async (event: CreateEventRequest): Promise<EventType> => {
    const newEvent = await eventService.createEvent(event);

    setEvents((currentEvents) => [...currentEvents, newEvent]);

    return newEvent;
  };

  const updateEvent = async (
    id: number,
    event: EventType,
  ): Promise<EventType> => {
    const updatedEvent = await eventService.updateEvent(id, event);

    setEvents((currentEvents) =>
      currentEvents.map((currentEvent) =>
        currentEvent.id === id ? updatedEvent : currentEvent,
      ),
    );

    return updatedEvent;
  };

  const deleteEvent = async (id: number): Promise<void> => {
    await eventService.deleteEvent(id);

    setEvents((currentEvents) =>
      currentEvents.filter((event) => event.id !== id),
    );
  };

  useEffect(() => {
    loadEvents();
  }, []);

  return (
    <EventContext.Provider
      value={{
        events,
        loading,
        loadEvents,
        createEvent,
        updateEvent,
        deleteEvent,
      }}
    >
      {children}
    </EventContext.Provider>
  );
}

export function useEvents() {
  const context = useContext(EventContext);

  if (!context) {
    throw new Error("useEvents deve ser usado dentro de EventProvider");
  }

  return context;
}
