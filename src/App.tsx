import React, { useMemo, useState } from "react";

// --- COMPONENTES ---
import { FAQ } from "./components/FAQ";
import { GiftCard } from "./components/GiftCard";
import { Header } from "./components/Header";
import { HowItWorks } from "./components/HowItWorks";
import { PixModal } from "./components/PixModal";
import { QuotaModal } from "./components/QuotaModal"; // VERIFIQUE O NOME
import { QuotaSection } from "./components/QuotaSection"; // VERIFIQUE O NOME

// --- LÓGICA E DADOS ---
import { giftList } from "./data/giftList";
import { usePixModal } from "./hooks/usePixModal";
import type { Category } from "./types/gift";

type StatusFilter = "todos" | "disponivel" | "presenteado";

const App: React.FC = () => {
  const [categoryFilter, setCategoryFilter] = useState<Category>("todos");
  const [statusFilter, setStatusFilter] = useState<StatusFilter>("todos");

  // Estados para Cotas
  const [selectedQuota, setSelectedQuota] = useState<any>(null);
  const [quotaQty, setQuotaQty] = useState(1);
  const [isQuotaModalOpen, setIsQuotaModalOpen] = useState(false);

  const { selectedGift, isOpen, openModal, closeModal } = usePixModal();

  // Função para abrir o modal de cotas
  const handleOpenQuotaModal = (quota: any, quantity: number) => {
    setSelectedQuota(quota);
    setQuotaQty(quantity);
    setIsQuotaModalOpen(true);
  };

  const filteredGifts = useMemo(() => {
    let list = [...giftList];
    if (categoryFilter !== "todos") {
      list = list.filter((g) => g.categoria.trim().toLowerCase() === categoryFilter.trim().toLowerCase());
    }
    if (statusFilter !== "todos") {
      list = list.filter((g) => g.status === statusFilter);
    }
    return list.sort((a, b) => a.nome.trim().localeCompare(b.nome.trim()));
  }, [categoryFilter, statusFilter]);

  const categories: { id: Category; label: string }[] = [
    { id: "todos", label: "Todas Categorias" },
    { id: "cozinha", label: "Cozinha" },
    { id: "mesa_preparo", label: "Mesa & Preparo" },
    { id: "quarto", label: "Quarto" },
    { id: "banheiro", label: "Banheiro" },
    { id: "lavanderia_limpeza", label: "Limpeza" },
    { id: "ferramentas", label: "Ferramentas" },
  ];

  const statusOptions: { id: StatusFilter; label: string }[] = [
    { id: "todos", label: "Todos" },
    { id: "disponivel", label: "🎁 Disponíveis" },
    { id: "presenteado", label: "💜 Já Recebidos" },
  ];

  return (
    <div className="min-h-screen bg-[#FAF9F6] font-sans text-gray-900 scroll-smooth">
      <Header />

      {/* 1. HERO */}
      <section id="home" className="pt-32 pb-10 px-4">
        <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 text-left">
          <div className="flex-1 space-y-6">
            <span className="text-[#8E9775] font-bold tracking-[0.2em] text-xs uppercase animate-pulse">Seja bem-vindo(a) ao</span>
            <h2 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">Chá de Casa Nova do <br /><span className="text-[#8E9775] italic">Shuma & Yas</span></h2>
            <p className="text-gray-500 text-lg max-w-lg leading-relaxed">Caixas, mudança e alegria! Preparamos esta lista para quem quiser nos dar um 'empurrãozinho' via Pix. Prometemos um café ou um brinde na visita!</p>
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <a href="#lista" className="bg-[#8E9775] text-white px-10 py-4 rounded-2xl font-bold shadow-lg hover:shadow-xl transition-all text-center">Lista Comum</a>
              <a href="#cotas" className="bg-white text-[#8E9775] border-2 border-[#8E9775] px-10 py-4 rounded-2xl font-bold hover:bg-[#8E9775]/5 transition-all text-center">Grandes Sonhos</a>
            </div>
          </div>
          <div className="flex-1 w-full max-w-sm md:max-w-md">
            <div className="relative">
              <div className="absolute -inset-4 bg-[#E28E8E]/10 rounded-[3rem] rotate-3 -z-10"></div>
              <img src="https://i.ibb.co/jvvfS3F4/casal.png" alt="Shuma e Yas" className="rounded-[2.5rem] shadow-2xl w-full object-cover border-4 border-white transform -rotate-2" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. COTAS (GRANDES SONHOS) */}
      <QuotaSection onOpenModal={handleOpenQuotaModal} />

      {/* 3. LISTA COMUM */}
      <section id="lista" className="pt-4 pb-20 max-w-7xl mx-auto px-4 border-t border-gray-50">
        <div className="text-center mb-8 space-y-4">
          <h2 className="text-3xl font-bold italic">Nossa Lista</h2>
          <div className="space-y-6">
            <div className="flex flex-wrap justify-center gap-2">
              {categories.map((cat) => (
                <button key={cat.id} onClick={() => setCategoryFilter(cat.id)} className={`px-5 py-2 rounded-full text-xs font-semibold transition-all ${categoryFilter === cat.id ? "bg-[#8E9775] text-white shadow-md" : "bg-white text-gray-400 border border-gray-100 hover:border-[#8E9775]/30"}`}>{cat.label}</button>
              ))}
            </div>
            <div className="flex justify-center gap-6 border-t border-gray-100 pt-6">
              {statusOptions.map((opt) => (
                <button key={opt.id} onClick={() => setStatusFilter(opt.id)} className={`flex items-center gap-2 text-sm font-bold transition-all ${statusFilter === opt.id ? "text-[#8E9775] border-b-2 border-[#8E9775] pb-1" : "text-gray-300 hover:text-gray-500 pb-1"}`}>{opt.label}</button>
              ))}
            </div>
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredGifts.length > 0 ? filteredGifts.map((gift) => <GiftCard key={gift.id} gift={gift} onPresent={openModal} />) : <div className="col-span-full py-20 text-center text-gray-400 italic">Nenhum item encontrado... ✨</div>}
        </div>
      </section>

      <HowItWorks /><FAQ />

      {/* FOOTER */}
      <footer className="bg-white border-t border-gray-100 pt-20 pb-10 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <h3 className="text-2xl font-bold text-gray-800">Shuma & Yas</h3>
          <p className="text-[10px] text-gray-400 uppercase mt-8">Desenvolvido por Wallyson Schumacher</p>
        </div>
      </footer>

      {/* MODAIS */}
      <PixModal gift={selectedGift} isOpen={isOpen} onClose={closeModal} />
      <QuotaModal quota={selectedQuota} qty={quotaQty} isOpen={isQuotaModalOpen} onClose={() => setIsQuotaModalOpen(false)} />
    </div>
  );
};

export default App;