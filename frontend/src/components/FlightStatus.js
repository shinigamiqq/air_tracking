import React, { useState } from 'react';
import axios from 'axios';
import './css_components/FlightStatus.css';
const FlightStatus = () => {
    const [flightId, setFlightId] = useState('');
    const [id, setId] = useState('');
    const [flightData, setFlightData] = useState(null);
    const [mapUrl, setMapUrl] = useState(null);
    const [error, setError] = useState(null);

    const handleFlightIdChange = (e) => {
        setFlightId(e.target.value);
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleFetchFlightStatus = async () => {
        try {
            const response = await axios.get(`/flights/${flightId}?id=${id}`);
            setFlightData(response.data['flight_data']);
            setMapUrl(response.data['map_url']);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch flight status');
        }
    };

    const renderFlightData = () => {
        if (!flightData) return null;

        // Фильтруем объект данных, исключая элемент 'squawk'
        const filteredData = Object.fromEntries(
            Object.entries(flightData).filter(([key, value]) => key !== 'squawk')
        );

        return (
            <div>
                {Object.entries(filteredData).map(([key, value]) => (
                    <p key={key}>
                        <strong>{key}: </strong> {value}
                    </p>
                ))}
               {mapUrl && <iframe src={mapUrl} title="Flight Map" className="custom-iframe"></iframe>}
            </div>
        );
    };

    return (
        <div>
            <h2>Flight Status</h2>
            <label className="custom-label">
                Flight ID:
                <input className="custom-input" type="text" value={flightId} onChange={handleFlightIdChange} />
            </label>
            <label className="custom-label">
                ID:
                <input className="custom-input" type="text" value={id} onChange={handleIdChange} />
            </label>
            <button className="custom-button" onClick={handleFetchFlightStatus}>Fetch Flight Status</button>
            {error && <div>{error}</div>}
            {renderFlightData()}
        </div>
    );
};

export default FlightStatus;
