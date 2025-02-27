import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { loginAdmin, loginUser } from '../../utils/api/authApi';
import './LoginPage.css';
import { useAuth } from '../../components/AuthContext';
function LoginPage() {
  const {login} = useAuth();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();

const handleChange = (e) => {
    const { name, value } = e.target;
  setError('');
    if (name === 'email') {
      setEmail(value);
    } else if (name === 'password') {
      setPassword(value);
    }
  };

    const handleSubmit = (e) => {
      e.preventDefault();
  
      loginAdmin(email, password)
        .then((response) => {
          if (response.token) {
            localStorage.setItem('token', response.token);
            login();
            navigate('/admin');
          } else {
              loginUser(email, password)
              .then((response) => {
                login();
                if (response.token) {
                  localStorage.setItem('token', response.token);
                  navigate('/');
                }
              })
          }
        })
        .catch((error) => {
          setError(error.message);
        });
    };
  
    return (
      <div className="admin-login">
        <h1>Вход</h1>
        <form className='form' onSubmit={handleSubmit}>
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
          <p>Еще не зарегистрированы?<Link to={'/register'}> Зарегистрироваться</Link></p>
          <button type="submit">Войти</button>
        </form>
      </div>
    );
}

export default LoginPage