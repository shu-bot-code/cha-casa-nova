import React from 'react';

export const Header: React.FC = () => {
  const copyInviteLink = () => {
    navigator.clipboard.writeText(window.location.href);
    alert("Link do convite copiado! Agora é só colar no WhatsApp.");
  };

  const navItems = [
    { label: "Início", href: "#home" },
    { label: "Lista", href: "#lista" },
    { label: "Como funciona", href: "#como-funciona" },
    { label: "Dúvidas", href: "#faq" }
  ];

  return (
    <header className="fixed top-0 left-0 right-0 bg-white/80 backdrop-blur-md z-[60] border-b border-gray-100">
      <div className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        <h1 className="text-xl font-bold text-primary tracking-tight">CASA NOVA</h1>
        
        <nav className="hidden md:flex gap-8">
          {navItems.map(item => (
            <a key={item.label} href={item.href} className="text-gray-600 hover:text-primary transition-colors text-sm font-medium">
              {item.label}
            </a>
          ))}
        </nav>

        <button 
          onClick={copyInviteLink}
          className="bg-primary/10 text-primary px-4 py-2 rounded-full text-xs font-bold hover:bg-primary/20 transition-all"
        >
          COPIAR LINK
        </button>
      </div>
    </header>
  );
};