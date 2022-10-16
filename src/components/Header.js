import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../images/logo.svg';

function Header() {
  // вместо будущего стейта
  const loggedIn = false;
  const [openHeaderContainer, setOpenHeaderContainer] = useState(false);
  
  function handleOpenContainer() {
    setOpenHeaderContainer(true);
  }

  function handleHideContainer() {
    setOpenHeaderContainer(false);
  }
  
  return (
  <header className="header">
    {loggedIn && (
      <div className={`header__container_type_hidden ${openHeaderContainer ? 'header__container_type_open' : ''}`}>
        <p className="header__email">Здесь-будет@email</p>
        <NavLink to="/sign-in" className="header__link header__link_type_gate">Выйти</NavLink>
      </div>
    )}
    <div className="header__visible-part">
      <img className="header__logo" src={logo} alt="Логотип." />
      {!loggedIn && (
        <>
        <NavLink to="/sign-in" activeClassName="header__link_active" className="header__link">Войти</NavLink>
        <NavLink to="/sign-up" activeClassName="header__link_active" className="header__link">Регистрация</NavLink>
        </>
      )}
      {loggedIn && (
        <>
        <div className="header__container">
          <p className="header__email">Здесь-будет@email</p>
          <NavLink to="/sign-in" className="header__link header__link_type_gate">Выйти</NavLink>
        </div>
        <div onClick={handleOpenContainer} className={`header__button-open ${openHeaderContainer ? 'header__button-open_type_hidden' : ''}`}>
          <div className="header__line"></div>
          <div className="header__line"></div>
          <div className="header__line"></div>
        </div>
        <button onClick={handleHideContainer} className={`header__button-close ${openHeaderContainer ? '' : 'header__button-close_type_hidden'} button`}></button>
      </>
      )}
    </div>
  </header>
  )
}

export default Header;