from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection
from FlightRadar24 import FlightRadar24API

fr_api = FlightRadar24API()
app = APIRouter()


redis = get_redis_connection (
    
)

# Маршруты для пользователей

@app.get("/flights/{flight_id}")
async def get_flight_status(flight_id: str, id: str | None = None):
    flights=fr_api.get_flights(flight_id)
    if id:
        final_id = flight_id + id
        for item in flights:
            if item.callsign == final_id:
                return item 
    return flights
# Другие маршруты...