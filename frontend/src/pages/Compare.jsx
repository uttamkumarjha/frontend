import { useState } from 'react';
import axios from 'axios';
import './Compare.css';

const MAX_COMPARE = 3;

const saveResult = (entry) => {
  const existing = JSON.parse(localStorage.getItem('atomiq_reports') || '[]');
  existing.unshift(entry);
  const trimmed = existing.slice(0, 10);
  localStorage.setItem('atomiq_reports', JSON.stringify(trimmed));
};

const Compare = () => {
  const [compounds, setCompounds] = useState(Array(MAX_COMPARE).fill({ name: '', smiles: '' }));
  const [results, setResults] = useState([]);
  const [error, setError] = useState('');

  const handleInput = (idx, field, value) => {
    setCompounds((prev) => prev.map((item, i) => (i === idx ? { ...item, [field]: value } : item)));
  };

  const compare = async () => {
    setError('');
    const toAnalyze = compounds.filter((c) => c.name.trim() || c.smiles.trim());
    if (!toAnalyze.length) {
      setError('Enter at least one compound name or SMILES to compare.');
      return;
    }

    try {
      const output = [];
      for (const comp of toAnalyze) {
        const payload = { name: comp.name, smiles: comp.smiles };
        const res = await axios.post('http://localhost:5000/predict', payload);
        if (res.data.error) throw new Error(res.data.error);

        const record = {
          label: comp.name || comp.smiles,
          ...res.data,
          timestamp: new Date().toISOString()
        };

        saveResult(record);
        output.push(record);
      }

      output.sort((a, b) => b.risk_score - a.risk_score);
      setResults(output);
    } catch (err) {
      setError('Comparison request failed: ' + (err?.response?.data?.error || err.message));
    }
  };

  return (
    <div className="compare fade-in">
      <h1>Compare Compounds (up to 3)</h1>
      <p className="hint">Enter name or SMILES for each compound; system finds best toxicity match and ranks by risk.</p>

      <div className="compare-list">
        {compounds.map((cmp, idx) => (
          <div key={idx} className="compare-row card">
            <label>Compound {idx + 1}</label>
            <input type="text" value={cmp.name} placeholder="Name (e.g. Aspirin)" onChange={(e) => handleInput(idx, 'name', e.target.value)} />
            <input type="text" value={cmp.smiles} placeholder="SMILES (optional)" onChange={(e) => handleInput(idx, 'smiles', e.target.value)} />
          </div>
        ))}
      </div>

      <button className="btn" onClick={compare}>Compare Toxicity</button>

      {error && <div className="error">{error}</div>}

      {results.length > 0 && (
        <div className="compare-results card">
          <h2>Ranked Compound Results</h2>
          <table>
            <thead>
              <tr>
                <th>Rank</th>
                <th>Compound</th>
                <th>Risk Score</th>
                <th>Category</th>
                <th>Prediction</th>
              </tr>
            </thead>
            <tbody>
              {results.map((item, index) => (
                <tr key={item.label + index} className={item.risk_score > 80 ? 'high' : item.risk_score > 60 ? 'medium' : 'low'}>
                  <td>{index + 1}</td>
                  <td>{item.label}</td>
                  <td>{item.risk_score}%</td>
                  <td>{item.category}</td>
                  <td>{item.prediction ? 'Toxic' : 'Non-toxic'}</td>
                </tr>
              ))}
            </tbody>
          </table>
          <p className="note">Top compound is more toxic, bottom is safer. You can rerun with whitelisted compounds for exact comparison.</p>
        </div>
      )}
    </div>
  );
};

export default Compare;

