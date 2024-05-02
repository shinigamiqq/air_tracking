from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection
from FlightRadar24 import FlightRadar24API

fr_api = FlightRadar24API()
app = APIRouter()

redis = get_redis_connection (
)

@app.get("/diary/{airport_id}")
async def get_diary(airport_id: str, query: str | None = None):
    diary = fr_api.get_airport_details(airport_id)
    if query == "arrivals":
        return diary["airport"]["pluginData"]["schedule"]["arrivals"]["data"]
    if query == "departures":
        return diary["airport"]["pluginData"]["schedule"]["departures"]["data"]
    
    return diary["airport"]["pluginData"]["schedule"]