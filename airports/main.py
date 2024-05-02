from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection
from FlightRadar24 import FlightRadar24API
import requests

fr_api = FlightRadar24API()
app = APIRouter()


redis = get_redis_connection (
)

@app.get("/airports/{airport_id}")
async def get_airport_status(airport_id: str):
    airports=fr_api.get_airport(airport_id)
    return airports