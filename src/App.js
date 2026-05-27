import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import Detail from './pages/Detail';
import Form from './pages/Form';
import Login from './pages/Login';

const App = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    // Аутентификация
    useEffect(() => {
        if (localStorage.getItem('fakeToken')) {
            setIsAuthenticated(true);
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('fakeToken');
        setIsAuthenticated(false);
    };

    // Если не авторизован, показываем только страницу входа
    if (!isAuthenticated) {
        return <Login onLogin={() => setIsAuthenticated(true)} />;
    }

    return (
        <Router>
            <div style={{ padding: '20px', maxWidth: '800px', margin: '0 auto' }}>
                <nav style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '2px solid #ccc', paddingBottom: '10px' }}>
                    <h1>Система промышленной безопасности</h1>
                    <button onClick={handleLogout}>Выйти</button>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/detail/:id" element={<Detail />} />
                    <Route path="/add" element={<Form />} />
                    <Route path="/edit/:id" element={<Form />} />
                </Routes>
            </div>
        </Router>
    );
};

export default App;