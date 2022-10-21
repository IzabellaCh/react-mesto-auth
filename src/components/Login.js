import React, { useState } from "react";
import { withRouter, useHistory } from 'react-router-dom';
import AuthenticationWithForm from "./AuthenticationWithForm";
import { authorization } from '../utils/authorization';

function Login({ handleLogin, setEmail }) {
  const [saveButton, setSaveButton] = useState('Войти');
  const history = useHistory();
  
  function handleClick() {
    setSaveButton('Подождите...');
    setTimeout(setSaveButton, 1500, 'Войти');
  }

  function handleSubmit(event, email, password) {
    event.preventDefault();
    authorization.login(email, password)
      .then((data) => {
        localStorage.setItem('token', data.token);
        setEmail(email);
        handleLogin();
        history.push('/');
      })
      .catch((err) => {
        console.log(`Ошибка при авторизации: ${err}`);
    })
  }

  return (
    <section className="authentication" aria-label="Вход в личный кабинет">
      <div className="authentication__container">
        <h2 className='authentication__heading'>Вход</h2>
        <AuthenticationWithForm handleSubmit={handleSubmit} onClick={handleClick} saveButton={saveButton} />
      </div>
    </section>
  )
}

export default withRouter(Login);