import { useEffect, useState } from 'react';
import './Reports.css';

const Reports = () => {
  const [entries, setEntries] = useState([]);

  useEffect(() => {
    const stored = JSON.parse(localStorage.getItem('atomiq_reports') || '[]');
    setEntries(stored);
  }, []);

  return (
    <div className="reports fade-in">
      <h1>Reports</h1>
      <p className="description">Saved analysis history (up to 10 latest results). New results replace oldest entries.
      </p>
      {entries.length === 0 ? (
        <div className="card glass empty">No reports found yet. Run a prediction or comparison to save history.</div>
      ) : (
        <div className="report-table card">
          <table>
            <thead>
              <tr>
                <th>Date</th>
                <th>Compound</th>
                <th>Risk</th>
                <th>Category</th>
                <th>Prediction</th>
                <th>MW</th>
                <th>LogP</th>
                <th>QED</th>
                <th>SAS</th>
              </tr>
            </thead>
            <tbody>
              {entries.map((item, i) => (
                <tr key={`${item.label}-${i}`}>
                  <td>{new Date(item.timestamp || Date.now()).toLocaleString()}</td>
                  <td>{item.label || item.name || 'Unknown'}</td>
                  <td>{item.risk_score?.toFixed(2)}%</td>
                  <td>{item.category}</td>
                  <td>{item.prediction ? 'Toxic' : 'Safe'}</td>
                  <td>{item.mw?.toFixed(2)}</td>
                  <td>{item.logp?.toFixed(2)}</td>
                  <td>{item.qed?.toFixed(2)}</td>
                  <td>{item.sas?.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Reports;
