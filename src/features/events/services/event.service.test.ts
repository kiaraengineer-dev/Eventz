import { describe, it, expect, vi, beforeEach } from "vitest";
import eventService from "./event.service";
import api from "./api";

import type { EventType, CreateEventRequest } from "../types/event.types";

vi.mock("./api", () => ({
  default: {
    get: vi.fn(),
    post: vi.fn(),
  },
}));

describe("EventService", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve buscar todos os eventos", async () => {
    const events: EventType[] = [
      {
        id: 1,
        title: "Festival de Música",
        description: "Um grande festival",
        location: "Salvador - BA",
        eventDate: "2026-10-10",
        eventTime: "19:00",
        category: "Música",
        imageUrl: "https://imagem.com/evento.jpg",
        price: 50,
        totalTickets: 100,
        availableTickets: 100,
        provider: "EVENTZ",
        purchaseUrl: null,
      },
    ];

    vi.mocked(api.get).mockResolvedValue({
      data: events,
    });

    const result = await eventService.getAllEvents();

    expect(api.get).toHaveBeenCalledWith("/events");
    expect(result).toEqual(events);
  });

  it("deve criar um evento", async () => {
    const newEvent: CreateEventRequest = {
      title: "Workshop React",
      description: "Workshop sobre React",
      location: "Salvador - BA",
      eventDate: "2026-10-20",
      eventTime: "19:00",
      category: "Tecnologia",
      imageUrl: "https://imagem.com/workshop.jpg",
      price: 30,
      totalTickets: 50,
    };

    const createdEvent: EventType = {
      id: 2,
      ...newEvent,
      availableTickets: 50,
      provider: "EVENTZ",
      purchaseUrl: null,
    };

    vi.mocked(api.post).mockResolvedValue({
      data: createdEvent,
    });

    const result = await eventService.createEvent(newEvent);

    expect(api.post).toHaveBeenCalledWith("/events", newEvent);
    expect(result).toEqual(createdEvent);
  });
});
