import { ChevronDown, ChevronUp } from 'lucide-react';
import React, { useState } from 'react';

const faqData = [
  {
    question: "Posso escolher mais de um item?",
    answer: "Claro! Você pode presentear com quantos itens desejar da nossa lista. Cada item escolhido gera um código Pix exclusivo."
  },
  {
    question: "Não consigo pagar pelo QR Code, o que faço?",
    answer: "Sem problemas! Você pode usar a opção 'Pix Copia e Cola'. É só clicar no botão de copiar ao lado do código e colar na área 'Pix Copia e Cola' dentro do aplicativo do seu banco."
  },
  {
    question: "Posso alterar o valor do presente?",
    answer: "Os valores no site são sugestões baseadas nos itens que pesquisamos para a casa! Se desejar presentear com um valor diferente, entre em contato diretamente conosco."
  },
  {
    question: "Preciso enviar o comprovante?",
    answer: "Não é obrigatório, pois recebemos a notificação do banco. Mas se você quiser nos mandar uma mensagem no WhatsApp avisando, vamos adorar agradecer pessoalmente!"
  }
];

export const FAQ: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <section id="faq" className="py-20 bg-background">
      <div className="max-w-2xl mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12 italic">Dúvidas Frequentes</h2>
        <div className="space-y-4">
          {faqData.map((item, index) => (
            <div key={index} className="bg-white rounded-2xl border border-gray-100 overflow-hidden shadow-sm">
              <button 
                className="w-full p-5 text-left flex justify-between items-center hover:bg-gray-50 transition-colors" 
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
              >
                <span className="font-semibold text-gray-700">{item.question}</span>
                {openIndex === index ? <ChevronUp size={20} className="text-primary"/> : <ChevronDown size={20} className="text-gray-400"/>}
              </button>
              {openIndex === index && (
                <div className="p-5 pt-0 text-gray-500 text-sm leading-relaxed border-t border-gray-50 animate-in slide-in-from-top-2 duration-300">
                  {item.answer}
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};