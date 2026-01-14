import { Check, Copy, X } from "lucide-react";
import React, { useEffect, useState } from "react";
import type { Gift } from "../types/gift";

interface PixModalProps {
  gift: Gift | null;
  isOpen: boolean;
  onClose: () => void;
}

export const PixModal: React.FC<PixModalProps> = ({ gift, isOpen, onClose }) => {
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!gift || !isOpen) return null;

  const copyPix = () => {
    navigator.clipboard.writeText(gift.pixCopiaECola);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-[2.5rem] w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-6 border-b border-gray-100 flex justify-between items-center">
          <h2 className="text-xl font-bold text-gray-800">Presentear com Pix</h2>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full"><X size={20} /></button>
        </div>
        <div className="p-8 space-y-6 text-center">
          <div className="space-y-1">
            <h3 className="text-lg font-medium text-gray-600">{gift.nome}</h3>
            <p className="text-primary font-bold text-3xl">{gift.valorSugerido}</p>
          </div>
          <div className="bg-gray-50 p-4 rounded-2xl inline-block mx-auto border-2 border-dashed border-gray-200">
            <img src={gift.pixQrCodeImageUrl} alt="QR Code Pix" className="w-48 h-48 rounded-lg shadow-sm" />
          </div>
          <div className="space-y-2 text-left">
            <div className="flex gap-2">
              <input readOnly value={gift.pixCopiaECola} className="flex-1 bg-gray-50 border border-gray-200 rounded-xl px-4 py-3 text-xs font-mono truncate focus:outline-none" />
              <button onClick={copyPix} className="bg-primary text-white p-3 rounded-xl hover:bg-primary/90 transition-colors">
                {copied ? <Check size={20} /> : <Copy size={20} />}
              </button>
            </div>
            <p className="text-[10px] text-center text-gray-400">Clique no botão para copiar o código Pix</p>
          </div>
        </div>
        <div className="p-6 bg-gray-50"><button onClick={onClose} className="w-full py-3 font-bold text-gray-500 hover:text-gray-800">Fechar</button></div>
      </div>
    </div>
  );
};