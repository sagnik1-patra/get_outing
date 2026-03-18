
import { motion } from 'framer-motion';
import { Droplets, UtensilsCrossed } from 'lucide-react';
import type { Choice } from '../App';

interface ChoiceSelectorProps {
  onSelect: (choice: Choice) => void;
}

export default function ChoiceSelector({ onSelect }: ChoiceSelectorProps) {
  return (
    <motion.div 
      initial={{ opacity: 0, x: -100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 100 }}
      transition={{ duration: 0.6, type: 'spring' }}
      className="element-3d"
      style={{ width: '100%', maxWidth: '800px', display: 'flex', flexDirection: 'column', alignItems: 'center' }}
    >
      <h1 style={{ fontSize: '3rem', marginBottom: '3rem', textShadow: '0 4px 10px rgba(0,0,0,0.5)', textAlign: 'center' }}>
        Choose Your Next Destination
      </h1>
      
      <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap', justifyContent: 'center' }}>
        
        {/* Waterpark Card */}
        <div 
          className="glass-panel card-3d" 
          style={{ width: '320px', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
          onClick={() => onSelect('Waterpark')}
        >
          <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
            <img 
              src="https://images.pexels.com/photos/3453009/pexels-photo-3453009.jpeg" 
              alt="Waterpark"
              className="hover-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)' }} />
          </div>
          <div style={{ padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', padding: '1rem', background: 'rgba(59, 130, 246, 0.2)', borderRadius: '50%', marginBottom: '1rem' }}>
              <Droplets size={40} color="#60a5fa" />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Waterpark Splash</h2>
            <p style={{ color: '#cbd5e1', marginTop: '0.5rem' }}>Slides, waves, and sun!</p>
          </div>
        </div>

        {/* Dinner Card */}
        <div 
          className="glass-panel card-3d" 
          style={{ width: '320px', cursor: 'pointer', overflow: 'hidden', position: 'relative' }}
          onClick={() => onSelect('Dinner')}
        >
          <div style={{ height: '200px', position: 'relative', overflow: 'hidden' }}>
            <img 
              src="https://images.pexels.com/photos/3184195/pexels-photo-3184195.jpeg" 
              alt="Fine Dining"
              className="hover-img"
              style={{ width: '100%', height: '100%', objectFit: 'cover' }}
            />
            <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: 'linear-gradient(to top, rgba(15, 23, 42, 0.9), transparent)' }} />
          </div>
          <div style={{ padding: '2rem', textAlign: 'center', position: 'relative', zIndex: 1 }}>
            <div style={{ display: 'inline-block', padding: '1rem', background: 'rgba(244, 63, 94, 0.2)', borderRadius: '50%', marginBottom: '1rem' }}>
              <UtensilsCrossed size={40} color="#fb7185" />
            </div>
            <h2 style={{ margin: 0, fontSize: '1.8rem' }}>Grand Dinner</h2>
            <p style={{ color: '#cbd5e1', marginTop: '0.5rem' }}>A feast fit for a king!</p>
          </div>
        </div>

      </div>
    </motion.div>
  );
}
