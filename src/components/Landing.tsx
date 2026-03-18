import { useState } from 'react';
import { motion } from 'framer-motion';

interface LandingProps {
  onNext: (name: string, email: string) => void;
}

export default function Landing({ onNext }: LandingProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (name && email) {
      onNext(name, email);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, rotateY: -15 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      exit={{ opacity: 0, scale: 1.1, rotateY: 15 }}
      transition={{ duration: 0.8, type: 'spring' }}
      className="element-3d"
      style={{ width: '100%', display: 'flex', justifyContent: 'center' }}
    >
      <div className="glass-panel card-3d" style={{ padding: '3.5rem 2.5rem', width: '100%', maxWidth: '450px', textAlign: 'center' }}>
        <motion.div
          animate={{ y: [0, -10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
        >
          <img 
            src="https://wallpapers.com/images/hd/one-piece-straw-hat-pirates-r8xh2uztczrzjbva.jpg" 
            alt="One Piece Theme" 
            style={{ width: '120px', height: '120px', borderRadius: '50%', objectFit: 'cover', marginBottom: '1.5rem', border: '4px solid rgba(255,255,255,0.2)', boxShadow: '0 0 20px rgba(59, 130, 246, 0.5)' }} 
          />
        </motion.div>
        
        <h1 style={{ fontSize: '2.5rem', marginBottom: '0.5rem', background: 'linear-gradient(to right, #60a5fa, #3b82f6)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', fontWeight: 800 }}>
          Office Outing
        </h1>
        <p style={{ marginBottom: '2.5rem', color: '#cbd5e1', fontSize: '1.1rem' }}>Enter the Grand Line and vote for your adventure!</p>
        
        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column' }}>
          <input 
            type="text" 
            placeholder="Your Name (pirate alias optional)" 
            className="input-field" 
            value={name} 
            onChange={e => setName(e.target.value)} 
            required 
          />
          <input 
            type="email" 
            placeholder="Your Work Email" 
            className="input-field" 
            value={email} 
            onChange={e => setEmail(e.target.value)} 
            required 
          />
          <button type="submit" className="btn-primary" style={{ marginTop: '1rem', height: '3.5rem', fontSize: '1.2rem' }}>
            Set Sail!
          </button>
        </form>
      </div>
    </motion.div>
  );
}
