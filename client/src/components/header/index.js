import { Link } from 'react-router-dom';

import './header.css';
import Logo from '../../assets/logo-desperado-white.svg';

function Header() {
  return (
    <header>
      <div className="header-section">
        <img src={Logo} alt="The desperado logo" />
      </div>
      <div className="header-section">
        <Link className="btn btn-hollow" to="/login">Login</Link>
        <Link className="btn btn-solid" to="/register">Register</Link>
      </div>
    </header>
  );
}

export default Header;
