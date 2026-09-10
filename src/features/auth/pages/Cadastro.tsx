import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { User, Mail, CreditCard, Phone } from "lucide-react";

import Button from "../../../shared/components/ui/Button";
import Input from "../../../shared/components/ui/Input";
import PasswordInput from "../../../shared/components/ui/PasswordInput";
import Checkbox from "../../../shared/components/ui/Checkbox";
import { cadastro } from "../services/auth.service";

export default function Cadastro() {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    cpf: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      const response = await cadastro(formData);

      alert(response);

      if (response === "Cadastro realizado com sucesso.") {
        navigate("/login");
      }
    } catch (error) {
      console.error("Erro ao cadastrar:", error);
      alert("Erro ao realizar cadastro.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-6">
      <div className="w-full max-w-md bg-slate-50 rounded-2xl shadow-xl p-8">
        
        <h1 className="text-3xl font-bold text-center text-orange-500">
          Eventz
        </h1>

        <p className="text-center text-gray-500 mt-2 mb-8">
          Crie sua conta gratuitamente
        </p>

        <form onSubmit={handleSubmit} className="space-y-5">
          <Input
            label="Nome completo"
            name="name"
            placeholder="Digite seu nome"
            icon={User}
            value={formData.name}
            onChange={handleChange}
            required
          />

          <Input
            label="E-mail"
            type="email"
            name="email"
            placeholder="Digite seu e-mail"
            icon={Mail}
            value={formData.email}
            onChange={handleChange}
            required
          />

          <Input
            label="CPF"
            name="cpf"
            placeholder="000.000.000-00"
            icon={CreditCard}
            value={formData.cpf}
            onChange={handleChange}
            required
          />

          <Input
            label="Telefone"
            name="phone"
            placeholder="(00) 00000-0000"
            icon={Phone}
            value={formData.phone}
            onChange={handleChange}
            required
          />

          <PasswordInput
            label="Senha"
            name="password"
            placeholder="Crie uma senha"
            value={formData.password}
            onChange={handleChange}
          />

          <PasswordInput
            label="Confirmar senha"
            name="confirmPassword"
            placeholder="Digite novamente sua senha"
            value={formData.confirmPassword}
            onChange={handleChange}
          />

          <Checkbox
            label="Li e aceito os Termos de Uso e Política de Privacidade."
            required
          />

          <Button variant="primary" className="w-full justify-center">
            Criar conta
          </Button>

          <p className="text-center text-sm text-gray-600">
            Já possui uma conta?{" "}
            <Link
              to="/login"
              className="text-blue-600 hover:underline font-medium"
            >
              Fazer login
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
