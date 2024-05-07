from sqlalchemy import create_engine
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

DATABASE_URL = ""

engine = create_engine(DATABASE_URL)

Base = declarative_base()

SessonLocal = sessionmaker(bing=engine, expire_on_commit=False)

