from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
from db import connect_db
import os

# Environment variables
load_dotenv()

# Improved error handling for connetion attempts
try:
    mongo_uri = os.getenv("MONGODB_URI")
    if not mongo_uri:
        raise ValueError("MONGODB_URI environment variable is missing!")
    
    client = MongoClient(mongo_uri)
    db = client[os.getenv("DB_NAME")]
    print("Successfully connected to MongoDB")
except (ValueError, pymongo.errors.ConnectionError) as e:
    print(f"Error connecting to MongoDB: {e}")
    exit(1)

app = Flask(__name__)
db = connect_db()
CORS(app)

# Routes
from controllers.user import user_bp
app.register_blueprint(user_bp, url_prefix='/user')

@app.route('/')
def home():
    return "Homepage", 200

if __name__ == "__main__":
    app.run(port=os.getenv("PORT") or 3000)