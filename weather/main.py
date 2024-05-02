from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection
from FlightRadar24 import FlightRadar24API
import requests

fr_api = FlightRadar24API()
app = APIRouter()


redis = get_redis_connection (
)

@app.get("/weather_airports/{airport_id}")
async def get_weaher_airport_status(airport_id: str):
    airport_status=fr_api.get_airport_details(airport_id)
    return airport_status["airport"]["pluginData"]["weather"]