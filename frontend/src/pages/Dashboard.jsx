import { useState } from 'react';
import axios from 'axios';
import './Dashboard.css';

const saveReportEntry = (entry) => {
  const existing = JSON.parse(localStorage.getItem('atomiq_reports') || '[]');
  existing.unshift(entry);
  localStorage.setItem('atomiq_reports', JSON.stringify(existing.slice(0, 10)));
};

const gaugeStyle = (value) => ({
  background: `conic-gradient(#3ba5e6 ${value * 3.6}deg, rgba(27, 39, 62, 0.4) ${value * 3.6}deg)`,
});

const Dashboard = () => {
  const [input, setInput] = useState({
    name: '',
    formula: '',
    smiles: '',
    mw: '',
    logp: '',
    qed: '',
    sas: ''
  });
  const [result, setResult] = useState(null);

  const handleChange = (e) => setInput({ ...input, [e.target.name]: e.target.value });

  const handlePredict = async () => {
    try {
      let smiles = input.smiles;
      if (!smiles && input.name) {
        const conv = await axios.post('http://localhost:5000/convert_name_to_smiles', { name: input.name });
        if (conv.data?.smiles) {
          smiles = conv.data.smiles;
          setInput((prev) => ({ ...prev, smiles }));
        }
      }

      const payload = {
        name: input.name,
        formula: input.formula,
        smiles,
        mw: input.mw || null,
        logp: input.logp || null,
        qed: input.qed || null,
        sas: input.sas || null
      };

      const res = await axios.post('http://localhost:5000/predict', payload);
      setResult(res.data);
      if (!res.data?.error) {
        saveReportEntry({
          label: input.name || input.smiles || input.formula || 'Compound',
          name: input.name,
          smiles: smiles,
          ...res.data,
          timestamp: new Date().toISOString()
        });
      }
    } catch (err) {
      console.error(err);
      setResult({ error: 'Prediction failed. Backend must be running.' });
    }
  };

  const getStatus = (risk) => {
    if (risk <= 20) return 'Very Safe';
    if (risk <= 40) return 'Safe';
    if (risk <= 60) return 'Moderate';
    if (risk <= 80) return 'High Risk';
    return 'Very Toxic';
  };

  return (
    <div className="dashboard fade-in">
      <div className="nav-glow">Atom IQ – Advanced Toxicity Dashboard</div>
      <p className="subtitle">Enter compound name or SMILES; only name is enough. Records are saved to reports automatically.</p>

      <div className="dashboard-grid">
        <div className="card panel-left glass">
          <h2>Risk Gauge</h2>
          <div className="gauge" style={gaugeStyle(result?.risk_score || 20)}>
            <div className="gauge-center">{result ? `${result.risk_score}%` : '0%'}</div>
          </div>
          <p className="risk-category">{result ? result.category : 'Awaiting prediction'}</p>
          <button className="btn glow">XAI Model: Toxicity Hotspots</button>
        </div>

        <div className="card panel-center glass">
          <h2>Molecular Viewer</h2>
          <div className="molecular-viewer">
            <div className="molecule">
              <div className="atoms">⚛️</div>
              <div className="hotspot">🔥</div>
            </div>
            <p className="viewer-text">3D molecule rendering placeholder</p>
          </div>
          <div className="input-grid">
            <input name="name" value={input.name} onChange={handleChange} placeholder="Chemical Name" />
            <input name="formula" value={input.formula} onChange={handleChange} placeholder="Chemical Formula" />
            <input name="smiles" value={input.smiles} onChange={handleChange} placeholder="SMILES" />
            <input name="mw" value={input.mw} onChange={handleChange} placeholder="Mol Weight" />
            <input name="logp" value={input.logp} onChange={handleChange} placeholder="LogP" />
            <input name="qed" value={input.qed} onChange={handleChange} placeholder="QED" />
            <input name="sas" value={input.sas} onChange={handleChange} placeholder="SAS" />
          </div>
          <button className="btn glow" onClick={handlePredict}>Predict Toxicity</button>
        </div>

        <div className="card panel-right glass">
          <h2>Molecular Properties</h2>
          <div className="properties">
            <p>Mol Weight: {result?.mw || '--'}</p>
            <p>LogP: {result?.logp || '--'}</p>
            <p>QED: {result?.qed || '--'}</p>
            <p>SAS: {result?.sas || '--'}</p>
            <p>Polar Surface Area: {result ? (result.mw * 0.7).toFixed(2) : '--'}</p>
            <p>Toxicity Prob: {result ? (result.probability * 100).toFixed(2) + '%' : '--'}</p>
          </div>
        </div>
      </div>

      <div className="card bottom-panel glass">
        <h2>AI Explanation</h2>
        <p>{result?.explanation || 'The compound explanation will appear here once prediction is complete.'}</p>
      </div>
    </div>
  );
};

export default Dashboard;