import { useState } from 'react';
import axios from 'axios';
import './GenerateReport.css';

const GenerateReport = () => {
  const [formData, setFormData] = useState({
    mw: '',
    logp: '',
    qed: '',
    sas: '',
    prediction: '',
    risk_score: '',
    reasons: ''
  });
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response = await axios.post('http://localhost:5000/generate_report', formData, {
        responseType: 'blob'
      });
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement('a');
      link.href = url;
      link.setAttribute('download', 'report.pdf');
      document.body.appendChild(link);
      link.click();
    } catch (error) {
      console.error('Error generating report:', error);
    }
    setLoading(false);
  };

  return (
    <div className="generate-report fade-in">
      <h1>Generate PDF Report</h1>
      <form onSubmit={handleSubmit} className="card">
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
        <div className="form-group">
          <label htmlFor="prediction">Prediction (0 or 1)</label>
          <input
            type="number"
            id="prediction"
            name="prediction"
            value={formData.prediction}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="risk_score">Risk Score</label>
          <input
            type="number"
            step="0.01"
            id="risk_score"
            name="risk_score"
            value={formData.risk_score}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="reasons">Reasons</label>
          <textarea
            id="reasons"
            name="reasons"
            value={formData.reasons}
            onChange={handleChange}
            className="input"
            required
          />
        </div>
        <button type="submit" className="btn" disabled={loading}>
          {loading ? 'Generating...' : 'Generate PDF'}
        </button>
      </form>
    </div>
  );
};

export default GenerateReport;