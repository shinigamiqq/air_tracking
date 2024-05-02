from fastapi import APIRouter, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection
from FlightRadar24 import FlightRadar24API

fr_api = FlightRadar24API()
app = APIRouter()


redis = get_redis_connection (
)

def get_flights_between_airports(departure_airport: str, arrival_airport: str):
    flights_between_airports = []

    # Получаем информацию о расписании рейсов для каждого аэропорта
    departure_airport_info = fr_api.get_airport_details(departure_airport)
    arrival_airport_info = fr_api.get_airport_details(arrival_airport)
    
    # Получаем расписание вылетов из аэропорта отправления
    departure_flights = departure_airport_info["airport"]["pluginData"]["schedule"]["departures"]["data"]

    # Фильтруем расписание, чтобы оставить только рейсы в аэропорт назначения
    for item in departure_flights:
        if item["flight"]["airport"]["destination"]["code"]["iata"] == arrival_airport:
            flights_between_airports.append(item)
    
    return flights_between_airports

@app.get("/diaries/{departure_airport}/{arrival_airport}")
async def get_flights_between_two_airports(departure_airport: str, arrival_airport: str):
    flights = get_flights_between_airports(departure_airport, arrival_airport)
    return flights