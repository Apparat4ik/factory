import React, { useState, useEffect } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';

const Detail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    
    const [incident, setIncident] = useState({ title: '', severity: '', status: '' });

    useEffect(() => {
        axios.get(`https://data-base-for-lab-1.onrender.com/incidents/${id}`)
            .then(res => setIncident(res.data))
            .catch(err => console.error("Ошибка загрузки:", err));
    }, [id]);

    // Функция обновления данных (PUT)
    const handleUpdate = async (e) => {
        e.preventDefault();
        try {
            await axios.put(`https://data-base-for-lab-1.onrender.com/incidents/${id}`, incident);
            alert("Статус инцидента обновлен!");
            navigate('/');
        } catch (error) {
            console.error("Ошибка обновления:", error);
        }
    };

    return (
        <div>
            <h2>Детализация инцидента №{id}</h2>
            <form onSubmit={handleUpdate} style={{ border: '1px solid #ddd', padding: '15px', borderRadius: '5px' }}>
                <div style={{ marginBottom: '10px' }}>
                    <label>Описание: </label>
                    <input 
                        type="text" 
                        value={incident.title} 
                        onChange={(e) => setIncident({...incident, title: e.target.value})} 
                        required 
                    />
                </div>
                
                <div style={{ marginBottom: '10px' }}>
                    <label>Текущий статус: </label>
                    <select 
                        value={incident.status} 
                        onChange={(e) => setIncident({...incident, status: e.target.value})}
                    >
                        <option value="Открыт">Открыт</option>
                        <option value="В работе">В работе</option>
                        <option value="Устранен">Устранен</option>
                    </select>
                </div>

                <button type="submit">Обновить запись</button>
            </form>
            
            <div style={{ marginTop: '20px' }}>
                <Link to="/">← Вернуться к списку</Link>
            </div>
        </div>
    );
};

export default Detail;