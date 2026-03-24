import { motion } from 'framer-motion';
import { Droplets, UtensilsCrossed, Sparkles } from 'lucide-react';
import type { Choice } from '../App';

interface ChoiceSelectorProps {
  onSelect: (choice: Choice) => void;
  options: string[];
}

export default function ChoiceSelector({ onSelect, options }: ChoiceSelectorProps) {
  const getIcon = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('water')) return <Droplets size={40} color="#60a5fa" />;
    if (n.includes('dinner')) return <UtensilsCrossed size={40} color="#fb7185" />;
    return <Sparkles size={40} color="#ffd700" />;
  };

  const getBg = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('water')) return 'rgba(59, 130, 246, 0.2)';
    if (n.includes('dinner')) return 'rgba(244, 63, 94, 0.2)';
    return 'rgba(255, 215, 0, 0.2)';
  };

  const getMockImg = (name: string) => {
    const n = name.toLowerCase();
    if (n.includes('water')) return "https://images.pexels.com/photos/3453009/pexels-photo-3453009.jpeg";
    if (n.includes('dinner')) return "https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg";
    return "https://images.pexels.com/photos/1190297/pexels-photo-1190297.jpeg";
  };

  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="element-3d"
      style={{ width: '100%', maxWidth: '900px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 style={{ fontSize: '3.5rem', marginBottom: '3rem', textShadow: '0 4px 15px rgba(0,0,0,0.6)', textAlign: 'center', color: '#fff' }}>
        Select Your Experience
      </h1>
      
      <div style={{ display: 'flex', gap: '2.5rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        {options.map((option) => (
          <motion.div 
            key={option}
            whileHover={{ scale: 1.05, translateY: -10 }}
            whileTap={{ scale: 0.95 }}
            className="glass-panel card-3d" 
            style={{ width: '320px', cursor: 'pointer', overflow: 'hidden', position: 'relative', border: '1px solid rgba(255,255,255,0.1)' }}
            onClick={() => onSelect(option)}
          >
            <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
              <img 
                src={getMockImg(option)} 
                alt={option}
                className="hover-img"
                style={{ width: '100%', height: '100%', objectFit: 'cover' }}
              />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.95), transparent)' }} />
            </div>
            <div style={{ padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
              <div style={{ display: 'inline-block', padding: '1rem', background: getBg(option), borderRadius: '50%', marginBottom: '1.2rem' }}>
                {getIcon(option)}
              </div>
              <h2 style={{ margin: 0, fontSize: '2rem', color: '#fff' }}>{option}</h2>
              <p style={{ color: '#94a3b8', marginTop: '0.6rem' }}>Custom journey ahead!</p>
            </div>
          </motion.div>
        ))}
      </div>
    </motion.div>
  );
}
