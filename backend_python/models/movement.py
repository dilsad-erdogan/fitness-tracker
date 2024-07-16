from bson import ObjectId

class Movement:
    def __init__(self, db):
        self.collection = db['movement']
    
    def get_all_movement(self):
        try:
            movements = list(self.collection.find({}))
            print("Movement fetched from db:", movements)
            for movement in movements:
                movement['_id'] = str(movement['_id'])
            return movements
        except Exception as e:
            print("Error fetching movement:", str(e))
            return []
        
    def add_movement(self, m_tid, m_name, m_description, m_photo, m_video):
        try:
            movement = {
                "m_tid": m_tid,
                "m_name": m_name,
                "m_description": m_description,
                "m_photo": m_photo,
                "m_video": m_video,
                "date_time": "today",
                "is_active": True
            }
            self.collection.insert_one(movement)
        except Exception as e:
            raise e
    
    def update_description(self, m_id, new_description):
        try:
            self.collection.update_one({"_id": ObjectId(m_id)}, {"$set": {"m_description": new_description}})
        except Exception as e:
            raise e
    
    def update_photo(self, m_id, new_photo):
        try:
            self.collection.update_one({"_id": ObjectId(m_id)}, {"$set": {"m_photo": new_photo}})
        except Exception as e:
            raise e
    
    def update_video(self, m_id, new_video):
        try:
            self.collection.update_one({"_id": ObjectId[m_id]}, {"$set": {"m_video": new_video}})
        except Exception as e:
            raise e
    
    def delete_movement(self, m_id):
        try:
            self.collection.delete_one({"_id": ObjectId(m_id)})
        except Exception as e:
            raise e