
import {
  UserCircle,
  LogIn,
  LogOut,
  Menu,
  X,
} from "lucide-react";

import Button from "../ui/Button";

import { useAuth } from "../context/AuthContext";

import { Link, useNavigate } from "react-router-dom";

import { useState } from "react";

type HeaderProps = {
  searchQuery: string;
  onSearchChange: (query: string) => void;
};

export default function Header({
  searchQuery,
  onSearchChange,
}: HeaderProps) {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    logout();
    setMenuOpen(false);
    navigate("/login");
  };

  const closeMenu = () => {
    setMenuOpen(false);
  };

  return (
    <header className="bg-gradient-to-r from-gray-950 via-gray-900 to-blue-950 px-4 sm:px-6 lg:px-10 py-4 text-white sticky top-0 z-50">
      
      
      <div className="flex items-center justify-between gap-4">

        
        <div className="flex items-center gap-10">

          
          <Link
            to="/"
            onClick={closeMenu}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-500 whitespace-nowrap"
          >
            Eventz
          </Link>

          
          <nav className="hidden lg:flex gap-6">
            <Link
              to="/explore"
              className="text-gray-300 hover:text-white transition-colors"
            >
              Explorar Eventos
            </Link>

            <Link to="/create-event">
              <button className="text-gray-300 hover:text-white transition-colors">
                Criar Eventos
              </button>
            </Link>

            <button className="text-gray-300 hover:text-white transition-colors">
              Para Empresas
            </button>

            <button className="text-gray-300 hover:text-white transition-colors">
              Ajuda
            </button>
          </nav>
        </div>

        
        <div className="hidden md:flex flex-1 justify-center px-4 lg:px-10">
          <div className="relative w-full max-w-md group">
            <div
              className="flex items-center bg-white/10 border border-white/10 rounded-xl px-3 py-2 transition-all duration-300
              focus-within:bg-white/20 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
            >
              <UserCircle
                size={18}
                className="text-gray-500 group-focus-within:text-blue-400 transition-colors"
              />

              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                className="w-full bg-transparent border-none outline-none pl-3 text-sm text-white placeholder:text-gray-500"
                placeholder="Buscar eventos..."
              />
            </div>
          </div>
        </div>

        
        <div className="hidden lg:flex items-center gap-2 bg-white/5 p-1 rounded-xl">

          {user && (
            <Link
              to="/profile"
              className="px-3 py-2 text-sm font-medium text-white hover:text-orange-400 transition"
            >
              Olá, {user.name}
            </Link>
          )}

          {user ? (
            <Button
              variant="ghost"
              icon={LogOut}
              onClick={handleLogout}
            >
              Sair
            </Button>
          ) : (
            <>
              <Link to="/login">
                <Button variant="ghost" icon={LogIn}>
                  Entrar
                </Button>
              </Link>

              <Link to="/cadastro">
                <Button variant="primary">
                  Cadastrar
                </Button>
              </Link>
            </>
          )}
        </div>

       
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="lg:hidden p-2 rounded-lg hover:bg-white/10 transition"
          aria-label={menuOpen ? "Fechar menu" : "Abrir menu"}
        >
          {menuOpen ? <X size={26} /> : <Menu size={26} />}
        </button>
      </div>

      
      <div className="md:hidden mt-4">
        <div className="relative w-full group">
          <div
            className="flex items-center bg-white/10 border border-white/10 rounded-xl px-3 py-2
            focus-within:bg-white/20 focus-within:border-blue-500 focus-within:ring-2 focus-within:ring-blue-500/20"
          >
            <UserCircle
              size={18}
              className="text-gray-500 group-focus-within:text-blue-400 transition-colors"
            />

            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="w-full bg-transparent border-none outline-none pl-3 text-sm text-white placeholder:text-gray-500"
              placeholder="Buscar eventos..."
            />
          </div>
        </div>
      </div>

     
      {menuOpen && (
        <div className="lg:hidden mt-4 border-t border-white/10 pt-4 pb-2">

          <nav className="flex flex-col gap-1">

            <Link
              to="/explore"
              onClick={closeMenu}
              className="px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              Explorar Eventos
            </Link>

            <Link
              to="/create-event"
              onClick={closeMenu}
              className="px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              Criar Eventos
            </Link>

            <button
              className="text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              Para Empresas
            </button>

            <button
              className="text-left px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
            >
              Ajuda
            </button>

            
            <div className="border-t border-white/10 mt-2 pt-2">

              {user ? (
                <>
                  <Link
                    to="/profile"
                    onClick={closeMenu}
                    className="block px-4 py-3 rounded-lg text-white hover:bg-white/10 transition"
                  >
                    Olá, {user.name}
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="flex items-center gap-2 w-full px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                  >
                    <LogOut size={18} />
                    Sair
                  </button>
                </>
              ) : (
                <>
                  <Link
                    to="/login"
                    onClick={closeMenu}
                    className="flex items-center gap-2 px-4 py-3 rounded-lg text-gray-300 hover:bg-white/10 hover:text-white transition"
                  >
                    <LogIn size={18} />
                    Entrar
                  </Link>

                  <Link
                    to="/cadastro"
                    onClick={closeMenu}
                    className="block px-4 py-3"
                  >
                    <Button variant="primary">
                      Cadastrar
                    </Button>
                  </Link>
                </>
              )}

            </div>
          </nav>
        </div>
      )}
    </header>
  );
}


