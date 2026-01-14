import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

// Definição da estrutura de cada partícula de fumaça
interface Particle {
  id: number;
  x: number;
  y: number;
  size: number;
}

export const MagicCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Ativa a visibilidade na primeira vez que o mouse move
      if (!isVisible) setIsVisible(true);

      setMousePos({ x: e.clientX, y: e.clientY });

      // Cria uma nova partícula de fumaça rosa
      const newParticle: Particle = {
        id: Math.random(),
        x: e.clientX,
        y: e.clientY,
        size: Math.random() * 25 + 10, // Tamanhos variados para a fumaça
      };

      // Mantém apenas as últimas 15 partículas para não pesar o site
      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };

    // Só adiciona o evento se não for um dispositivo de toque (ajuda extra na detecção)
    if (window.matchMedia("(pointer: fine)").matches) {
      window.addEventListener('mousemove', handleMouseMove);
    }

    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [isVisible]);

  // Se não houver movimento inicial ou se for mobile, não renderiza nada
  // A classe 'hidden md:block' garante que o Tailwind esconda em telas menores que 768px
  if (!isVisible) return null;

  return (
    <div className="hidden md:block fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      {/* Rastro de Fumaça Rosa */}
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            initial={{ opacity: 0.6, scale: 0.5, x: particle.x, y: particle.y }}
            animate={{ 
              opacity: 0, 
              scale: 3, 
              y: particle.y - 80, // A fumaça sobe
              x: particle.x + (Math.random() * 60 - 30) // Dispersão lateral
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="absolute bg-accent/30 rounded-full blur-2xl"
            style={{ 
              width: particle.size, 
              height: particle.size,
              left: -particle.size / 2,
              top: -particle.size / 2,
            }}
          />
        ))}
      </AnimatePresence>

      {/* A Varinha Mágica */}
      <motion.div
        className="fixed text-4xl select-none"
        style={{ left: 0, top: 0 }}
        animate={{ 
          x: mousePos.x - 10, 
          y: mousePos.y - 25,
          rotate: [0, 15, 0] // Balanço da varinha
        }}
        transition={{ 
          type: "spring", 
          damping: 25, 
          stiffness: 400, 
          mass: 0.5 
        }}
      >
        <span style={{ 
          display: 'block',
          filter: "drop-shadow(0 0 10px rgba(226, 142, 142, 0.8))" 
        }}>
          🪄
        </span>
      </motion.div>
    </div>
  );
};