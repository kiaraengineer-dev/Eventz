import api from "../../events/services/api";
import type {
  CadastroRequest,
  LoginRequest,
} from "../../../features/auth/types/auth.types";

export const cadastro = async (data: CadastroRequest) => {
  const response = await api.post("/auth/register", data);

  return response.data;
};

export const login = async (data: LoginRequest) => {
  const response = await api.post("/auth/login", data);

  return response.data;
};
