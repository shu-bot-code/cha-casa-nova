import React, { useMemo, useState } from "react";

// --- COMPONENTES ---
import { FAQ } from "./components/FAQ";
import { GiftCard } from "./components/GiftCard";
import { Header } from "./components/Header";
import { HowItWorks } from "./components/HowItWorks";
import { MagicCursor } from "./components/MagicCursor";
import { PixModal } from "./components/PixModal";

// --- LÓGICA E DADOS ---
import { giftList } from "./data/giftList";
import { usePixModal } from "./hooks/usePixModal";
import type { Category } from "./types/gift";

// Tipos para o filtro de status
type StatusFilter = "todos" | "disponivel" | "presenteado";

const App: React.FC = () => {
  // Estados dos Filtros
  const [categoryFilter, setCategoryFilter] = useState<Category>("todos");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");

  // Lógica do Modal Pix
  const { selectedGift, isOpen, openModal, closeModal } = usePixModal();

  // --- LÓGICA DE FILTRAGEM + ORDENAÇÃO A-Z ---
  const filteredGifts = useMemo(() => {
    // 1. Criamos uma cópia da lista original
    let list = [...giftList];

    // 2. Filtramos por Categoria (Case-insensitive e sem espaços)
    if (categoryFilter !== "todos") {
      list = list.filter(
        (g) =>
          g.categoria.trim().toLowerCase() ===
          categoryFilter.trim().toLowerCase()
      );
    }

    // 3. Filtramos por Status (Disponível ou Presenteado)
    if (statusFilter !== "todos") {
      list = list.filter((g) => g.status === statusFilter);
    }

    // 4. Ordenamos Alfabeticamente (A-Z) - Inteligente com acentos
    return list.sort((a, b) => a.nome.trim().localeCompare(b.nome.trim()));
  }, [categoryFilter, statusFilter]);

  // Definição das Categorias para os Botões
  const categories: { id: Category; label: string }[] = [
    { id: "todos", label: "Todas Categorias" },
    { id: "cozinha", label: "Cozinha" },
    { id: "mesa_preparo", label: "Mesa & Preparo" },
    { id: "quarto", label: "Quarto" },
    { id: "banheiro", label: "Banheiro" },
    { id: "lavanderia_limpeza", label: "Limpeza" },
    { id: "ferramentas", label: "Ferramentas" },
  ];

  // Opções de Status
  const statusOptions: { id: StatusFilter; label: string }[] = [
    { id: "todos", label: "Todos" },
    { id: "disponivel", label: "🎁 Disponíveis" },
    { id: "presenteado", label: "💜 Já Recebidos" },
  ];

  return (
    <div className="min-h-screen bg-background font-sans text-gray-900 scroll-smooth">
      {/* Varinha Mágica com Rastro Rosa */}
      <MagicCursor />
      
      {/* Menu Superior */}
      <Header />

      {/* --- HERO SECTION (APRESENTAÇÃO) --- */}
      <section id="home" className="pt-32 pb-20 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left">
          
          {/* Texto de Boas-vindas */}
          <div className="flex-1 space-y-6">
            <span className="text-primary font-bold tracking-[0.2em] text-xs uppercase animate-pulse">
              Seja bem-vindo(a) ao
            </span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
              Chá de Casa Nova do <br />
              <span className="text-primary italic">Shuma & Yas</span>
            </h2>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed">
              Finalmente o nosso sonho da casa nova saiu do papel! 
              Escolhemos cada item com carinho para o nosso novo começo. 
              Sinta-se à vontade para nos presentear através do Pix.
            </p>
            <div className="pt-4">
              <a
                href="#lista"
                className="bg-primary text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all inline-block active:scale-95"
              >
                Escolher um presente
              </a>
            </div>
          </div>

          {/* Ilustração do Casal */}
          <div className="flex-1 w-full max-w-sm md:max-w-md animate-in fade-in slide-in-from-right duration-1000">
            <div className="relative">
              {/* Elemento Decorativo atrás da foto */}
              <div className="absolute -inset-4 bg-accent/10 rounded-[3rem] rotate-3 -z-10"></div>
              
              <img 
                src="https://i.ibb.co/6RTPB4bV/casal.jpg" // <-- COLE SEU LINK DO IMGBB AQUI
                alt="Shuma e Yas"
                className="rounded-[2.5rem] shadow-2xl w-full object-cover border-4 border-white transform hover:rotate-0 transition-transform duration-500 -rotate-2"
              />
            </div>
          </div>
        </div>
      </section>

      {/* --- LISTA DE PRESENTES COM FILTROS --- */}
      <section id="lista" className="py-20 max-w-7xl mx-auto px-4 border-t border-gray-50">
        <div className="text-center mb-16 space-y-8">
          <h2 className="text-3xl font-bold italic">Nossa Lista</h2>

          <div className="space-y-8">
            {/* Filtros de Categoria */}
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => setCategoryFilter(cat.id)}
                  className={`px-5 py-2 rounded-full text-xs font-semibold transition-all duration-300 ${
                    categoryFilter === cat.id
                      ? "bg-primary text-white shadow-md scale-105"
                      : "bg-white text-gray-400 border border-gray-100 hover:border-primary/30 hover:text-primary"
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            {/* Filtros de Status */}
            <div className="flex justify-center gap-6 border-t border-gray-100 pt-8">
              {statusOptions.map((opt) => (
                <button
                  key={opt.id}
                  onClick={() => setStatusFilter(opt.id)}
                  className={`flex items-center gap-2 text-sm font-bold transition-all ${
                    statusFilter === opt.id
                      ? "text-primary border-b-2 border-primary pb-1"
                      : "text-gray-300 hover:text-gray-500 pb-1"
                  }`}
                >
                  {opt.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Grid de Cards (Ordenado A-Z) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGifts.length > 0 ? (
            filteredGifts.map((gift) => (
              <GiftCard key={gift.id} gift={gift} onPresent={openModal} />
            ))
          ) : (
            <div className="col-span-full py-20 text-center text-gray-400 italic">
              Nenhum item encontrado com esses filtros... ✨
            </div>
          )}
        </div>
      </section>

      {/* --- SEÇÕES ADICIONAIS --- */}
      <HowItWorks />
      <FAQ />

      {/* --- FOOTER COMPLETO --- */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 mt-20">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-16">
            
            {/* Coluna 1: Sobre */}
            <div className="space-y-4 text-center md:text-left">
              <h3 className="text-2xl font-bold text-gray-800 tracking-tighter">
                Shuma <span className="text-primary">&</span> Yas
              </h3>
              <p className="text-gray-500 text-sm leading-relaxed italic">
                "A casa é pequena, mas o coração é grande e cabe todo mundo! 
                Estamos ansiosos para receber cada um de vocês em nosso novo lar."
              </p>
              <div className="flex justify-center md:justify-start gap-4 text-xl">
                🏠 ✨ 🥂
              </div>
            </div>

            {/* Coluna 2: Navegação */}
            <div className="text-center md:text-left">
              <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-6">Navegação</h4>
              <nav className="flex flex-col gap-3">
                <a href="#home" className="text-gray-600 hover:text-primary transition-colors text-sm">Início</a>
                <a href="#lista" className="text-gray-600 hover:text-primary transition-colors text-sm">Lista de Presentes</a>
                <a href="#como-funciona" className="text-gray-600 hover:text-primary transition-colors text-sm">Como Funciona</a>
                <a href="#faq" className="text-gray-600 hover:text-primary transition-colors text-sm">Dúvidas Frequentes</a>
              </nav>
            </div>

            {/* Coluna 3: Contato */}
            <div className="text-center md:text-left space-y-6">
              <div>
                <h4 className="text-sm font-bold uppercase tracking-widest text-gray-400 mb-4">Alguma dúvida?</h4>
                <a
                  href="https://wa.me/5561996379257"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-primary/10 text-primary px-6 py-3 rounded-2xl font-bold hover:bg-primary hover:text-white transition-all duration-300"
                >
                  Falar no WhatsApp
                </a>
              </div>
              <p className="text-[10px] text-gray-400 leading-relaxed max-w-xs mx-auto md:mx-0 uppercase">
                Aviso: Este site é pessoal. Todo Pix é enviado diretamente para os anfitriões.
              </p>
            </div>
          </div>

          {/* Créditos Finais */}
          <div className="border-t border-gray-50 pt-8 flex flex-col md:flex-row justify-between items-center gap-4 text-gray-400 text-[11px]">
            <p>© 2026 • Chá de Casa Nova • Shuma & Yas</p>
            <p className="flex items-center gap-1">
              Desenvolvido por 
              <span className="text-gray-600 font-bold hover:text-primary transition-colors cursor-default">
                Wallyson Schumacher
              </span>
            </p>
          </div>
        </div>
      </footer>

      {/* Modal Pix */}
      <PixModal gift={selectedGift} isOpen={isOpen} onClose={closeModal} />
    </div>
  );
};

export default App;