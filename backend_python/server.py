from flask import Flask, request, jsonify
from flask_cors import CORS
from pymongo import MongoClient
from dotenv import load_dotenv
import os

# Environment variables
load_dotenv()

# Database connection
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]

app = Flask(__name__)
CORS(app)

# Routes
from controllers.user import user_bp
app.register_blueprint(user_bp, url_prefix='/user')

@app.route('/')
def home():
    return "Homepage", 200

if __name__ == "__main__":
    app.run(port=os.getenv("PORT") or 3000)