import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Form = () => {
    const navigate = useNavigate();
    const [title, setTitle] = useState('');
    const [severity, setSeverity] = useState('Средний');
    
    const [validationError, setValidationError] = useState('');
    const [serverError, setServerError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setValidationError('');
        setServerError('');

        // Валидация
        if (title.trim().length < 10) {
            setValidationError('Описание нарушения слишком короткое (минимум 10 символов).');
            return;
        }

        const newIncident = { title, severity, status: 'Открыт' };

        try {
            await axios.post("https://data-base-for-lab-1.onrender.com/incidents", JSON.stringify(newIncident), {
                headers: { "Content-Type": "application/json" }
            });
            navigate('/');
        } catch (error) {
            // Обработка ошибок сервера
            if (error.response) {
                if (error.response.status === 404) {
                    setServerError('Ошибка 404: Эндпоинт не найден. Проверьте адрес сервера.');
                } else if (error.response.status >= 500) {
                    setServerError(`Ошибка ${error.response.status}: Сервер упал.`);
                } else {
                    setServerError(`Ошибка: ${error.response.statusText}`);
                }
            } else {
                setServerError('Сервер недоступен. Проверьте, запущен ли json-server.');
            }
        }
    };

    return (
        <div>
            <h2>Добавить новый инцидент</h2>
            
            {/* Плашка с серверной ошибкой */}
            {serverError && <div style={{ background: '#ffcccc', padding: '10px', color: 'red', marginBottom: '15px' }}>{serverError}</div>}

            <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Описание нарушения: </label>
                    <input 
                        type="text" 
                        value={title} 
                        onChange={(e) => setTitle(e.target.value)} 
                    />
                    {/* Плашка с ошибкой валидации */}
                    {validationError && <p style={{ color: 'red', fontSize: '12px', margin: '5px 0 0 0' }}>{validationError}</p>}
                </div>
                <div style={{ marginBottom: '10px' }}>
                    <label>Уровень угрозы: </label>
                    <select value={severity} onChange={(e) => setSeverity(e.target.value)}>
                        <option value="Низкий">Низкий</option>
                        <option value="Средний">Средний</option>
                        <option value="Высокий">Высокий</option>
                        <option value="Критический">Критический</option>
                    </select>
                </div>
                <button type="submit">Сохранить</button>
            </form>
        </div>
    );
};

export default Form;