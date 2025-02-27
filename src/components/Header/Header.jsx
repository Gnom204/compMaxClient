import React, { useEffect, useState } from 'react';
import './Header.css';
import { checkToken } from '../../utils/api/authApi';
import { Link, useNavigate } from 'react-router-dom'; // Исправленный импорт
import { useAuth } from '../AuthContext';

function Header() {
    const [isAdmin, setIsAdmin] = useState(false);
    const { isLoggedIn, check, logout, login } = useAuth();
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem('token');

        // Проверка токена и установка isAdmin
        const verifyToken = async () => {
            try {
                const res = await checkToken(token);
                console.log(res);
        if(res) {
            login();
        setIsAdmin(true);
        } 

            } catch (error) {
                console.error('Ошибка при проверке токена:', error);
                setIsAdmin(false);
            }
        };

        verifyToken();
        check(); // Проверка авторизации
    }, [check]);

    const handleLogout = () => {
        localStorage.removeItem('token');
        logout();
        navigate('/');
        setIsAdmin(false);
    };

    return (
        <header className='header'>
            {console.log({isAdmin})}
            <div className='logo__container'>
                <Link to={'/'} className='logo'>CompMax</Link>
            </div>
            <div className='profile'>
                {/* Показываем "Вход", если пользователь не авторизован или не админ */}
                {(!isLoggedIn || !isAdmin) && (
                    <Link to={'/login'} className='text'>Вход</Link>
                )}

                {/* Показываем "Админку", если пользователь админ */}
                {isAdmin && (
                    <Link to={'/admin'} className='text'>Перейти в админку</Link>
                )}

                {/* Показываем "Корзину", если пользователь авторизован */}
                {isLoggedIn && (
                    <Link to={'/cart'} className='text'>Корзина</Link>
                )}

                {/* Показываем "Выход", если пользователь авторизован или админ */}
                {(isLoggedIn || isAdmin) && (
                    <button className='text' onClick={handleLogout}>Выход</button>
                )}
            </div>
        </header>
    );
}

export default Header;