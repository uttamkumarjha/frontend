import { useState } from 'react';
import './ApiConnect.css';

const ApiConnect = () => {
  const [smiles, setSmiles] = useState('');
  const [result, setResult] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handlePredict = async () => {
    if (!smiles.trim()) {
      setError('Please enter a SMILES string');
      return;
    }

    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const response = await fetch('https://backend-1-gmhv.onrender.com/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ smiles }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      setResult(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="api-connect fade-in">
      <h1>API Connection Test</h1>
      <div className="card">
        <div className="form-group">
          <label htmlFor="smiles">SMILES String</label>
          <input
            type="text"
            id="smiles"
            value={smiles}
            onChange={(e) => setSmiles(e.target.value)}
            placeholder="Enter SMILES string"
            className="input"
          />
        </div>
        <button
          onClick={handlePredict}
          disabled={loading}
          className="btn"
        >
          {loading ? 'Predicting...' : 'Predict'}
        </button>

        {error && (
          <div className="error">
            Error: {error}
          </div>
        )}

        {result && (
          <div className="result">
            <h3>Prediction Results:</h3>
            <p><strong>MW:</strong> {result.mw}</p>
            <p><strong>LogP:</strong> {result.logp}</p>
            <p><strong>QED:</strong> {result.qed}</p>
            <p><strong>SAS:</strong> {result.sas}</p>
            <p><strong>Category:</strong> {result.category}</p>
            <p><strong>Risk Score:</strong> {result.risk_score}</p>
            <p><strong>Explanation:</strong> {result.explanation}</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ApiConnect;