import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import type { SubChoice } from '../App';

interface PlanDetailsProps {
  title: string;
  images: {
    Veg: string[];
    "Non-Veg": string[];
  };
  onNext: (subChoice: SubChoice) => void;
}

export default function PlanDetails({ title, images, onNext }: PlanDetailsProps) {
  const [subChoice, setSubChoice] = useState<SubChoice>(null);

  const displayImages = subChoice === 'Veg' ? (images?.Veg || []) : (images?.["Non-Veg"] || []);

  const themeColor = title.toLowerCase().includes('water') ? '#60a5fa' : '#fb7185';

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', maxWidth: '850px', textAlign: 'center' }}
      className="element-3d"
    >
      <h2 style={{ fontSize: '2.8rem', marginBottom: '1rem', color: themeColor }}>{title}</h2>
      <p style={{ marginBottom: '2.5rem', color: '#cbd5e1', fontSize: '1.3rem' }}>Select your preference to see what awaits you!</p>

      {!subChoice ? (
        <div style={{ display: 'flex', gap: '2rem', justifyContent: 'center', marginBottom: '3.5rem' }}>
          <motion.button 
            whileHover={{ scale: 1.1, translateY: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSubChoice('Veg')} 
            className="btn-secondary card-3d" 
            style={{ padding: '2.5rem', fontSize: '1.8rem', width: '220px', background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#fff', cursor: 'pointer', borderRadius: '15px' }}
          >
            🌿 Veg
          </motion.button>
          <motion.button 
            whileHover={{ scale: 1.1, translateY: -5 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setSubChoice('Non-Veg')} 
            className="btn-secondary card-3d" 
            style={{ padding: '2.5rem', fontSize: '1.8rem', width: '220px', background: 'rgba(239, 68, 68, 0.15)', border: '1px solid rgba(239, 68, 68, 0.4)', color: '#fff', cursor: 'pointer', borderRadius: '15px' }}
          >
            🥩 Non-Veg
          </motion.button>
        </div>
      ) : (
        <AnimatePresence mode="wait">
          <motion.div
            key={subChoice}
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="element-3d"
          >
            <h3 style={{ color: '#f8fafc', marginBottom: '2rem', fontSize: '2rem' }}>Excellent Choice!</h3>
            
            <div style={{ display: 'flex', gap: '1.5rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3.5rem', position: 'relative' }}>
              {displayImages.map((src, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="glass-panel card-3d"
                  style={{ width: '260px', height: '180px', overflow: 'hidden', padding: '0.4rem', border: '1px solid rgba(255,255,255,0.1)' }}
                >
                  <img src={src} alt="Preview" className="hover-img" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '0.8rem' }} />
                </motion.div>
              ))}
              {displayImages.length === 0 && (
                <p style={{ color: '#fff', opacity: 0.5 }}>No photos added for this category yet.</p>
              )}
            </div>

            <div style={{ display: 'flex', gap: '1.5rem', justifyContent: 'center' }}>
              <button 
                onClick={() => setSubChoice(null)} 
                className="btn-secondary" 
                style={{ padding: '1rem 2rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(255,255,255,0.2)', color: 'white' }}
              >
                Change Mind
              </button>
              <button 
                onClick={() => onNext(subChoice)} 
                className="btn-primary" 
                style={{ padding: '1rem 3.5rem', fontSize: '1.3rem', background: themeColor, border: 'none', color: 'white', fontWeight: 'bold' }}
              >
                Continue
              </button>
            </div>
          </motion.div>
        </AnimatePresence>
      )}
    </motion.div>
  );
}
