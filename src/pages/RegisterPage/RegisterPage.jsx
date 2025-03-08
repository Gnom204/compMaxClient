import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../../utils/api/authApi';
import './RegisterPage.css';
import { useAuth } from '../../components/AuthContext';

function RegisterPage() {
  const { login } = useAuth();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setError('');
    if (name === 'name') {
      setName(value);
    } else if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    registerUser(name, email, password)
      .then((response) => {
        if (response.token) {
          login();
          localStorage.setItem('token', response.token);
          navigate('/');
        } else {
          setError('Ошибка регистрации');
        }
      })
      .catch(() => {
        setError('Произошла ошибка на сервере. Попробуйте снова');
      });
  };

  return (
    <div className="register">
      <h1>Регистрация</h1>
      <form className='form' onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Имя:</label>
          <input
            type="text"
            value={name}
            onChange={handleChange}
            name="name"
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={handleChange}
            name="email"
            required
          />
        </div>
        <div className="form-group">
          <label>Пароль:</label>
          <input
            type="password"
            value={password}
            onChange={handleChange}
            name="password"
            required
          />
        </div>
        {error && <p className="error">{error}</p>}
        <p>Уже зарегистрированы?<Link to={'/login'}> Войти</Link></p>
        <button type="submit">Зарегистрироваться</button>
      </form>
    </div>
  );
}

export default RegisterPage;