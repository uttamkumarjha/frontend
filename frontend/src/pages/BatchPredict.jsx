import { useState } from 'react';
import axios from 'axios';
import './BatchPredict.css';

const BatchPredict = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) return;
    setLoading(true);
    const formData = new FormData();
    formData.append('file', file);
    try {
      const response = await axios.post('http://localhost:5000/batch_predict', formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      setResults(response.data.results);
    } catch (error) {
      console.error('Error in batch prediction:', error);
    }
    setLoading(false);
  };

  return (
    <div className="batch-predict fade-in">
      <h1>Batch Prediction</h1>
      <form onSubmit={handleSubmit} className="card">
        <div className="form-group">
          <label htmlFor="file">Upload CSV File</label>
          <input
            type="file"
            id="file"
            accept=".csv"
            onChange={handleFileChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Processing...' : 'Run Batch Prediction'}
        </button>
      </form>
      {results.length > 0 && (
        <div className="results card">
          <h2>Batch Results</h2>
          <table className="results-table">
            <thead>
              <tr>
                <th>MW</th>
                <th>LogP</th>
                <th>QED</th>
                <th>SAS</th>
                <th>Prediction</th>
                <th>Risk Score</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{result.mw}</td>
                  <td>{result.logp}</td>
                  <td>{result.qed}</td>
                  <td>{result.sas}</td>
                  <td>{result.prediction ? 'Toxic' : 'Non-Toxic'}</td>
                  <td>{result.risk_score}%</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default BatchPredict;