import React, { useState } from "react";

function AuthenticationWithForm({ onClick, saveButton }) {
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});
  const [isValid, setIsValid] = useState(false);
  
  function onChange(event) {
    const { name, value, validationMessage } = event.target;
    
    setValues((prev) => ({
      ...prev,
      [name]: value
    }));
 
    setErrors((prev) => ({
      ...prev,
      [name]: validationMessage
    }));

    if (event.target.closest('form').checkValidity()) {
      setIsValid(true);
    } else {
      setIsValid(false);
    };
  }

    return (
    <form className='authentication__form' noValidate>
      <input type="email" value={values.email} onChange={onChange} name="email" className={`authentication__input ${(errors.email?.length > 1) ? 'authentication__input_type_error' : ''}`} placeholder='Email'required />
      <span className={`authentication__input-error ${(errors.email?.length > 1) ? 'authentication__input-error_active' : ''}`}>{errors.email}</span>
      <input type="password" value={values.password} onChange={onChange} name="password" className={`authentication__input ${(errors.password?.length > 1) ? 'authentication__input_type_error' : ''}`} placeholder='Пароль' minLength="4" maxLength="16" required />
      <span className={`authentication__input-error ${(errors.password?.length > 1) ? 'authentication__input-error_active' : ''} `}>{errors.password}</span>
      <button type="submit" disabled={!isValid} onClick={onClick} className={`authentication__save-button save-button ${isValid ? '' : 'authentication__save-button_disabled'}`}>{saveButton}</button>
    </form>
  )
}

export default AuthenticationWithForm;