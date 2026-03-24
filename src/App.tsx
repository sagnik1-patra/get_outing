import { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';
import Landing from './components/Landing';
import ChoiceSelector from './components/ChoiceSelector';
import PlanDetails from './components/PlanDetails';
import DateSelector from './components/DateSelector';
import Success from './components/Success';
import Admin from './components/Admin';

export type Choice = string | null;
export type SubChoice = 'Veg' | 'Non-Veg' | null;

function OutingFlow() {
  const [step, setStep] = useState(0);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [choice, setChoice] = useState<Choice>(null);
  const [subChoice, setSubChoice] = useState<SubChoice>(null);
  const [config, setConfig] = useState<any>(null);
  const [loading, setLoading] = useState(true);

  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

  useEffect(() => {
    const fetchConfig = async () => {
      try {
        if (!GOOGLE_SCRIPT_URL) {
            setLoading(false);
            return;
        }
        const res = await fetch(`${GOOGLE_SCRIPT_URL}?action=getConfig`);
        const data = await res.json();
        setConfig(data);
      } catch (err) {
        console.error("Failed to load config", err);
      } finally {
        setLoading(false);
      }
    };
    fetchConfig();
  }, [GOOGLE_SCRIPT_URL]);

  const handleLandingNext = (n: string, e: string) => {
    setName(n);
    setEmail(e);
    setStep(1);
  };

  const handleChoiceSelect = (c: Choice) => {
    setChoice(c);
    setStep(2); // Generic plan details step
  };

  const handleSubNext = (sc: SubChoice) => {
    setSubChoice(sc);
    setStep(3); // Date selection step
  };

  const handleDateSelect = async (d: string) => {
    const transition = () => setStep(4);
    try {
      if (!GOOGLE_SCRIPT_URL) {
        transition();
        return;
      }

      fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', 
        body: JSON.stringify({ 
            action: "submitResponse",
            name, 
            email, 
            outing: choice, 
            foodType: subChoice, 
            date: d 
        })
      }).catch(err => console.error('Submission error:', err));

      setTimeout(transition, 500);
    } catch (err) {
      console.error('Error in handleDateSelect:', err);
      transition();
    }
  };

  if (loading) return (
    <div className="app-container" style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', minHeight: '100vh', background: '#0a0a0a' }}>
        <h2 className="title" style={{color: '#ffd700'}}>Preparing Your Journey...</h2>
    </div>
  );

  const planOptions = (config && Object.keys(config).length > 0) ? Object.keys(config) : ["Waterpark", "Dinner"];

  return (
    <>
      <div style={{ position: 'fixed', bottom: 10, left: 10, zIndex: 100, width: '300px', height: '120px', borderRadius: '12px', overflow: 'hidden', boxShadow: '0 4px 10px rgba(0,0,0,0.5)' }}>
        <iframe width="100%" height="120" scrolling="no" frameBorder="no" allow="autoplay" src="https://w.soundcloud.com/player/?visual=false&url=https%3A%2F%2Fapi.soundcloud.com%2Ftracks%2F1585087883&color=%233b82f6&auto_play=true&hide_related=false&show_comments=true&show_user=false&show_reposts=false&show_teaser=true"></iframe>
      </div>

      <AnimatePresence mode="wait">
        {step === 0 && <Landing key="landing" onNext={handleLandingNext} />}
        {step === 1 && (
            <ChoiceSelector 
                key="choice" 
                onSelect={handleChoiceSelect} 
                options={planOptions}
            />
        )}
        {step === 2 && (
            <PlanDetails 
                key="plan-details" 
                title={choice || "My Adventure"}
                images={config?.[choice || ""]}
                onNext={handleSubNext} 
            />
        )}
        {step === 3 && <DateSelector key="date" onNext={handleDateSelect} />}
        {step === 4 && <Success key="success" />}
      </AnimatePresence>
    </>
  );
}

function App() {
  return (
    <Routes>
      <Route path="/" element={<OutingFlow />} />
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;

