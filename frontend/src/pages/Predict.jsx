import { useState } from 'react';
import './Predict.css';

const Predict = () => {
  const [smiles, setSmiles] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handlePredict = async (event) => {
    event.preventDefault();
    setResult(null);
    setError('');

    if (!smiles.trim()) {
      setError('Please enter a SMILES string');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('https://backend-1-gmhv.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ smiles: smiles.trim() })
      });

      if (!response.ok) {
        const message = await response.text();
        const serverMessage = message || `Error ${response.status}`;
        throw new Error(serverMessage);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      console.error('API error', err);
      setError(`Unable to perform prediction: ${err.message}`);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="predict fade-in">
      <h1>Single Molecule Prediction</h1>

      <form onSubmit={handlePredict} className="card">
        <div className="form-group">
          <label htmlFor="smiles">SMILES String</label>
          <input
            type="text"
            id="smiles"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            className="input"
            placeholder="e.g. CC(=O)Oc1ccccc1C(=O)O"
          />
        </div>

        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Predicting...' : 'Predict Toxicity'}
        </button>
      </form>

      {error && <div style={{ color: 'salmon', marginTop: '1rem' }}>{error}</div>}

      {result && (
        <div className="result card" style={{ marginTop: '1rem' }}>
          <h2>Prediction Result</h2>
          <p><strong>Molecular Weight:</strong> {result.mw ?? '-'}</p>
          <p><strong>LogP:</strong> {result.logp ?? '-'}</p>
          <p><strong>QED:</strong> {result.qed ?? '-'}</p>
          <p><strong>SAS:</strong> {result.sas ?? '-'}</p>
          <p><strong>Risk Category:</strong> {result.category ?? '-'}</p>
          <p><strong>Risk %:</strong> {result.risk_score != null ? `${result.risk_score}%` : '-'}</p>
          <p><strong>Explanation:</strong> {result.explanation ?? '-'}</p>
        </div>
      )}
    </div>
  );
};

export default Predict;