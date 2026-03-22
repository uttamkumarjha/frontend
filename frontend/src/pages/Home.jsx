import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="home fade-in">
      <section className="hero">
        <h1>Welcome to Atom IQ</h1>
        <p>Advanced toxicity prediction using machine learning for safer chemicals.</p>
        <div className="hero-buttons">
          <Link to="/predict" className="btn">Start Prediction</Link>
          <Link to="/batch-predict" className="btn secondary">Batch Analysis</Link>
        </div>
      </section>
      <section className="features">
        <h2>Key Features</h2>
        <div className="features-grid">
          <div className="feature-card card">
            <h3>Single Molecule Prediction</h3>
            <p>Predict toxicity for individual chemical compounds.</p>
          </div>
          <div className="feature-card card">
            <h3>Batch Processing</h3>
            <p>Analyze multiple molecules at once with file upload.</p>
          </div>
          <div className="feature-card card">
            <h3>Feature Importance</h3>
            <p>Understand which molecular features influence predictions.</p>
          </div>
          <div className="feature-card card">
            <h3>Dashboard</h3>
            <p>Visualize results and analytics.</p>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;