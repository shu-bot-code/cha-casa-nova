import { Minus, Plus, QrCode } from 'lucide-react';
import { useState } from 'react';
import { quotaList } from '../data/quotaList';

export const QuotaSection = ({ onOpenModal }: any) => {
  return (
    <section id="cotas" className="py-12 md:py-20 bg-white border-t border-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <div className="text-center mb-10 md:mb-16">
          <span className="text-[#8E9775] font-bold text-xs uppercase tracking-widest">Metas Maiores</span>
          <h2 className="text-3xl md:text-4xl font-bold mt-2 italic text-gray-800">Nossos Grandes Sonhos</h2>
          <p className="text-gray-500 mt-4 max-w-xl mx-auto text-sm leading-relaxed">
            Alguns itens são maiores, por isso dividimos em cotas. 
            Presenteie com quantas o seu coração desejar!
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
          {quotaList.map((item) => (
            <QuotaCard key={item.id} item={item} onOpenModal={onOpenModal} />
          ))}
        </div>
      </div>
    </section>
  );
};

const QuotaCard = ({ item, onOpenModal }: any) => {
  const [qty, setQty] = useState(1);
  const progress = (item.cotasRecebidas / item.totalCotas) * 100;

  return (
    <div className="bg-[#FAF9F6] rounded-[2.5rem] p-5 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 border border-gray-100 shadow-sm hover:shadow-md transition-all">
      {/* Container da Imagem Ajustado */}
      <div className="w-full sm:w-48 h-64 sm:h-auto bg-white rounded-3xl overflow-hidden shadow-inner flex-shrink-0">
        <img 
          src={item.imageUrl} 
          className="w-full h-full object-contain p-4" // object-contain com padding para mostrar o produto inteiro
          alt={item.nome} 
        />
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <h3 className="font-bold text-2xl text-gray-800">{item.nome}</h3>
          
          {/* Barra de Progresso */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className="h-full bg-[#8E9775] transition-all duration-1000 ease-out" 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                {item.cotasRecebidas} de {item.totalCotas} cotas
              </p>
              <p className="text-[10px] text-[#8E9775] font-black uppercase">
                {Math.round(progress)}% Completo
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-xs italic line-clamp-2">"{item.descricao}"</p>
        </div>

        <div className="space-y-4">
          {/* Seletor de Quantidade */}
          <div className="flex items-center justify-between gap-4 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm">
            <div className="flex items-center gap-2">
              <button 
                onClick={() => setQty(Math.max(1, qty - 1))} 
                className="p-2 bg-gray-50 rounded-xl text-[#8E9775] hover:bg-gray-100 transition-colors"
              >
                <Minus size={18}/>
              </button>
              <span className="font-bold text-lg w-8 text-center">{qty}</span>
              <button 
                onClick={() => setQty(qty + 1)} 
                className="p-2 bg-gray-50 rounded-xl text-[#8E9775] hover:bg-gray-100 transition-colors"
              >
                <Plus size={18}/>
              </button>
            </div>
            <div className="text-right pr-2">
               <p className="text-[9px] text-gray-400 font-bold uppercase">Total</p>
               <p className="font-black text-[#8E9775] text-lg">R$ {(qty * item.valorCota).toFixed(2)}</p>
            </div>
          </div>

          {/* Botão Principal */}
          <button 
            onClick={() => onOpenModal(item, qty)} 
            className="w-full py-4 bg-[#8E9775] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#8E9775]/20 hover:bg-[#7a8364] active:scale-[0.98] transition-all"
          >
            <QrCode size={20} /> 
            <span>Presentear com {qty} {qty > 1 ? 'cotas' : 'cota'}</span>
          </button>
        </div>
      </div>
    </div>
  );
};