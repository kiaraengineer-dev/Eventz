import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, waitFor } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";

import EventDetails from "./EventDetails";
import eventService from "../services/event.service";

vi.mock("../services/event.service", () => ({
  default: {
    getEventById: vi.fn(),
    deleteEvent: vi.fn(),
  },
}));

vi.mock("../../../shared/components/layout/Header", () => ({
  default: () => <header>Header</header>,
}));

vi.mock("../../../shared/components/layout/Footer", () => ({
  default: () => <footer>Footer</footer>,
}));

describe("EventDetails", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("deve carregar e exibir os dados do evento", async () => {
    const event = {
      id: 1,
      title: "Festival de Música",
      description: "Um grande festival de música",
      location: "Salvador - BA",
      eventDate: "2026-10-10",
      eventTime: "19:00",
      category: "Música",
      imageUrl: "https://imagem.com/evento.jpg",
      price: 50,
      totalTickets: 100,
      availableTickets: 80,
      provider: "EVENTZ" as const,
      purchaseUrl: null,
    };

    vi.mocked(eventService.getEventById).mockResolvedValue(event);

    render(
      <MemoryRouter initialEntries={["/events/1"]}>
        <Routes>
          <Route path="/events/:id" element={<EventDetails />} />
        </Routes>
      </MemoryRouter>,
    );

    await waitFor(() => {
      expect(
        screen.getByRole("heading", {
          name: "Festival de Música",
        }),
      ).toBeInTheDocument();
    });

    expect(
      screen.getByText("Um grande festival de música"),
    ).toBeInTheDocument();

    expect(screen.getByText("Salvador - BA")).toBeInTheDocument();

    expect(screen.getByText("2026-10-10")).toBeInTheDocument();

    expect(screen.getByText("19:00")).toBeInTheDocument();

    expect(screen.getByText("80")).toBeInTheDocument();

    expect(eventService.getEventById).toHaveBeenCalledWith(1);
  });
});
