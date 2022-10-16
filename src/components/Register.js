import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import AuthenticationWithForm from './AuthenticationWithForm';

function Register() {
  const [saveButton, setSaveButton] = useState('Зарегистрироваться');
  
  function handleClick() {
    setSaveButton('Регистрация...');
    setTimeout(setSaveButton, 1500, 'Зарегистрироваться')
  }

  return (
    <section className="authentication" aria-label="Регистрация">
      <h2 className='authentication__heading'>Регистрация</h2>
      <AuthenticationWithForm onClick={handleClick} saveButton={saveButton} />
      <p className='authentication__subtitle'>Уже зарегистрированы? <Link to="/sign-in" className="authentication__subtitle authentication__subtitle_type_link button-link-opacity">Войти</Link></p>
    </section>
  )
}

export default Register;