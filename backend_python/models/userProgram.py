from bson import ObjectId

class UserProgram:
    def __init__(self, db):
        self.collection = db['userProgram']
    
    def get_all_up(self):
        try:
            ups = list(self.collection.find({}))
            print("Up title fetched from db:", ups)
            for up in ups:
                up['_id'] = str(up['_id'])
            return ups
        except Exception as e:
            print("Error fetching up:", str(e))
            return []
    
    def add_up(self, up_uid, up_name, up_description, duration, time):
        try:
            up = {
                "up_uid": up_uid,
                "up_name": up_name,
                "up_description": up_description,
                "duration": duration,
                "time": time,
                "date_time": "today",
                "is_active": True
            }
            self.collection.insert_one(up)
        except Exception as e:
            raise e
    
    def update_name(self, up_id, up_name):
        try:
            self.collection.update_one({"_id": ObjectId(up_id)}, {"$set": {"up_name": up_name}})
        except Exception as e:
            raise e

    def update_description(self, up_id, up_description):
        try:
            self.collection.update_one({"_id": ObjectId(up_id)}, {"$set": {"up_description": up_description}})
        except Exception as e:
            raise e

    def update_duration(self, up_id, duration):
        try:
            self.collection.update_one({"_id": ObjectId(up_id)}, {"$set": {"duration": duration}})
        except Exception as e:
            raise e
        
    def update_time(self, up_id, time):
        try:
            self.collection.update_one({"_id": ObjectId(up_id)}, {"$set": {"time": time}})
        except Exception as e:
            raise e
    
    def delete_up(self, up_id):
        try:
            self.collection.delete_one({"_id": ObjectId(up_id)})
        except Exception as e:
            raise e