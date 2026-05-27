import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Home = () => {
    const [incidents, setIncidents] = useState([]);
    const [error, setError] = useState('');

    // получаем json и преобразуем в массив инцедентов
    useEffect(() => {
        axios.get(`https://data-base-for-lab-1.onrender.com/incidents?t=${new Date().getTime()}`)
            .then(response => setIncidents(response.data))
            .catch(error => console.error("Ошибка загрузки данных:", error));
    }, []);

    const handleDelete = async (id) => {
        setError('');
        try {
            await axios.delete(`https://data-base-for-lab-1.onrender.com/incidents/${id}`);
            setIncidents(incidents.filter(item => item.id !== id));
        } catch (error) {
            if (error.response) {
                setError(`Ошибка ${error.response.status}: Не удалось удалить запись.`);
            } else {
                setError("Ошибка сети: Сервер не отвечает.");
            }
        }
    };

    return (
        <div>
            <h2>Журнал промышленной безопасности</h2>
            {error && <div style={{ background: '#ffcccc', padding: '10px', color: 'red', marginBottom: '15px' }}>{error}</div>}
            <Link to="/add">
                <button style={{ marginBottom: '15px', padding: '5px 10px' }}>
                    + Зафиксировать новый инцидент
                </button>
            </Link>
            
            <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%', textAlign: 'left' }}>
                <thead style={{ backgroundColor: '#f2f2f2' }}>
                    <tr>
                        <th>ID</th>
                        <th>Описание нарушения</th>
                        <th>Уровень угрозы</th>
                        <th>Статус</th>
                        <th>Действия</th>
                    </tr>
                </thead>
                <tbody>
                    {incidents.map(item => (
                        <tr key={item.id}>
                            <td>{item.id}</td>
                            <td>{item.title}</td>
                            <td>
                                <strong style={{ color: item.severity === 'Критический' ? 'red' : 'inherit' }}>
                                    {item.severity}
                                </strong>
                            </td>
                            <td>{item.status}</td>
                            <td>
                                <Link to={`/detail/${item.id}`} style={{ marginRight: '15px' }}>Изменить</Link>
                                <button onClick={() => handleDelete(item.id)} style={{ color: 'red', cursor: 'pointer' }}>
                                    Удалить
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default Home;