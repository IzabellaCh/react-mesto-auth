import React, { useState } from "react";
import AuthenticationWithForm from "./AuthenticationWithForm";

function Login() {
  const [saveButton, setSaveButton] = useState('Войти');
  
  function handleClick() {
    setSaveButton('Подождите...');
    setTimeout(setSaveButton, 1500, 'Войти');
  }

  return (
    <section className="authentication" aria-label="Вход в личный кабинет">
      <div className="authentication__container">
        <h2 className='authentication__heading'>Вход</h2>
        <AuthenticationWithForm onClick={handleClick} saveButton={saveButton} />
      </div>
    </section>
  )
}

export default Login;