import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SubChoice } from '../App.tsx';

interface DinnerProps {
  onNext: (subChoice: SubChoice) => void;
}

export default function Dinner({ onNext }: DinnerProps) {
  const [subChoice, setSubChoice] = useState<SubChoice>(null);

  const vegImages = [
    "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1506802913710-118f8c00f6b4?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1498837167922-41cfa6dbb0ee?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1546069901-ba9599a7e63c?auto=format&fit=crop&q=80&w=600"
  ];

  const nonVegImages = [
    "https://images.unsplash.com/photo-1544025162-831e5f1ddef5?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1529692236671-f1f6cf9683ba?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1574484284002-952d92456975?auto=format&fit=crop&q=80&w=600",
    "https://images.unsplash.com/photo-1600891964092-4316c288032e?auto=format&fit=crop&q=80&w=600"
  ];

  const images = subChoice === 'Veg' ? vegImages : nonVegImages;

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}
      className="element-3d"
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#fb7185' }}>A Royal Feast</h2>
      <p style={{ marginBottom: '2rem', color: '#cbd5e1', fontSize: '1.2rem' }}>What kind of feast suits your appetite today?</p>

      {!subChoice ? (
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3rem' }}>
          <button onClick={() => setSubChoice('Veg')} className="btn-secondary card-3d" style={{ padding: '2rem', fontSize: '1.5rem', width: '200px', background: 'rgba(34, 197, 94, 0.2)', border: '1px solid rgba(34, 197, 94, 0.5)', color: '#fff' }}>🌿 Pure Veg</button>
          <button onClick={() => setSubChoice('Non-Veg')} className="btn-secondary card-3d" style={{ padding: '2rem', fontSize: '1.5rem', width: '200px', background: 'rgba(239, 68, 68, 0.2)', border: '1px solid rgba(239, 68, 68, 0.5)', color: '#fff' }}>🥩 Non-Veg</button>
        </div>
      ) : (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            className="element-3d"
          >
            <h3 style={{ color: '#f8fafc', marginBottom: '1.5rem', fontSize: '1.8rem' }}>Splendid Choice! ({subChoice})</h3>
            <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem', position: 'relative' }}>

              {/* Animated Steam Effects */}
              <div className="steam" style={{ top: '10px', left: '20%' }} />
              <div className="steam" style={{ top: '30px', left: '50%', animationDelay: '1s' }} />
              <div className="steam" style={{ top: '20px', left: '80%', animationDelay: '2s' }} />

              {images.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 50, rotate: -5 }}
                  animate={{ opacity: 1, y: 0, rotate: i % 2 === 0 ? 3 : -3 }}
                  transition={{ delay: i * 0.3, type: 'spring' }}
                  className="glass-panel card-3d"
                  style={{ width: '260px', height: '200px', overflow: 'hidden', padding: '0.5rem' }}
                >
                  <img src={src} alt="Food" className="hover-img" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
                </motion.div>
              ))}
            </div>

            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button onClick={() => setSubChoice(null)} className="btn-secondary" style={{ padding: '1rem 2rem' }}>Change Mind</button>
              <button onClick={() => onNext(subChoice)} className="btn-primary" style={{ padding: '1rem 3rem', fontSize: '1.2rem' }}>Next Step: Pick a Date</button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}

    </motion.div>
  );
}
