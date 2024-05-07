import React from 'react';
import logo from './logo.svg';
import './App.css';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import FlightStatus from './components/FlightStatus';
import WeatherStatus from './components/WeatherStatus';
import AirportStatus from './components/AirportStatus';
import AirlineStatus from './components/AirlineStatus';
import DiaryStatus from './components/DiaryStatus';
import DiariesStatus from './components/DiariesStatus';
import Home from './components/Home';

function App() {
  return (
    <Router>
      <div className="App">
        <header className="App-header">
          <Link to="/" className="navbar-brand">
            Air Tracking
          </Link>
          <ul className="navbar-links">
            <li>
              <Link to="/flight-status" className="navbar-link">
                Flight Status
              </Link>
            </li>
            <li>
              <Link to="/weather-status" className="navbar-link">
                Weather Status
              </Link>
            </li>
            <li>
              <Link to="/airport-status" className="navbar-link">
                Airport Status
              </Link>
            </li>
            <li>
              <Link to="/airline-info" className="navbar-link">
                Airline Info
              </Link>
            </li>
            <li>
              <Link to="/diary" className="navbar-link">
                Diary
              </Link>
            </li>
            <li>
              <Link to="/diaries" className="navbar-link">
                Diaries
              </Link>
            </li>
          </ul>
        </header>
        <Routes>
          <Route path="/" element={<Home />} /> {/* Добавляем маршрут для домашней страницы */}
          <Route path="/flight-status" element={<FlightStatus />} />
          <Route path="/weather-status" element={<WeatherStatus />} />
          <Route path="/airport-status" element={<AirportStatus />} />
          <Route path="/airline-info" element={<AirlineStatus />} />
          <Route path="/diary" element={<DiaryStatus />} />
          <Route path="/diaries" element={<DiariesStatus />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
