import { useState } from 'react';
import axios from 'axios';
import './Predict.css';

const saveReportEntry = (entry) => {
  const existing = JSON.parse(localStorage.getItem('atomiq_reports') || '[]');
  existing.unshift(entry);
  localStorage.setItem('atomiq_reports', JSON.stringify(existing.slice(0, 10)));
};

const Predict = () => {
  const [formData, setFormData] = useState({
    name: '',
    smiles: '',
    mw: '',
    logp: '',
    qed: '',
    sas: ''
  });
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleCalculateDescriptors = async () => {
    if (!formData.smiles) return;
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/calculate_descriptors', { smiles: formData.smiles });
      setFormData({ ...formData, ...response.data });
    } catch (error) {
      console.error('Error calculating descriptors:', error);
    }
    setLoading(false);
  };

  const handlePredict = async (e) => {
    e.preventDefault();
    setLoading(true);

    let smiles = formData.smiles;
    if (!smiles && formData.name) {
      try {
        const conversion = await axios.post('http://localhost:5000/convert_name_to_smiles', { name: formData.name });
        if (conversion.data?.smiles) {
          smiles = conversion.data.smiles;
          setFormData((prev) => ({ ...prev, smiles }));
        }
      } catch (error) {
        console.warn('Name-to-SMILES lookup failed:', error);
      }
    }

    try {
      const response = await axios.post('http://localhost:5000/predict', {
        name: formData.name,
        smiles,
        mw: formData.mw ? parseFloat(formData.mw) : null,
        logp: formData.logp ? parseFloat(formData.logp) : null,
        qed: formData.qed ? parseFloat(formData.qed) : null,
        sas: formData.sas ? parseFloat(formData.sas) : null
      });
      setResult(response.data);
      if (!response.data.error) {
        saveReportEntry({
          label: formData.name || formData.smiles,
          name: formData.name,
          smiles,
          ...response.data,
          timestamp: new Date().toISOString()
        });
      }
    } catch (error) {
      console.error('Error predicting:', error);
      setResult({ error: 'Prediction failed. Ensure backend is running.' });
    }

    setLoading(false);
  };

  return (
    <div className="predict fade-in">
      <h1>Single Molecule Prediction</h1>
      <form onSubmit={handlePredict} className="card">
        <div className="form-group">
          <label htmlFor="name">Compound Name (optional)</label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            className="input"
            placeholder="e.g. Aspirin"
          />
        </div>
        <div className="form-group">
          <label htmlFor="smiles">SMILES String (optional)</label>
          <input
            type="text"
            id="smiles"
            name="smiles"
            value={formData.smiles}
            onChange={handleChange}
            className="input"
            placeholder="Optional: can be auto-resolved from name"
          />
        </div>
        <button type="button" onClick={handleCalculateDescriptors} className="btn" disabled={loading}>
          {loading ? 'Calculating...' : 'Calculate Descriptors from SMILES'}
        </button>
        <div className="form-group">
          <label htmlFor="mw">Molecular Weight</label>
          <input
            type="number"
            step="0.01"
            id="mw"
            name="mw"
            value={formData.mw}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="logp">LogP</label>
          <input
            type="number"
            step="0.01"
            id="logp"
            name="logp"
            value={formData.logp}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="qed">QED</label>
          <input
            type="number"
            step="0.01"
            id="qed"
            name="qed"
            value={formData.qed}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="sas">SAS</label>
          <input
            type="number"
            step="0.01"
            id="sas"
            name="sas"
            value={formData.sas}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Toxicity'}
        </button>
      </form>
      {result && (
        <div className="result card">
          <h2>Prediction Result</h2>
          <p><strong>Toxic / Non-Toxic:</strong> {result.prediction ? 'Toxic' : 'Non-Toxic'}</p>
          <p><strong>Risk Score:</strong> {result.risk_score}%</p>
          <p><strong>Risk Category:</strong> {result.category}</p>
          <p><strong>Reasons:</strong> {result.reasons}</p>
        </div>
      )}
    </div>
  );
};

export default Predict;