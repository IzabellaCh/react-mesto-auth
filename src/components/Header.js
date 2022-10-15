import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header() {
  return (
    <header className="header">
      <img className="header__logo" src={logo} alt="Логотип." />
      <NavLink to="/sign-in" activeClassName="header__link_active" className="header__link">Войти</NavLink>
      <NavLink to="/sign-up" activeClassName="header__link_active" className="header__link">Регистрация</NavLink>
    </header>
  )
}

export default Header;