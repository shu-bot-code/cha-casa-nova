import { Heart, MousePointer2, QrCode } from 'lucide-react';
import React from 'react';

export const HowItWorks: React.FC = () => {
  const steps = [
    { icon: <MousePointer2 className="text-primary" size={32} />, title: "1. Escolha um item", desc: "Navegue pela lista e escolha o presente." },
    { icon: <QrCode className="text-primary" size={32} />, title: "2. Pague via Pix", desc: "Escaneie o QR Code ou use o Copia e Cola." },
    { icon: <Heart className="text-primary" size={32} />, title: "3. Pronto!", desc: "Receberemos seu carinho direto na nossa conta." }
  ];

  return (
    <section id="como-funciona" className="py-20 bg-white">
      <div className="max-w-6xl mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-12">Como funciona?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="space-y-4 p-8 rounded-3xl bg-background">
              <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center mx-auto shadow-sm">{step.icon}</div>
              <h3 className="font-bold text-xl">{step.title}</h3>
              <p className="text-gray-500 text-sm">{step.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};