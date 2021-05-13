import './header.css';
import Logo from '../../assets/logo-desperado-white.svg';

function Header() {
  return (
    <header>
      <img src={Logo} alt="The desperado logo" />
    </header>
  );
}

export default Header;
