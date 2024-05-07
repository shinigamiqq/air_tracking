import React, { useState } from 'react';
import axios from 'axios';
import './css_components/DiaryStatus.css'; // Импортируем CSS для стилизации

const DiariesStatus = () => {
    const [airportId1, setAirportId1] = useState('');
    const [airportId2, setAirportId2] = useState('');
    const [diaryData, setDiaryData] = useState(null);
    const [error, setError] = useState(null);

    const handleAirportIdChange1 = (e) => {
        setAirportId1(e.target.value);
    };

    const handleAirportIdChange2 = (e) => {
        setAirportId2(e.target.value);
    };

    const handleFetchDiaryStatus = async () => {
        try {
            const response = await axios.get(`/diaries/${airportId1}/${airportId2}`);
            setDiaryData(response.data);
            setError(null);
        } catch (err) {
            console.error(err);
            setError('Failed to fetch weather status');
        }
    };

    const renderDiaryData = () => {
        if (!diaryData) return null;

        return (
            <div>
                {diaryData.map((flight, index) => (
                    <div className="flight-container" key={index}>
                        <h3>Flight {index + 1}</h3>
                        <div className="flight-details">
                            <FlightDetail label="Flight ID" value={flight.flight.identification.id} />
                            <FlightDetail label="Status" value={flight.flight.status.text} />
                            <FlightDetail label="Airline" value={flight.flight.airline.name} />
                            <FlightDetail label="Departure Terminal" value={flight.flight.airport.origin.info.terminal} />
                            <FlightDetail label="Departure Gate" value={flight.flight.airport.origin.info.gate} />
                            <FlightDetail label="Destination Terminal" value={flight.flight.airport.destination.info.terminal} />
                            <FlightDetail label="Destination Baggage" value={flight.flight.airport.destination.info.baggage} />
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    const FlightDetail = ({ label, value }) => (
        <p>
            <strong>{label}: </strong> {typeof value === 'object' ? JSON.stringify(value) : value}
        </p>
    );

    return (
        <div>
            <h2>Flight Diary Between Two Airports</h2>
            <label className='custom-label'>
                Departure Airport IATA:
                <input className="custom-input" type="text" value={airportId1} onChange={handleAirportIdChange1} />
            </label>
            <label className='custom-label'>
                Arrival Airport IATA:
                <input className="custom-input" type="text" value={airportId2} onChange={handleAirportIdChange2} />
            </label>
            <button className="custom-button" onClick={handleFetchDiaryStatus}>Fetch Airport's Diary</button>
            {error && <div>{error}</div>}
            {renderDiaryData()}
        </div>
    );
}

export default DiariesStatus;
