import { useState, useEffect } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import './FeatureImportance.css';

const FeatureImportance = () => {
  const [features, setFeatures] = useState([]);
  const [form, setForm] = useState({ mw: '', logp: '', qed: '', sas: '' });
  const [explanation, setExplanation] = useState('Enter descriptor values and click estimate to see user-friendly importance feedback.');

  useEffect(() => {
    const fetchFeatures = async () => {
      try {
        const response = await axios.get('http://localhost:5000/feature_importance');
        const data = Object.entries(response.data).map(([feature, importance]) => ({
          feature,
          importance
        }));
        setFeatures(data);
      } catch (error) {
        console.error('Error fetching feature importance:', error);
      }
    };
    fetchFeatures();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const analyze = async () => {
    if (!form.mw && !form.logp && !form.qed && !form.sas) {
      setExplanation('Please enter at least one descriptor value to analyze.');
      return;
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        mw: form.mw ? parseFloat(form.mw) : null,
        logp: form.logp ? parseFloat(form.logp) : null,
        qed: form.qed ? parseFloat(form.qed) : null,
        sas: form.sas ? parseFloat(form.sas) : null
      });

      const result = response.data;
      if (result.error) {
        setExplanation('Prediction could not be generated: ' + result.error);
        return;
      }

      const highFeature = [...features].sort((a,b) => b.importance - a.importance)[0];
      const safeFeature = [...features].sort((a,b) => a.importance - b.importance)[0];

      const mapped = features.map((ft) => {
        const value = Number(form[ft.feature.toLowerCase().replace(/\s/g, '')]);
        if (!value || isNaN(value)) return null;
        return `${ft.feature} (${value}) contributes ~${(ft.importance*100).toFixed(1)}% to risk estimate.`;
      }).filter(Boolean);

      const explain = `Estimated score ${result.risk_score?.toFixed(1)}% (${result.category}). ` +
        `Most important model driver: ${highFeature?.feature}. ` +
        `Less impactful descriptor: ${safeFeature?.feature}. ` +
        `${mapped.join(' ')}`;
      setExplanation(explain);
    } catch (error) {
      console.error(error);
      setExplanation('Could not analyze feature importance due backend error.');
    }
  };

  return (
    <div className="feature-importance fade-in">
      <h1>Feature Importance</h1>
      <div className="card info-card">
        <p>Enter numerical descriptors in the form below to see which terms drive your compound toward toxicity (“more toxic” if red). This is aimed for clarity for non-experts.</p>
        <div className="descriptor-grid">
          <div className="descriptor-item"><label>MW</label><input name="mw" value={form.mw} onChange={handleChange} /></div>
          <div className="descriptor-item"><label>LogP</label><input name="logp" value={form.logp} onChange={handleChange} /></div>
          <div className="descriptor-item"><label>QED</label><input name="qed" value={form.qed} onChange={handleChange} /></div>
          <div className="descriptor-item"><label>SAS</label><input name="sas" value={form.sas} onChange={handleChange} /></div>
        </div>
        <button className="btn" onClick={analyze}>Estimate Importance</button>
        <p className="explain-text">{explanation}</p>
      </div>

      <div className="chart-container card">
        <ResponsiveContainer width="100%" height={460}>
          <BarChart data={features} layout="horizontal">
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis type="number" tick={{ fill: '#dce6f1' }} />
            <YAxis dataKey="feature" type="category" width={150} tick={{ fill: '#dce6f1' }} />
            <Tooltip />
            <Bar dataKey="importance" fill="#7CD1FF" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default FeatureImportance;