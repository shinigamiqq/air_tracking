import React, { useState } from 'react';
import axios from 'axios';
import './css_components/DiaryStatus.css'; // Импортируем CSS для стилизации

const WeatherStatus = () => {
    const [airportId, setAirportId] = useState('');
    const [weatherData, setWeatherData] = useState(null);
    const [error, setError] = useState(null);

    const handleAirportIdChange = (e) => {
        setAirportId(e.target.value);
    };

    const handleFetchWeatherStatus = async () => {
        try {
            const response = await axios.get(`/weather_airports/${airportId}`);
            setWeatherData(filterData(response.data));
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch weather status');
        }
    };
    
    const filterData = (data) => {
        const filteredData = {};

        for (const [key, value] of Object.entries(data)) {
            if (key !== 'cached' && key !== 'time') {
                filteredData[key] = value;
            }
        }

        return filteredData;
    };

    const renderWeatherData = () => {
        if (!weatherData) return null;

        return (
            <div>
                {Object.entries(weatherData).map(([key, value]) => (
                    <div key={key}>
                        <h3>{key}</h3>
                        {renderValue(key, value)}
                    </div>
                ))}
            </div>
        );
    };

    const renderValue = (key, value) => {
        if (typeof value === 'object') {
            switch (key) {
                case 'sky':
                    return <p>{value.condition.text}</p>;
                case 'visibility':
                    return <p>{value.mi}</p>;
                case 'wind':
                    return (
                        <p>
                            {value.direction.text} at {value.speed.mph} mph
                        </p>
                    );
                case 'dewpoint':
                    return <p>{value.celsius} celsius</p>
                case 'pressure':
                    return <p>{value.hpa} HPA</p>
                case 'flight':
                    return <p>{value.category}</p>
                case 'temp':
                    return <p>{value.celsius} celsius</p>
                case 'elevation':
                    return <p>{value.m} metres</p>
                default:
                    return Object.entries(value).map(([subKey, subValue]) => (
                        <p key={subKey}>
                            <strong>{subKey}: </strong> {typeof subValue === 'object' ? JSON.stringify(subValue) : subValue}
                        </p>
                    ));
            }
        } else {
            return <p>{value}</p>;
        }
    };

    return (
        <div>
            <h2>Weather Status</h2>
            <label className='custom-label'>
                Airport IATA:
                <input className="custom-input" type="text" value={airportId} onChange={handleAirportIdChange} />
            </label>
            <button className="custom-button" onClick={handleFetchWeatherStatus}>Fetch Airport's Weather Status</button>
            {error && <div>{error}</div>}
            {renderWeatherData()}
        </div>
    );
}

export default WeatherStatus;
