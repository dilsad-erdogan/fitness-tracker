import os
from pymongo import MongoClient
from dotenv import load_dotenv

load_dotenv()

MONGODB_URI = os.getenv('MONGODB_URI')

def connect_db():
    try:
        client = MongoClient(MONGODB_URI, serverSelectionTimeoutMS=5000)
        db = client.get_database()
        print("Successfully to db.")
        return db
    except Exception as error:
        print(f"Error connecting to the database: {error}")
        raise error