import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="container">
        <Link to="/" className="logo">Atom IQ</Link>
        <ul className="nav-links">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/predict">Predict</Link></li>
          <li><Link to="/dashboard">Dashboard</Link></li>
          <li><Link to="/compare">Compare</Link></li>
          <li><Link to="/reports">Reports</Link></li>
          <li><Link to="/batch-predict">Batch Analysis</Link></li>
          <li><Link to="/feature-importance">Feature Importance</Link></li>
          <li><Link to="/research">Research</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/team">Team</Link></li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;