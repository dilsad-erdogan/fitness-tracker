from bson import ObjectId

class HeightWeight:
    def __init__(self, db):
        self.collection = db['heightweight']

    def get_all_hw(self):
        try:
            hws = list(self.collection.find({}))
            print("HW fetched from db:", hws)
            for hw in hws:
                hw['_id'] = str(hw['_id'])
            return hws
        except Exception as e:
            print("Error fetching hw:", str(e))
            return []
        
    def add_hw(self, userId, height, weight):
        try:
            hw = {
                "hw_uid": userId,
                "height": height,
                "weight": weight,
                "date_time": "today",
                "is_active": True
            }
            self.collection.insert_one(hw)
        except Exception as e:
            raise e
        
    def update_height(self, hw_id, new_height):
        try:
            self.collection.update_one({"_id": ObjectId(hw_id)}, {"$set": {"height": new_height}})
        except Exception as e:
            raise e
        
    def update_weight(self, hw_id, new_weight):
        try:
            self.collection.update_one({"_id": ObjectId(hw_id)}, {"$set": {"weight": new_weight}})
        except Exception as e:
            raise e
    
    def delete_hw(self, hw_id):
        try:
            self.collection.delete_one({"_id": ObjectId(hw_id)})
        except Exception as e:
            raise e