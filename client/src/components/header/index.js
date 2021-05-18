import { Link } from 'react-router-dom';
import { AuthContext } from '../../context/auth';
import {useContext} from 'react';

import './header.css';
import Logo from '../../assets/logo-desperado-white.svg';

function Header() {
  const { user, logout } = useContext(AuthContext);

  return (
    <header>
      <div className="header-section">
      <Link to="/">
        <img src={Logo} alt="The desperado logo" />
      </Link>
      </div>
      {
        user ?
        <div className="header-section">
          <Link className="btn btn-solid" to="/createGame">Create Game</Link>
          <div className="btn btn-hollow" onClick={logout}>Logout of {user.username}</div>
        </div>
        :
        <div className="header-section">
          <Link className="btn btn-hollow" to="/login">Login</Link>
          <Link className="btn btn-solid" to="/register">Register</Link>
        </div>
      }
    </header>
  );
}

export default Header;
