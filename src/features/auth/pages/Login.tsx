import { Mail, Lock } from "lucide-react";
import Button from "../../../shared/components/ui/Button";
import { Link, useNavigate } from "react-router-dom";

import Input from "../../../shared/components/ui/Input";
import PasswordInput from "../../../shared/components/ui/PasswordInput";
import Checkbox from "../../../shared/components/ui/Checkbox";

import { useState } from "react";
import { login } from "../services/auth.service";
import { useAuth } from "../../../shared/components/context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const { loadUser } = useAuth();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await login({
        email,
        password,
      });

      localStorage.setItem("token", response.token);
      await loadUser();

      alert("Login realizado com sucesso!");

      navigate("/");
    } catch (error) {
      console.error("Erro ao fazer login:", error);
      alert("E-mail ou senha inválidos.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="bg-slate-50 w-full max-w-md rounded-2xl shadow-lg p-8">
        <h1 className="text-3xl font-bold text-center text-orange-500">
          Entrar
        </h1>

        <p className="text-gray-500 text-center mb-8">
          Acesse sua conta Eventz
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <div>
            <label className="block text-sm font-medium mb-2">E-mail</label>

            <div className="flex items-center border rounded-lg px-3">
              <Mail size={18} className="text-gray-400" />

              <input
                type="email"
                placeholder="Digite seu e-mail"
                className="w-full p-3 outline-none"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">Senha</label>

            <div className="flex items-center border rounded-lg px-3">
              <Lock size={18} className="text-gray-400" />

              <input
                type="password"
                placeholder="Digite sua senha"
                className="w-full p-3 outline-none"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
          </div>

          <div>
            <p className="text-sm text-gray-500 hover:underline cursor-pointer">
              Esqueceu a senha?
            </p>
          </div>

          <Button variant="primary" className="w-full justify-center">
            Entrar
          </Button>
          <div>
            <p className="text-sm text-gray-500">
              Ainda não possui uma conta?{" "}
              <Link to="/cadastro" className="text-blue-600 hover:underline">
                Cadastre-se
              </Link>
            </p>
          </div>
        </form>
      </div>
    </div>
  );
}
