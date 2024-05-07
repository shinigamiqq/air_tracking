import React, { useState } from 'react';
import axios from 'axios';
import './css_components/DiaryStatus.css'; // Импортируем CSS для стилизации

const AirportStatus = () => {
    const [airportId, setAirportId] = useState('');
    const [airportData, setAirportData] = useState(null);
    const [error, setError] = useState(null);

    const handleAirportIdChange = (e) => {
        setAirportId(e.target.value);
    };

    const handleFetchAirportStatus = async () => {
        try {
            const response = await axios.get(`/airports/${airportId}`);
            setAirportData(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch weather status');
        }
    };

    const renderAirportData = () => {
        if (!airportData) return null;

        // Фильтруем объект данных, исключая элемент 'cached'
        const filteredData = Object.fromEntries(
            Object.entries(airportData)
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
            <h2>Airport Status</h2>
            <label className='custom-label'>
                Airport IATA:
                <input className="custom-input" type="text" value={airportId} onChange={handleAirportIdChange} />
            </label>
            <button className="custom-button" onClick={handleFetchAirportStatus}>Fetch Airport Status</button>
            {error && <div>{error}</div>}
            {renderAirportData()}
        </div>
    );
}

export default AirportStatus;