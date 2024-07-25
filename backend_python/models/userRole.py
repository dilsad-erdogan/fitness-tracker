from bson import ObjectId

class UserRole:
    def __init__(self, db):
        self.collection = db['UserRole']
    
    def get_all_role(self):
        try:
            roles = list(self.collection.find({}))
            print("User role fetched from db:", roles)
            for role in roles:
                role['_id'] = str(role['_id'])
            return roles
        except Exception as e:
            print("Error fetching role:", str(e))
            return []

    def add_role(self, r_name):
        try:
            role = {
                "r_name": r_name,
                "date_time": "today",
                "is_active": True
            }
            self.collection.insert_one(role)
        except Exception as e:
            raise e

    def update_role(self, r_id, r_name):
        try:
            self.collection.update_one({"_id": ObjectId(r_id)}, {"$set": {"r_name": r_name}})
        except Exception as e:
            raise e

    def delete_role(self, r_id):
        try:
            self.collection.delete_one({"_id": ObjectId(r_id)})
        except Exception as e:
            raise e