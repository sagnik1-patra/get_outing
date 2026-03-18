import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import Landing from './components/Landing.tsx';
import ChoiceSelector from './components/ChoiceSelector.tsx';
import Waterpark from './components/Waterpark.tsx';
import Dinner from './components/Dinner.tsx';
import DateSelector from './components/DateSelector.tsx';
import Success from './components/Success.tsx';

export type Choice = 'Waterpark' | 'Dinner' | null;
export type SubChoice = 'Veg' | 'Non-Veg' | null;

function App() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [choice, setChoice] = useState<Choice>(null);
  const [subChoice, setSubChoice] = useState<SubChoice>(null);

  const handleLandingNext = (n: string, e: string) => {
    setName(n);
    setEmail(e);
    setStep(1);
  };

  const handleChoiceSelect = (c: Choice) => {
    setChoice(c);
    if (c === 'Waterpark') {
      setStep(2);
    } else {
      setStep(3);
    }
  };

  const handleWaterparkNext = () => {
    setSubChoice(null);
    setStep(4);
  };

  const handleDinnerNext = (sc: SubChoice) => {
    setSubChoice(sc);
    setStep(4);
  };

  const handleDateSelect = async (d: string) => {
    try {
      const sheetUrl = import.meta.env.VITE_GOOGLE_SHEET_URL;
      
      if (!sheetUrl) {
        console.warn('Google Sheet URL not configured. Check your .env file.');
        // Fallback to local for dev if needed, or just proceed to success for demo
        setStep(5);
        return;
      }

      await fetch(sheetUrl, {
        method: 'POST',
        mode: 'no-cors', // Google Apps Script requires no-cors for simple POSTs from browser
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, choice, subChoice, date: d })
      });
      setStep(5);
    } catch (err) {
      console.error('Error saving data:', err);
      setStep(5);
    }
  };

  return (
    <>
      <div style={{ position: 'fixed', bottom: 10, left: 10, zIndex: 100, width: '300px', height: '120px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
        <iframe width="100%" height="120" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1585087883&color=%233b82f6&auto_play=true&hide_related=false&show_comments=true&show_user=false&show_reposts=false&show_teaser=true"></iframe>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && <Landing key="landing" onNext={handleLandingNext} />}
        {step === 1 && <ChoiceSelector key="choice" onSelect={handleChoiceSelect} />}
        {step === 2 && <Waterpark key="waterpark" onNext={handleWaterparkNext} />}
        {step === 3 && <Dinner key="dinner" onNext={handleDinnerNext} />}
        {step === 4 && <DateSelector key="date" onNext={handleDateSelect} />}
        {step === 5 && <Success key="success" />}
      </AnimatePresence>
    </>
  );
}

export default App;
