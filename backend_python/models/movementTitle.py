from bson import ObjectId

class MovementTitle:
    def __init__(self, db):
        self.collection = db['movementTitle']
    
    def get_all_title(self):
        try:
            titles = list(self.collection.find({}))
            print("Movement title fetched from db:", titles)
            for title in titles:
                title['_id'] = str(title['_id'])
            return titles
        except Exception as e:
            print("Error fetching movement:", str(e))
            return []
    
    def add_title(self, t_name):
        try:
            title = {
                "t_name": t_name,
                "date_time": "today",
                "is_active": True
            }
            self.collection.insert_one(title)
        except Exception as e:
            raise e
    
    def update_title(self, mt_id, t_name):
        try:
            self.collection.update_one({"_id": ObjectId(mt_id)}, {"$set": {"t_name": t_name}})
        except Exception as e:
            raise e
    
    def delete_title(self, mt_id):
        try:
            self.collection.delete_one({"_id": ObjectId(mt_id)})
        except Exception as e:
            raise e