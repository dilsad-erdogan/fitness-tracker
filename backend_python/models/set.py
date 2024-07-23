from bson import ObjectId

class Set:
    def __init__(self, db):
        self.collection = db['set']
    
    def get_all_set(self):
        try:
            sets = list(self.collection.find({}))
            print("Set fetched from db:", sets)
            for set in sets:
                set['_id'] = str(set['_id'])
            return sets
        except Exception as e:
            print("Error fetching set:", str(e))
            return []
    
    def add_set(self, s_pid, s_mid):
        try:
            set = {
                "s_pid": s_pid,
                "s_mid": s_mid,
                "date_time": "today",
                "is_active": True
            }
            self.collection.insert_one(set)
        except Exception as e:
            raise e
    
    def delete_set(self, s_id):
        try:
            self.collection.delete_one({"_id": ObjectId(s_id)})
        except Exception as e:
            raise e