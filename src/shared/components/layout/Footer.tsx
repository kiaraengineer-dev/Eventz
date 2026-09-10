import { Link } from "react-router-dom";

import React from "react";

export default function Footer() {
  return (
    <footer className="bg-slate-900 text-white mt-20 sm:mt-32">
      <div className="max-w-6xl mx-auto px-6 sm:px-7 py-12 sm:py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-9 sm:gap-12">
          <div>
            <h2 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-orange-500 mb-4">
              Eventz
            </h2>

            <p className="text-gray-400 text-sm sm:text-base leading-relaxed">
              A plataforma líder de eventos no Brasil, conectando pessoas a
              experiências inesquecíveis. Descubra, participe e compartilhe
              momentos únicos com a Eventz.
            </p>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Empresa</h3>

            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>Sobre nós</li>
              <li>Blog</li>
              <li>Carreiras</li>
              <li>Contato</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Suporte</h3>

            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>Central de Ajuda</li>
              <li>Contato</li>
              <li>FAQ</li>
            </ul>
          </div>

          <div>
            <h3 className="font-semibold mb-4">Organizador</h3>

            <ul className="space-y-2 text-gray-400 text-sm sm:text-base">
              <li>Criar Evento</li>
              <li>Planos e Precos</li>
              <li>Favoritos</li>
              
              <li>
              <Link
                to="/my-events"
                className="hover:text-orange-400 transition"
              >
                Meus Eventos
              </Link>
            </li>


            </ul>
          </div>
        </div>
        <div className="border-t border-slate-700 mt-10 pt-6 text-center text-gray-500 text-sm">
          © 2026 Eventz. Todos os direitos reservados.
        </div>
      </div>
    </footer>
  );
}
