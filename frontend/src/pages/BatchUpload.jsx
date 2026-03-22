import './BatchUpload.css';

const BatchUpload = () => {
  return (
    <div className="batch-upload fade-in">
      <h1>Batch Upload</h1>
      <div className="card glass">
        <p>Upload CSV of compounds to run multi-sample toxicity predictions.</p>
      </div>
    </div>
  );
};

export default BatchUpload;
