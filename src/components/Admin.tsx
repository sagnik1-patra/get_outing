import { useState, useEffect } from "react";
import { Download, Save, ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

// Note: GET returns a redirect to a JSON file usually.
// POST with no-cors doesn't return data.

// However, to GET responses we MUST use a CORS friendly way or handle the JSONP/Redirect
// Apps Script GET works fine with fetch if the script is public.

export default function Admin() {
  const [config, setConfig] = useState<any>(null);
  const [responses, setResponses] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const GOOGLE_SCRIPT_URL = import.meta.env.VITE_GOOGLE_SHEET_URL;

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!GOOGLE_SCRIPT_URL) {
            alert("VITE_GOOGLE_SHEET_URL is not set!");
            setLoading(false);
            return;
        }
        const configRes = await fetch(`${GOOGLE_SCRIPT_URL}?action=getConfig`).then(res => res.json());
        const responseRes = await fetch(`${GOOGLE_SCRIPT_URL}?action=getResponses`).then(res => res.json());
        setConfig(configRes);
        setResponses(responseRes);
      } catch (err) {
        console.error("Error loading admin data", err);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, [GOOGLE_SCRIPT_URL]);

  const handleTitleChange = (oldTitle: string, newTitle: string) => {
    if (!newTitle.trim()) return;
    setConfig((prev: any) => {
      const newConfig = { ...prev };
      newConfig[newTitle] = newConfig[oldTitle];
      delete newConfig[oldTitle];
      return newConfig;
    });
  };

  const handleImageUpdate = (plan: string, type: string, index: number, url: string) => {
    setConfig((prev: any) => {
      const newConfig = { ...prev };
      newConfig[plan][type][index] = url;
      return newConfig;
    });
  };

  const addImageUrl = (plan: string, type: string) => {
    setConfig((prev: any) => {
        const newConfig = { ...prev };
        newConfig[plan][type].push("");
        return newConfig;
    });
  }

  const removeImage = (plan: string, type: string, index: number) => {
      setConfig((prev: any) => {
        const newConfig = { ...prev };
        newConfig[plan][type].splice(index, 1);
        return newConfig;
    });
  }

  const saveConfig = async () => {
    try {
      // POST to Apps Script doesn't return data in no-cors mode, 
      // but it will trigger the script.
      await fetch(GOOGLE_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({ action: "saveConfig", config })
      });
      alert("Settings sent to Google Sheets! (Might take a moment to reflect)");
    } catch (err) {
      alert("Error saving configuration.");
    }
  };

  const downloadCSV = () => {
    if (responses.length === 0) {
        alert("No responses yet.");
        return;
    }
    const headers = ["Name", "Outing Plan", "Food Type", "Timestamp"];
    const csvContent = [
      headers.join(","),
      ...responses.map((r: any) => `"${r.name}","${r.outing}","${r.foodType}","${r.timestamp}"`)
    ].join("\n");

    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", "outing_responses.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  if (loading || !config) return <div className="app-container"><h2 className="title" style={{color: 'white'}}>Loading Admin Panel...</h2></div>;

  const planNames = Object.keys(config);

  return (
    <div className="admin-wrapper" style={{ minHeight: '100vh', background: '#0a0a0a', color: 'white', padding: '40px 20px' }}>
        <button onClick={() => navigate("/")} style={{ background: 'none', border: 'none', color: '#ffd700', cursor: 'pointer', display: 'flex', alignItems: 'center', marginBottom: '20px' }}>
            <ArrowLeft size={20} style={{marginRight: '8px'}}/> Back to Form
        </button>

      <div style={{ maxWidth: "1000px", margin: "0 auto", background: "rgba(255,255,255,0.05)", borderRadius: "15px", padding: "40px", border: '1px solid rgba(255,255,255,0.1)' }}>
        <h1 className="title" style={{ fontSize: "2.5rem", marginBottom: "40px", textAlign: "center", color: "#ffd700" }}>
          Admin Dashboard
        </h1>

        <div style={{ marginBottom: "60px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "1.8rem" }}>Deployment Settings</h2>
            <button 
                onClick={saveConfig}
                style={{ background: '#ffd700', color: 'black', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Save size={18} style={{ marginRight: "8px" }} />
              Push to Google Sheets
            </button>
          </div>

          <div style={{ display: "flex", gap: "30px", flexWrap: "wrap" }}>
            {planNames.map((plan, idx) => (
              <div key={idx} style={{ flex: "1 1 calc(50% - 15px)", background: "rgba(255,255,255,0.02)", padding: "25px", borderRadius: "12px", border: '1px solid rgba(255,255,255,0.1)' }}>
                <label style={{ display: "block", color: "#ffd700", marginBottom: "12px", fontSize: '0.9rem', textTransform: 'uppercase' }}>Plan {idx + 1} Name</label>
                <input
                  className="styled-input"
                  style={{ width: "100%", marginBottom: "25px", background: 'rgba(0,0,0,0.3)', color: 'white', border: '1px solid rgba(255,255,255,0.2)', padding: '12px' }}
                  value={plan}
                  onChange={(e) => handleTitleChange(plan, e.target.value)}
                />

                {["Veg", "Non-Veg"].map(type => (
                  <div key={type} style={{ marginBottom: "25px" }}>
                    <h4 style={{ color: "white", marginBottom: "15px", fontSize: '1.1rem' }}>{type} Images</h4>
                    {(config[plan]?.[type] || []).map((url: string, imgIdx: number) => (
                      <div key={imgIdx} style={{ display: "flex", gap: "12px", marginBottom: "12px" }}>
                        <input
                          className="styled-input"
                          style={{ flex: 1, padding: "10px", background: 'rgba(0,0,0,0.2)', border: '1px solid rgba(255,255,255,0.1)', color: 'white' }}
                          placeholder="Image URL"
                          value={url}
                          onChange={(e) => handleImageUpdate(plan, type, imgIdx, e.target.value)}
                        />
                         <button onClick={() => removeImage(plan, type, imgIdx)} style={{ background: "#ff4444", color: "white", border: "none", borderRadius: "6px", width: '35px', cursor: "pointer" }}>
                            ×
                        </button>
                      </div>
                    ))}
                    <button 
                        onClick={() => addImageUrl(plan, type)}
                        style={{ background: "rgba(255,255,255,0.1)", color: "white", border: "1px dashed rgba(255,255,255,0.3)", padding: "8px 16px", borderRadius: "6px", cursor: "pointer", width: '100%'}}
                    >
                        + Add Photo URL
                    </button>
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "30px" }}>
            <h2 style={{ fontSize: "1.8rem" }}>Crew Submissions</h2>
            <button 
                onClick={downloadCSV}
                style={{ background: 'transparent', color: '#4caf50', border: '1px solid #4caf50', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
            >
              <Download size={18} style={{ marginRight: "8px" }} />
              Export CSV
            </button>
          </div>

          <div style={{ background: "rgba(0,0,0,0.2)", borderRadius: "12px", overflow: "auto", border: '1px solid rgba(255,255,255,0.1)' }}>
            <table style={{ width: "100%", borderCollapse: "collapse" }}>
              <thead style={{ background: "rgba(255,255,255,0.05)" }}>
                <tr>
                  <th style={{ padding: "18px", textAlign: "left", color: "#ffd700" }}>Name</th>
                  <th style={{ padding: "18px", textAlign: "left", color: "#ffd700" }}>Plan</th>
                  <th style={{ padding: "18px", textAlign: "left", color: "#ffd700" }}>Diet</th>
                  <th style={{ padding: "18px", textAlign: "left", color: "#ffd700" }}>Timestamp</th>
                </tr>
              </thead>
              <tbody>
                {responses.map((r, i) => (
                  <tr key={i} style={{ borderTop: "1px solid rgba(255,255,255,0.05)" }}>
                    <td style={{ padding: "18px" }}>{r.name}</td>
                    <td style={{ padding: "18px" }}>{r.outing}</td>
                    <td style={{ padding: "18px" }}>{r.foodType}</td>
                    <td style={{ padding: "18px", opacity: 0.6 }}>{new Date(r.timestamp).toLocaleString()}</td>
                  </tr>
                ))}
                {responses.length === 0 && (
                  <tr>
                    <td colSpan={4} style={{ padding: "30px", textAlign: "center", opacity: 0.5 }}>No crew members have submitted yet.</td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
