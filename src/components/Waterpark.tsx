
import { motion } from 'framer-motion';

interface WaterparkProps {
  onNext: () => void;
}

export default function Waterpark({ onNext }: WaterparkProps) {
  const images = [
    "https://images.pexels.com/photos/4321076/pexels-photo-4321076.jpeg",
    "https://images.pexels.com/photos/1391421/pexels-photo-1391421.jpeg",
    "https://images.pexels.com/photos/261348/pexels-photo-261348.jpeg",
    "https://images.pexels.com/photos/61129/pexels-photo-61129.jpeg",
    "https://images.pexels.com/photos/12956052/pexels-photo-12956052.jpeg",
    "https://images.pexels.com/photos/1456291/pexels-photo-1456291.jpeg"
  ];

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', maxWidth: '800px', textAlign: 'center' }}
      className="element-3d"
    >
      <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#60a5fa' }}>Waterpark Splash!</h2>
      <p style={{ marginBottom: '2rem', color: '#cbd5e1', fontSize: '1.2rem' }}>Get ready for an aquatic adventure filled with thrilling slides and wave pools.</p>

      <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '3rem', position: 'relative' }}>
        {/* Animated Ripple Effects in the background */}
        <div className="water-ripple" style={{ width: '150px', height: '150px', top: '-10px', left: '10%' }} />
        <div className="water-ripple" style={{ width: '200px', height: '200px', bottom: '-20px', right: '10%', animationDelay: '1s' }} />
        
        {images.map((src, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.2 }}
            className="glass-panel card-3d"
            style={{ width: '220px', height: '180px', overflow: 'hidden', padding: '0.5rem' }}
          >
            <img src={src} alt="Waterpark" className="hover-img" style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '1rem' }} />
          </motion.div>
        ))}
      </div>

      <button onClick={onNext} className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
        Next Step: Pick a Date
      </button>
    </motion.div>
  );
}
