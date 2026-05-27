import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleLogin = (e) => {
        e.preventDefault();
        // Фейковая проверка: пускаем с паролем "123"
        if (password === '123') {
            localStorage.setItem('fakeToken', 'industrial_safety_token_xyz');
            onLogin(); // Сообщаем App.js, что мы вошли
        } else {
            setError('Неверный пароль!');
        }
    };

    return (
        <div style={{ maxWidth: '300px', margin: '50px auto', textAlign: 'center' }}>
            <h2>Вход в систему</h2>
            <form onSubmit={handleLogin}>
                <input 
                    type="password" 
                    placeholder="Пароль" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    style={{ width: '100%', padding: '8px', marginBottom: '10px' }}
                />
                <button type="submit" style={{ width: '100%', padding: '10px' }}>Войти</button>
            </form>
            {error && <p style={{ color: 'red', marginTop: '10px' }}>{error}</p>}
        </div>
    );
};

export default Login;