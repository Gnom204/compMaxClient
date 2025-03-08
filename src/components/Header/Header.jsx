import React, { useEffect, useState } from 'react';
import './Header.css';
import { checkToken } from '../../utils/api/authApi';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

function Header() {
    const [isAdmin, setIsAdmin] = useState(false);
    const { check, logout, login, isLoggedIn } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');
        const verifyToken = async () => {
            try {
                const res = await checkToken(token);
                if (res) {
                    login();
                    setIsAdmin(true);
                }
            } catch (error) {
                console.error('Ошибка при проверке токена:', error);
                setIsAdmin(false);
            }
        };

        verifyToken();
        check();
        console.log(isLoggedIn);
    }, [check, login]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        navigate('/');
        setIsAdmin(false);
    };

    return (
        <header className='header'>
            <div className='logo__container'>
                <Link to={'/'} className='logo'>CompMax</Link>
            </div>
            <div className='profile'>
                {(!isLoggedIn ) && (
                    <Link to={'/login'} className='text'>Вход</Link>
                )}
                {(!isLoggedIn && !isAdmin ) && (
                    <Link to={'/register'} className='text'>Регистрация</Link>
                )}

                {isAdmin && (
                    <Link to={'/admin'} className='text'>Перейти в админку</Link>
                )}

                {isLoggedIn && (
                    <Link to={'/cart'} className='text'>Корзина</Link>
                )}

                {(isLoggedIn || isAdmin) && (
                    <button className='text' onClick={handleLogout}>Выход</button>
                )}
            </div>
        </header>
    );
}

export default Header;