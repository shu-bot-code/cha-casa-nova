import { AnimatePresence, motion } from 'framer-motion';
import React, { useEffect, useState } from 'react';

interface Particle { id: number; x: number; y: number; size: number; }

export const MagicCursor: React.FC = () => {
  const [mousePos, setMousePos] = useState({ x: -100, y: -100 });
  const [particles, setParticles] = useState<Particle[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const newParticle = { id: Math.random(), x: e.clientX, y: e.clientY, size: Math.random() * 20 + 10 };
      setParticles((prev) => [...prev.slice(-15), newParticle]);
    };
    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-[9999] overflow-hidden">
      <AnimatePresence>
        {particles.map((p) => (
          <motion.div key={p.id} initial={{ opacity: 0.4, scale: 0.5, x: p.x, y: p.y }} animate={{ opacity: 0, scale: 2.5, y: p.y - 60, x: p.x + (Math.random() * 40 - 20) }} exit={{ opacity: 0 }} transition={{ duration: 0.8 }} className="absolute bg-accent/30 rounded-full blur-xl" style={{ width: p.size, height: p.size, left: -p.size/2, top: -p.size/2 }} />
        ))}
      </AnimatePresence>
      <motion.div className="fixed text-3xl select-none" style={{ left: 0, top: 0, x: mousePos.x - 10, y: mousePos.y - 25 }} animate={{ rotate: [0, 15, 0] }} transition={{ type: "spring", damping: 25, stiffness: 300 }}>
        <span style={{ filter: "drop-shadow(0 0 8px #E28E8E)" }}>🪄</span>
      </motion.div>
    </div>
  );
};