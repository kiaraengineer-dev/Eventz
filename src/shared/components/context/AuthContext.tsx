import { createContext, useContext, useEffect, useState } from "react";

import api from "../../../features/events/services/api";

interface User {
  id: number;

  name: string;

  email: string;

  cpf: string;

  phone: string;
}

interface AuthContextType {
  user: User | null;

  loading: boolean;

  loadUser: () => Promise<void>;

  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  const [loading, setLoading] = useState(true);

  const loadUser = async () => {
    const token = localStorage.getItem("token");

    if (!token) {
      setUser(null);

      setLoading(false);

      return;
    }

    try {
      const response = await api.get("/users/me");

      setUser(response.data);
    } catch (error) {
      console.error("Erro ao carregar usuário:", error);

      localStorage.removeItem("token");

      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadUser();
  }, []);

  const logout = () => {
    localStorage.removeItem("token");

    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,

        loading,

        loadUser,

        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth deve ser usado dentro de AuthProvider");
  }

  return context;
}
