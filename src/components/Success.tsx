
import { motion } from 'framer-motion';

export default function Success() {
  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8, type: 'spring', bounce: 0.5 }}
      style={{ width: '100%', maxWidth: '600px', textAlign: 'center' }}
      className="element-3d"
    >
      <div className="glass-panel card-3d" style={{ padding: '4rem 2rem', border: '2px solid rgba(34, 197, 94, 0.5)' }}>
        <h1 style={{ fontSize: '3rem', marginBottom: '1rem', color: '#4ade80' }}>
          All Set! 🎉
        </h1>
        <p style={{ fontSize: '1.2rem', color: '#f8fafc', marginBottom: '2rem' }}>
          Your adventure has been booked. See you at the grand line!
        </p>
        <p style={{ color: '#94a3b8' }}>
          (Your response has been saved to the database.)
        </p>
      </div>
    </motion.div>
  );
}
