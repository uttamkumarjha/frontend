import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Predict from './pages/Predict';
import BatchPredict from './pages/BatchPredict';
import Dashboard from './pages/Dashboard';
import Compare from './pages/Compare';
import Reports from './pages/Reports';
import FeatureImportance from './pages/FeatureImportance';
import Research from './pages/Research';
import About from './pages/About';
import Team from './pages/Team';
import GenerateReport from './pages/GenerateReport';
import ApiConnect from './pages/ApiConnect';
import './App.css';

function App() {
  return (
    <Router>
      <div className="app">
        <Navbar />
        <main className="container">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/predict" element={<Predict />} />
            <Route path="/batch-predict" element={<BatchPredict />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/compare" element={<Compare />} />
            <Route path="/reports" element={<Reports />} />
            <Route path="/feature-importance" element={<FeatureImportance />} />
            <Route path="/research" element={<Research />} />
            <Route path="/about" element={<About />} />
            <Route path="/team" element={<Team />} />
            <Route path="/generate-report" element={<GenerateReport />} />
            <Route path="/api-connect" element={<ApiConnect />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;