import { useState } from 'react';
import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';

interface DateSelectorProps {
  onNext: (date: string) => void;
}

export default function DateSelector({ onNext }: DateSelectorProps) {
  const [date, setDate] = useState('');
  const [error, setError] = useState('');

  const handleNext = () => {
    if (!date) {
      setError('Please select a date.');
      return;
    }
    
    setError('');
    onNext(date);
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.9, y: 50 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: -50 }}
      transition={{ duration: 0.5 }}
      style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}
      className="element-3d"
    >
      <div className="glass-panel card-3d" style={{ padding: '3rem 2rem' }}>
        <div style={{ display: 'inline-block', padding: '1rem', background: 'rgba(234, 179, 8, 0.2)', borderRadius: '50%', marginBottom: '1rem' }}>
          <Calendar size={40} color="#facc15" />
        </div>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '1rem', color: '#facc15' }}>Pick the Date</h2>
        <p style={{ marginBottom: '2rem', color: '#cbd5e1' }}>Select an Indian holiday in 2026 for our epic adventure.</p>

        <p style={{ fontSize: '0.9rem', color: '#94a3b8', marginBottom: '1rem' }}>
          Hint: Try 2026-01-26 (Republic Day) or 2026-08-15
        </p>

        <input 
          type="date" 
          className="input-field" 
          style={{ width: '80%', fontSize: '1.2rem', padding: '1rem', colorScheme: 'dark' }} 
          value={date}
          onChange={(e) => { setDate(e.target.value); setError(''); }}
          min="2026-01-01"
          max="2026-12-31"
        />

        {error && (
          <motion.p 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }}
            style={{ color: '#ef4444', fontWeight: 600, marginTop: '1rem' }}
          >
            {error}
          </motion.p>
        )}

        <div style={{ marginTop: '2rem' }}>
          <button onClick={handleNext} className="btn-primary" style={{ fontSize: '1.2rem', padding: '1rem 3rem' }}>
            Submit & Book!
          </button>
        </div>
      </div>
    </motion.div>
  );
}
