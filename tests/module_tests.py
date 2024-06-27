from fastapi import FastAPI
from fastapi.testclient import TestClient
from main_router import app
import pytest
from contextlib import nullcontext
import unittest.mock as mock
import tracking.main as tracking
import anyio

client = TestClient(app=app)

@pytest.mark.parametrize(
        "airline_name, expected_response",
        [
            ("Aeroflot", {
                "Name": "Aeroflot",
                "Code": "SU",
                "ICAO": "AFL"
            }),
            ("British Airways", {
                "Name": "British Airways",
                "Code": "BA",
                "ICAO": "BAW"
            }),
            ("Zhikh Airlines", {
                "msg": "Null"
            })

        ]
)
def test_airlines(airline_name, expected_response):
    response = client.get(f"/airlines/{airline_name}")
    assert response.status_code == 200
    assert response.json() == expected_response

@pytest.mark.parametrize(
        "airport_id, expected_response, expectation",
        [
            ("SVO", {
                "latitude": 55.972641,
                "longitude": 37.414581,
                "altitude": 622,
                "name": "Moscow Sheremetyevo International Airport",
                "icao": "UUEE",
                "iata": "SVO",
                "country": "Russia",
                "country_code": "RU",
                "city": "Moscow",
                "timezone_name": "Europe/Moscow",
                "timezone_offset": 10800,
                "timezone_offset_hours": "3:00",
                "timezone_abbr": "MSK",
                "timezone_abbr_name": "Moscow Standard Time",
                "visible": True,
                "website": "http://www.svo.aero/en/"
            }, nullcontext),
            ("LED", {
                "latitude": 59.800289,
                "longitude": 30.262501,
                "altitude": 78,
                "name": "St. Petersburg Pulkovo Airport",
                "icao": "ULLI",
                "iata": "LED",
                "country": "Russia",
                "country_code": "RU",
                "city": "St. Petersburg",
                "timezone_name": "Europe/Moscow",
                "timezone_offset": 10800,
                "timezone_offset_hours": "3:00",
                "timezone_abbr": "MSK",
                "timezone_abbr_name": "Moscow Standard Time",
                "visible": True,
                "website": "http://www.pulkovoairport.ru/eng/"
            }, nullcontext),
            ("VVO", {
                "latitude": 43.398949,
                "longitude": 132.147995,
                "altitude": 46,
                "name": "Vladivostok International Airport",
                "icao": "UHWW",
                "iata": "VVO",
                "country": "Russia",
                "country_code": "RUS",
                "city": "Vladivostok",
                "timezone_name": "Asia/Vladivostok",
                "timezone_offset": 36000,
                "timezone_offset_hours": "10:00",
                "timezone_abbr": "+10",
                "timezone_abbr_name": "",
                "visible": True,
                "website": "http://vvo.aero/en/index.html"
            }, nullcontext),
            #("ZXC", {"some_msg:" "msg"}, pytest.raises(ValueError))
        ]
)
def test_airports(airport_id, expected_response, expectation):
    response = client.get(f"/airports/{airport_id}")
    with expectation():
        assert response.status_code == 200
        assert response.json() == expected_response


@pytest.mark.parametrize("flight_id, id, expectation_response",
                         [
                            # ("AFL", "1308", {
                            #    "flight_data": {
                            #        "id": "35d0887a",
                            #        "icao_24bit": "151D93",
                            #        "aircraft_code": "B738",
                            #        "registration": "RA-73107",
                            #        "origin_airport_iata": "SVO",
                            #        "destination_airport_iata": "MRV",
                            #        "number": "SU1308",
                            #        "airline_iata": "SU",
                            #        "callsign": "AFL1308",
                            #        "airline_icao": "AFL"
                            #    },
                            #    "map_url": "//home/alex_mcqueen2/Desktop/AFL_1308.html"
                            #}),
                            ("VIR", "73Q", {
                                "flight_data": {
                                    "id": "35d0b846",
                                    "icao_24bit": "4079CC",
                                    "aircraft_code": "A35K",
                                    "registration": "G-VLIB",
                                    "origin_airport_iata": "MAN",
                                    "destination_airport_iata": "MCO",
                                    "number": "VS73",
                                    "airline_iata": "VS",
                                    "callsign": "VIR73Q",
                                    "airline_icao": "VIR"
                                },
                                "map_url": "//home/alex_mcqueen2/Desktop/VIR_73Q.html"
                            })
                         ])
def test_flights(flight_id, id, expectation_response):
    
    response = client.get(f"/flights/{flight_id}?id={id}")
    assert response.status_code == 200
    assert response.json().get("flight_data").get("origin_airport_iata") == expectation_response["flight_data"]["origin_airport_iata"]
    assert response.json().get("flight_data").get("destination_airport_iata") == expectation_response["flight_data"]["destination_airport_iata"]
    assert response.json().get("flight_data").get("number") == expectation_response["flight_data"]["number"]
    assert response.json().get("flight_data").get("airline_iata") == expectation_response["flight_data"]["airline_iata"]
    assert response.json().get("flight_data").get("callsign") == expectation_response["flight_data"]["callsign"]
    assert response.json().get("flight_data").get("airline_icao") == expectation_response["flight_data"]["airline_icao"]
    assert response.json().get("flight_data").get("id") == expectation_response["flight_data"]["id"]
    assert response.json().get("flight_data").get("icao_24bit") == expectation_response["flight_data"]["icao_24bit"]
    assert response.json().get("flight_data").get("aircraft_code") == expectation_response["flight_data"]["aircraft_code"]
    assert response.json().get("flight_data").get("registration") == expectation_response["flight_data"]["registration"]
    assert response.json().get("map_url") == expectation_response["map_url"]