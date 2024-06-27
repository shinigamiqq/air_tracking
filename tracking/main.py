from fastapi import APIRouter
from fastapi.middleware.cors import CORSMiddleware
from redis_om import get_redis_connection
from FlightRadar24 import FlightRadar24API
import folium
import os
from fastapi.responses import JSONResponse
from fastapi.staticfiles import StaticFiles

fr_api = FlightRadar24API()
app = APIRouter()

#app.mount("/static", StaticFiles(directory="frontend/public/static"), name="static")

redis = get_redis_connection(
    # Ваши настройки Redis
)

def flight_to_dict(flight):
    return {
        "latitude": flight.latitude,
        "longitude": flight.longitude,
        "id": flight.id,
        "icao_24bit": flight.icao_24bit,
        "heading": flight.heading,
        "altitude": flight.altitude,
        "ground_speed": flight.ground_speed,
        "squawk": flight.squawk,
        "aircraft_code": flight.aircraft_code,
        "registration": flight.registration,
        "time": flight.time,
        "origin_airport_iata": flight.origin_airport_iata,
        "destination_airport_iata": flight.destination_airport_iata,
        "number": flight.number,
        "airline_iata": flight.airline_iata,
        "on_ground": flight.on_ground,
        "vertical_speed": flight.vertical_speed,
        "callsign": flight.callsign,
        "airline_icao": flight.airline_icao,
    }

@app.get("/flights/{flight_id}")
async def get_flight_status(flight_id: str, id: str | None = None):
    flights = fr_api.get_flights(flight_id)
    icon = folium.CustomIcon(icon_image="/home/alex_mcqueen2/Desktop/air_tracking/tracking/plane.png", icon_size=(45, 45))
    if id:
        final_id = flight_id + id
        for item in flights:
            if item.callsign == final_id:
                latitude = item.latitude
                longitude = item.longitude
                map = folium.Map(location=[latitude, longitude], zoom_start=9)
                folium.Marker([latitude, longitude], tooltip=item.callsign, icon=icon).add_to(map)
                
                # Сохраняем карту
                map_path = f"/home/alex_mcqueen2/Desktop/{flight_id}_{id}.html"
                
                os.makedirs(os.path.dirname(map_path), exist_ok=True)
                map.save(map_path)
                
                # Преобразуем объект Flight в словарь и возвращаем его вместе с URL карты
                return JSONResponse(content={
                    "flight_data": flight_to_dict(item),
                    "map_url": f"/{map_path}"
                })

    return JSONResponse(content={"error": "Flight not found"}, status_code=404)
