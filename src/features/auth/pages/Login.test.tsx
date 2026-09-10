import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";

import Login from "./Login";

vi.mock("../../../shared/components/context/AuthContext", () => ({
  useAuth: () => ({
    user: null,
    loading: false,
    loadUser: vi.fn(),
    logout: vi.fn(),
  }),
}));

vi.mock("../services/auth.service", () => ({
  login: vi.fn(),
}));

describe("Login", () => {
  it("deve renderizar a tela de login e permitir preencher os campos", async () => {
    const user = userEvent.setup();

    render(
      <MemoryRouter>
        <Login />
      </MemoryRouter>,
    );

    expect(screen.getByRole("heading", { name: "Entrar" })).toBeInTheDocument();

    const emailInput = screen.getByPlaceholderText("Digite seu e-mail");
    const passwordInput = screen.getByPlaceholderText("Digite sua senha");

    await user.type(emailInput, "teste@email.com");
    await user.type(passwordInput, "123456");

    expect(emailInput).toHaveValue("teste@email.com");
    expect(passwordInput).toHaveValue("123456");
  });
});
