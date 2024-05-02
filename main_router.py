from fastapi import FastAPI
from airports.main import app as airports_app
from tracking.main import app as tracking_app
from weather.main import app as weather_app
from diary.main import app as diary_app
from diary_airports.main import app as diary_airports_app
from airlines.main import app as airlines_app

app = FastAPI()

app.include_router(airports_app)
app.include_router(tracking_app)
app.include_router(weather_app)
app.include_router(diary_app)
app.include_router(diary_airports_app)
app.include_router(airlines_app)
