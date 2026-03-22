import './About.css';

const About = () => {
  return (
    <div className="about fade-in">
      <div className="hero-section">
        <h1>About Project</h1>
        <p className="subtitle">Understanding Drug Toxicity Through AI</p>
      </div>

      <div className="card">
        <h2>What is Drug Toxicity?</h2>
        <p>
          Drug toxicity refers to the degree to which a substance can cause damage to living organisms. 
          In pharmaceutical development, understanding and predicting toxicity is crucial for patient safety.
        </p>
      </div>

      <div className="card">
        <h2>Computational Toxicology</h2>
        <p>
          Computational toxicology uses computer-based methods and machine learning to predict toxicity 
          without requiring extensive laboratory testing, saving time and resources.
        </p>
      </div>

      <div className="card">
        <h2>QSAR (Quantitative Structure-Activity Relationship)</h2>
        <p>
          QSAR models correlate chemical structure properties with biological activity. 
          By analyzing molecular descriptors, we can predict toxicity outcomes.
        </p>
      </div>

      <div className="card">
        <h2>Our ML Model</h2>
        <p>
          <strong>Algorithm:</strong> Random Forest Classifier<br/>
          <strong>Dataset:</strong> Tox21 (NIH toxicology database)<br/>
          <strong>Features:</strong> Molecular Weight, LogP, QED, SAS<br/>
          <strong>Accuracy:</strong> ~85% on test set
        </p>
      </div>

      <div className="card">
        <h2>Limitations of the Model</h2>
        <ul>
          <li>Model accuracy depends entirely on training data quality</li>
          <li>NOT a replacement for actual laboratory testing</li>
          <li>Limited biological factors considered</li>
          <li>Prediction uncertainty exists for borderline cases</li>
          <li>No metabolism simulation capabilities</li>
        </ul>
      </div>

      <div className="card">
        <h2>Future Improvements</h2>
        <ul>
          <li>Integration with additional toxicity datasets</li>
          <li>Deep learning models for better accuracy</li>
          <li>Drug interaction prediction</li>
          <li>Metabolism and pharmacokinetics simulation</li>
          <li>Real-world deployment with regulatory compliance</li>
        </ul>
      </div>
    </div>
  );
};

export default About;