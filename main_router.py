from fastapi import FastAPI
from airports.main import app as airports_app
from tracking.main import app as tracking_app
from weather.main import app as weather_app
from diary.main import app as diary_app
from diary_airports.main import app as diary_airports_app
from airlines.main import app as airlines_app
#from download_page.main import app as download_app
#from auth_not_working_yet.main import app as reg_app

app = FastAPI()

app.include_router(airports_app)
app.include_router(tracking_app)
app.include_router(weather_app)
app.include_router(diary_app)
app.include_router(diary_airports_app)
app.include_router(airlines_app)
#app.include_router(download_app)
#app.include_router(reg_app)