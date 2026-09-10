import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";

import CreateEvent from "./CreateEvent";

vi.mock("../services/event.service", () => ({
  default: {
    createEvent: vi.fn(),
  },
}));

vi.mock("../../../shared/components/context/EventContext", () => ({
  useEvents: () => ({
    events: [],
    loading: false,
    error: null,
    fetchEvents: vi.fn(),
    addEvent: vi.fn(),
    updateEvent: vi.fn(),
    removeEvent: vi.fn(),
  }),
}));

describe("CreateEvent", () => {
  it("deve renderizar o formulário de criação de evento", () => {
    render(
      <MemoryRouter>
        <CreateEvent />
      </MemoryRouter>,
    );

    expect(
      screen.getByRole("heading", { name: "Criar Evento" }),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText("Ex.: Workshop React"),
    ).toBeInTheDocument();

    expect(
      screen.getByPlaceholderText(/Descreva seu evento/i),
    ).toBeInTheDocument();

    expect(screen.getByRole("combobox")).toBeInTheDocument();
  });
});
