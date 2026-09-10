import { User, Mail, CreditCard, Phone } from "lucide-react";
import { useAuth } from "../../../shared/components/context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function Profile() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <p className="text-gray-600">Carregando perfil...</p>
      </div>
    );
  }

  if (!user) {
    navigate("/login");
    return null;
  }

  return (
    <div className="min-h-screen bg-gray-100 py-6 sm:py-10 px-4 sm:px-6">
      <div className="max-w-3xl mx-auto">
        <div className="bg-white rounded-3xl shadow-xl overflow-hidden">
          <div className="bg-gradient-to-r from-blue-950 via-indigo-900 to-indigo-800 px-5 sm:px-8 py-8 sm:py-10 text-white">
            <div className="flex items-center gap-4 sm:gap-5">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-indigo-700 flex items-center justify-center">
                <User size={32} className="sm:hidden" />
                <User size={40} className="hidden sm:block" />
              </div>

              <div>
                <h1 className="text-2xl sm:text-3xl font-bold">Meu Perfil</h1>

                <p className="text-blue-100 mt-2 text-sm sm:text-base">
                  Gerencie suas informações pessoais.
                </p>
              </div>
            </div>
          </div>

          <div className="p-5 sm:p-8 space-y-5 sm:space-y-6">
            {/* NOME */}
            <div className="flex items-center gap-4 border-b pb-5">
              <User className="text-indigo-600" size={22} />

              <div>
                <p className="text-sm text-gray-500">Nome completo</p>

                <p className="text-lg font-semibold text-gray-900">
                  {user.name}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b pb-5">
              <Mail className="text-indigo-600" size={22} />

              <div>
                <p className="text-sm text-gray-500">E-mail</p>

                <p className="text-lg font-semibold text-gray-900">
                  {user.email}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4 border-b pb-5">
              <CreditCard className="text-indigo-600" size={22} />

              <div>
                <p className="text-sm text-gray-500">CPF</p>

                <p className="text-lg font-semibold text-gray-900">
                  {user.cpf}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Phone className="text-indigo-600" size={22} />

              <div>
                <p className="text-sm text-gray-500">Telefone</p>

                <p className="text-lg font-semibold text-gray-900">
                  {user.phone}
                </p>
              </div>
            </div>
          </div>

          <div className="px-5 sm:px-8 pb-6 sm:pb-8 flex flex-col-reverse sm:flex-row items-center justify-between gap-4">
            <button
              type="button"
              onClick={() => navigate("/")}
              className="flex items-center gap-2 text-gray-600 hover:text-indigo-600 font-medium text-sm sm:text-base transition"
            >
              <span className="text-xl">←</span>
              Voltar para início
            </button>

            <button
              type="button"
              className="w-full sm:w-auto bg-indigo-600 hover:bg-indigo-700 text-white font-semibold text-sm sm:text-base py-2.5 px-6 rounded-xl transition"
            >
              Editar Perfil
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
