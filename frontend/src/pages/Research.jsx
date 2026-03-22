import './Research.css';

const Research = () => {
  return (
    <div className="research fade-in">
      <h1>Research</h1>
      <div className="card research-card">
        <h2>Overview</h2>
        <p>
          Atom IQ is built according to rigorous scientific standards and modern data science practices. This page provides a concise and accessible explanation for students, researchers, and professionals who seek a practical roadmap. It is written in an easy-to-follow voice with supporting figure-style descriptions and real-world examples. The following content has been structured to exceed a full page in a standard browser width and includes depth of context while remaining practical.
        </p>

        <h3>1. Problem Statement</h3>
        <p>
          In drug discovery and chemical research, predicting human and environmental toxicity early saves time and reduces cost. Traditional lab experiments are expensive and slow. Atom IQ focuses on delivering an early-stage toxicity estimation using computational models. Indexing a compound by simple inputs such as chemical name or SMILES allows beginners to use the system without deep chemistry skills.
        </p>

        <h3>2. Data Foundations</h3>
        <p>
          Data comes from publicly available sets like Tox21, where compounds are labeled with toxicity endpoints (e.g., hepatotoxicity, aryl hydrocarbon receptor activity). Most molecules are represented as SMILES strings, and from those, the system extracts descriptors:
        </p>
        <ul>
          <li>Mol Weight (MW): heavy or light molecules differ in absorption.</li>
          <li>LogP: hydrophobicity scale. High LogP often links with membrane permeability and toxicity.</li>
          <li>QED: drug-likeness score (0 to 1), higher values are considered safer for oral drugs.</li>
          <li>SAS: synthetic accessibility with lower values for easy synthesis; high values may indicate structures with unusual reactivity.
          </li>
        </ul>

        <h3>3. Model Strategy</h3>
        <p>
          Atom IQ uses a supervised model (e.g. RandomForest) with feature vector [MW, LogP, QED, SAS]. Each descriptor is scaled and contributions are captured with feature importance. The model is trained and validated using holdout test sets, cross-validation, and confusion metrics such as accuracy, recall, and F1. In this prototype, we include a fallback “safe baseline” model to show reliable results when specialized dependencies are unavailable.
        </p>

        <h3>4. Name-to-SMILES and Formula Support</h3>
        <p>
          If only the compound name is entered, Atom IQ queries PubChem REST APIs to convert the name into canonical SMILES. This makes the tool beginner-friendly and reduces human error when typing complex structures. Because many students know names like aspirin and caffeine, this path is crucial for usability.
        </p>

        <h3>5. User Journey</h3>
        <p>
          The user interface has three main actions:
        </p>
        <ol>
          <li>Enter chemical name / SMILES / formula.</li>
          <li>Click Predict. The system resolves the structure, calculates descriptors, and scores toxicity.</li>
          <li>View results and compare with up to three compounds side-by-side (Compare page).</li>
        </ol>

        <h3>6. Interpretation Guide</h3>
        <p>
          Results include a risk score (0-100), category (Very Safe / Safe / Moderate / High Risk / Very Toxic), and verbose explanation. Students learn by seeing what variable drives the estimate. On the Feature Importance page, they can enter values to get human-readable explanations like “High molecular weight and low QED are linked to higher risk in this model”.
        </p>

        <h3>7. Visible Safety and Authorship</h3>
        <p>
          In the app, all predictions are stored in local storage for quick access. The Reports page displays the last 10 entries with date, compound, risk, and descriptor values, enabling audit trails for classroom assignments or lab notebooks.
        </p>

        <h3>8. Design for Students</h3>
        <p>
          The interface is purposely simplified: dark theme, clear labels, and optional advanced controls. Users can immediately test and iterate without writing code. Comparing multiple compounds is possible with a table that highlights safer vs riskier molecules.
        </p>

        <h3>9. Responsible Use Notes</h3>
        <p>
          Atom IQ is not a regulatory safety certificate; it produces preliminary estimates only. Always combine with experimental validation and domain expertise. It is intended as a teaching tool and decision support, not final approval.
        </p>

        <h3>10. Next Steps</h3>
        <p>
          Future improvements include multi-endpoint toxicity (e.g. aquatic, hepatotoxic, carcinogenic), more robust molecular fingerprints, and secure cloud deployment with user login (optional). For a lab course, instructors can add methods to upload CSV compound libraries and track student results.
        </p>
      </div>
    </div>
  );
};

export default Research;