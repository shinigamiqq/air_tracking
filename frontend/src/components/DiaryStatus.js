import React, { useState } from 'react';
import axios from 'axios';
import './css_components/DiaryStatus.css'; // Импортируем CSS для стилизации

// Компонент для отображения каждого значения внутри блока рейса
const FlightDetail = ({ label, value }) => (
    <p>
        <strong>{label}: </strong> {value}
    </p>
);

const DiaryStatus = () => {
    const [airportId, setAirportId] = useState('');
    const [id, setId] = useState('');
    const [diaryData, setDiaryData] = useState(null);
    const [error, setError] = useState(null);

    const handleAirportIdChange = (e) => {
        setAirportId(e.target.value);
    };

    const handleIdChange = (e) => {
        setId(e.target.value);
    };

    const handleFetchDiaryStatus = async () => {
        try {
            const response = await axios.get(`/diary/${airportId}?query=${id}`);
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
                            {flight.flight.aircraft && (
                                <>
                                    <FlightDetail label="Flight ID" value={flight.flight.identification.id} />
                                    <FlightDetail label="Status" value={flight.flight.status.text} />
                                    <FlightDetail label="Aircraft Model" value={flight.flight.aircraft.model.text} />
                                    <FlightDetail label="Callsign" value={flight.flight.identification.callsign} />
                                    <FlightDetail label="Airline" value={flight.flight.airline.name} />
                                    <FlightDetail label="Airport arrival" value={flight.flight.airport.origin.name} />
                                    <FlightDetail label="Airport destination" value={flight.flight.airport.destination.name} />
                                    <FlightDetail label="Aircraft Registration" value={flight.flight.aircraft.registration} />
                                </>
                            )}
                        </div>
                    </div>
                ))}
            </div>
        );
    };

    return (
        <div>
            <h2>Airport Diary</h2>
            <label className='custom-label'>
                Airport IATA:
                <input className="custom-input" type="text" value={airportId} onChange={handleAirportIdChange} />
            </label>
            <label className='custom-label'>
                Arrivals/Departures:
                <input className="custom-input" type="text" value={id} onChange={handleIdChange} />
            </label>
            <button className="custom-button" onClick={handleFetchDiaryStatus}>Fetch Airport's Diary</button>
            {error && <div>{error}</div>}
            {renderDiaryData()}
        </div>
    );
}

export default DiaryStatus;
