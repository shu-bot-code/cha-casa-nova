import React from "react";
import type { Gift } from "../types/gift";

interface GiftCardProps {
  gift: Gift;
  onPresent: (gift: Gift) => void;
}

export const GiftCard: React.FC<GiftCardProps> = ({ gift, onPresent }) => {
  const isGifted = gift.status === "presenteado";

  return (
    <div className={`bg-white rounded-[2rem] overflow-hidden shadow-sm border border-gray-100 transition-all duration-300 ${isGifted ? "opacity-60" : "hover:shadow-xl hover:-translate-y-2"}`}>
      <div className="aspect-square overflow-hidden relative">
        <img src={gift.imageUrl} alt={gift.nome} className="w-full h-full object-cover" />
        {isGifted && (
          <div className="absolute inset-0 bg-white/40 flex items-center justify-center backdrop-blur-[2px]">
            <span className="bg-white px-4 py-2 rounded-full text-sm font-bold shadow-sm">Presenteado 💜</span>
          </div>
        )}
      </div>

      <div className="p-6">
        <h3 className="font-bold text-gray-800 text-lg mb-1">{gift.nome}</h3>
        <p className="text-primary font-bold text-base mb-3">{gift.valorSugerido}</p>
        <p className="text-gray-400 text-xs leading-relaxed mb-6 h-12 line-clamp-3 italic">"{gift.descricao}"</p>

        <button
          disabled={isGifted}
          onClick={() => onPresent(gift)}
          className={`w-full py-3 rounded-xl font-bold transition-all ${
            isGifted ? "bg-gray-100 text-gray-400 cursor-not-allowed" : "bg-primary text-white hover:bg-primary/90 active:scale-95"
          }`}
        >
          {isGifted ? "Já recebido" : "Presentear com Pix"}
        </button>
      </div>
    </div>
  );
};