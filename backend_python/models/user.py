from pymongo import MongoClient
from flask_bcrypt import Bcrypt
from bson.objectid import ObjectId
from dotenv import load_dotenv
import os

load_dotenv()
client = MongoClient(os.getenv("MONGO_URI"))
db = client[os.getenv("DB_NAME")]
bcrypt = Bcrypt()

class User:
    @staticmethod
    def get_all_users():
        users = db.users.find()
        return list(users)

    @staticmethod
    def update_name(user_id, new_name):
        db.users.update_one({'_id': ObjectId(user_id)}, {'$set': {'u_name': new_name}})

    @staticmethod
    def update_email(user_id, new_email):
        db.users.update_one({'_id': ObjectId(user_id)}, {'$set': {'u_email': new_email}})

    @staticmethod
    def update_password(user_id, new_password):
        hashed_password = bcrypt.generate_password_hash(new_password).decode('utf-8')
        db.users.update_one({'_id': ObjectId(user_id)}, {'$set': {'u_password': hashed_password}})

    @staticmethod
    def delete_user(user_id):
        db.users.update_one({'_id': ObjectId(user_id)}, {'$set': {'is_active': False}})

    @staticmethod
    def get_user_by_id(user_id):
        user = db.users.find_one({'_id': ObjectId(user_id), 'is_active': True})
        return user
