import { AlertCircle, Check, Copy, X } from "lucide-react";
import { useState } from "react";

export const QuotaModal = ({ quota, qty, isOpen, onClose }: any) => {
  const [copied, setCopied] = useState(false);
  if (!isOpen || !quota) return null;
  const total = qty * quota.valorCota;

  const copyPix = () => {
    navigator.clipboard.writeText(quota.pixCopiaECola);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose} />
      <div className="bg-white rounded-[2.5rem] w-full max-w-md relative z-10 overflow-hidden shadow-2xl animate-in fade-in zoom-in duration-300">
        <div className="p-8 text-center space-y-6">
          <div className="flex justify-between items-start">
            <div className="text-left">
              <h2 className="text-2xl font-bold">Quase lá!</h2>
              <p className="text-gray-500 text-sm">Você escolheu {qty} cota(s) de {quota.nome}</p>
            </div>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full text-gray-400"><X size={24} /></button>
          </div>
          <div className="bg-[#8E9775]/5 p-4 rounded-2xl flex gap-3 text-left border border-[#8E9775]/10">
            <AlertCircle className="text-[#8E9775]" size={20} />
            <p className="text-xs text-[#8E9775] leading-relaxed font-medium">
              <strong>IMPORTANTE:</strong> Ao abrir o app do banco, altere manualmente o valor para:
              <span className="text-lg block mt-1 font-black uppercase">R$ {total.toFixed(2)}</span>
            </p>
          </div>
          <div className="bg-white p-4 rounded-3xl inline-block border-2 border-dashed border-gray-100">
            <img src={quota.pixQrCodeImageUrl} alt="QR Code Pix" className="w-48 h-48" />
          </div>
          <div className="flex gap-2">
            <input readOnly value={quota.pixCopiaECola} className="flex-1 bg-gray-50 border border-gray-100 rounded-xl px-4 py-3 text-xs truncate" />
            <button onClick={copyPix} className="bg-[#8E9775] text-white p-3 rounded-xl">{copied ? <Check size={20} /> : <Copy size={20} />}</button>
          </div>
        </div>
      </div>
    </div>
  );
};