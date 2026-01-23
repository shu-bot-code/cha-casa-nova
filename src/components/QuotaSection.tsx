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
  
  // Cálculo de progresso
  const total = Number(item.totalCotas) || 1;
  const recebidas = Number(item.cotasRecebidas) || 0;
  const progress = Math.min((recebidas / total) * 100, 100);

  // Lógica para definir se o item está completo
  const isCompleted = item.status === "presenteado" || progress >= 100;

  return (
    <div className={`bg-[#FAF9F6] rounded-[2.5rem] p-5 md:p-8 flex flex-col sm:flex-row gap-6 md:gap-8 border border-gray-100 shadow-sm transition-all duration-500 ${isCompleted ? 'opacity-60 grayscale-[0.3]' : 'hover:shadow-md'}`}>
      
      {/* Container da Imagem */}
      <div className="w-full sm:w-48 h-64 sm:h-auto bg-white rounded-3xl overflow-hidden shadow-inner flex-shrink-0 relative flex items-center justify-center">
        <img 
          src={item.imageUrl} 
          className="w-full h-full object-contain p-4" 
          alt={item.nome} 
        />
        {/* Selo de Meta Batida */}
        {isCompleted && (
          <div className="absolute inset-0 bg-[#8E9775]/20 backdrop-blur-[2px] flex items-center justify-center">
             <span className="bg-white px-4 py-2 rounded-full text-[10px] font-black shadow-md text-[#8E9775] tracking-widest uppercase">
               Meta Batida! 💜
             </span>
          </div>
        )}
      </div>

      <div className="flex-1 flex flex-col justify-between space-y-6">
        <div className="space-y-3">
          <h3 className="font-bold text-2xl text-gray-800">{item.nome}</h3>
          
          {/* Barra de Progresso */}
          <div className="space-y-1.5">
            <div className="w-full h-2.5 bg-gray-200 rounded-full overflow-hidden">
              <div 
                className={`h-full transition-all duration-1000 ease-out ${isCompleted ? 'bg-purple-400' : 'bg-[#8E9775]'}`} 
                style={{ width: `${progress}%` }} 
              />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-[10px] text-gray-400 font-bold uppercase tracking-tighter">
                {item.cotasRecebidas} de {item.totalCotas} cotas
              </p>
              <p className={`text-[10px] font-black uppercase ${isCompleted ? 'text-purple-500' : 'text-[#8E9775]'}`}>
                {Math.round(progress)}% Completo
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-xs italic line-clamp-2">"{item.descricao}"</p>
        </div>

        {/* Área de Ação Condicional */}
        {!isCompleted ? (
          <div className="space-y-4">
            {/* Seletor de Quantidade */}
            <div className="flex items-center justify-between gap-4 bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm">
              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setQty(Math.max(1, qty - 1))} 
                  className="p-2 bg-gray-50 rounded-xl text-[#8E9775] hover:bg-gray-100"
                >
                  <Minus size={18}/>
                </button>
                <span className="font-bold text-lg w-8 text-center">{qty}</span>
                <button 
                  onClick={() => setQty(qty + 1)} 
                  className="p-2 bg-gray-50 rounded-xl text-[#8E9775] hover:bg-gray-100"
                >
                  <Plus size={18}/>
                </button>
              </div>
              <div className="text-right pr-2">
                 <p className="text-[9px] text-gray-400 font-bold uppercase">Total</p>
                 <p className="font-black text-[#8E9775] text-lg">R$ {(qty * item.valorCota).toFixed(2)}</p>
              </div>
            </div>

            {/* Botão Ativo */}
            <button 
              onClick={() => onOpenModal(item, qty)} 
              className="w-full py-4 bg-[#8E9775] text-white rounded-2xl font-bold flex items-center justify-center gap-3 shadow-lg shadow-[#8E9775]/20 hover:bg-[#7a8364] transition-all"
            >
              <QrCode size={20} /> 
              <span>Presentear com {qty} {qty > 1 ? 'cotas' : 'cota'}</span>
            </button>
          </div>
        ) : (
          /* Mensagem de Sonho Realizado */
          <div className="bg-white/50 border border-dashed border-gray-200 p-4 rounded-2xl text-center">
            <p className="text-gray-400 font-bold text-sm italic">
              Este grande sonho já foi realizado! 🥂
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
