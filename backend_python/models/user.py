from bson import ObjectId

class User:
    def __init__(self, db):
        self.collection = db['users']

    def get_all_users(self):
        try:
            users = list(self.collection.find({}))
            print("Users fetched from db:", users)  # Hata ayıklama çıktısı
            for user in users:
                user['_id'] = str(user['_id'])  # ObjectId'yi stringe çevir
            return users
        except Exception as e:
            print("Error fetching users:", str(e))
            return []

    def add_user(self, name, email, password):
        try:
            user = {
                "u_name": name,
                "u_email": email,
                "u_password": password
            }
            self.collection.insert_one(user)
        except Exception as e:
            raise e

    def update_name(self, user_id, new_name):
        try:
            self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"name": new_name}})
        except Exception as e:
            raise e

    def update_email(self, user_id, new_email):
        try:
            self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"email": new_email}})
        except Exception as e:
            raise e

    def update_password(self, user_id, new_password):
        try:
            self.collection.update_one({"_id": ObjectId(user_id)}, {"$set": {"password": new_password}})
        except Exception as e:
            raise e

    def delete_user(self, user_id):
        try:
            self.collection.delete_one({"_id": ObjectId(user_id)})
        except Exception as e:
            raise e
