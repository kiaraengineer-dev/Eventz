export interface CadastroRequest {
  name: string;
  email: string;
  cpf: string;
  phone: string;
  password: string;
  confirmPassword: string;
}

export interface LoginRequest {
  email: string;
  password: string;
}

export interface AuthResponse {
  token: string;
  type: string;
}
