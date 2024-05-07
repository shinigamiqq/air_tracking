import React, { useState } from 'react';
import axios from 'axios';
import './css_components/DiaryStatus.css'; // Импортируем CSS для стилизации

const AirlineStatus = () => {
    const [airlineId, setAirlineId] = useState('');
    const [airlineData, setAirlineData] = useState(null);
    const [error, setError] = useState(null);

    const handleAirlineIdChange = (e) => {
        setAirlineId(e.target.value);
    };

    const handleFetchAirlineStatus = async () => {
        try {
            const response = await axios.get(`/airlines/${airlineId}`);
            setAirlineData(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch weather status');
        }
    };

    const renderAirlineData = () => {
        if (!airlineData) return null;

        // Фильтруем объект данных, исключая элемент 'cached'
        const filteredData = Object.fromEntries(
            Object.entries(airlineData)
        );

        return (
            <div>
                {Object.entries(filteredData).map(([key, value]) => (
                    <p key={key}>
                        <strong>{key}: </strong> {typeof value === 'object' ? JSON.stringify(value) : value}
                    </p>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h2>Airline Info</h2>
            <label className='custom-label'>
                Airline Name:
                <input className="custom-input" type="text" value={airlineId} onChange={handleAirlineIdChange} />
            </label>
            <button className="custom-button" onClick={handleFetchAirlineStatus}>Fetch Airline Info</button>
            {error && <div>{error}</div>}
            {renderAirlineData()}
        </div>
    );
}

export default AirlineStatus;