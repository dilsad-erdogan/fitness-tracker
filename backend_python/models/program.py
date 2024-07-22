from bson import ObjectId

class Program:
    def __init__(self, db):
        self.collection = db['program']
    
    def get_all_program(self):
        try:
            programs = list(self.collection.find({}))
            print("Program fetched from db:", programs)
            for program in programs:
                program['_id'] = str(program['_id'])
            return programs
        except Exception as e:
            print("Error fetching program:", str(e))
            return []
    
    def add_program(self, p_name, p_description, duration, time):
        try:
            program = {
                "p_name": p_name,
                "p_description": p_description,
                "duration": duration,
                "time": time,
                "date_time": "today",
                "is_active": True
            }
            self.collection.insert_one(program)
        except Exception as e:
            raise e
    
    def update_name(self, p_id, p_name):
        try:
            self.collection.update_one({"_id": ObjectId(p_id)}, {"$set": {"p_name": p_name}})
        except Exception as e:
            raise e

    def update_description(self, p_id, p_description):
        try:
            self.collection.update_one({"_id": ObjectId(p_id)}, {"$set": {"p_description": p_description}})
        except Exception as e:
            raise e

    def update_duration(self, p_id, duration):
        try:
            self.collection.update_one({"_id": ObjectId(p_id)}, {"$set": {"duration": duration}})
        except Exception as e:
            raise e

    def update_time(self, p_id, time):
        try:
            self.collection.update_one({"_id": ObjectId(p_id)}, {"$set": {"time": time}})
        except Exception as e:
            raise e
    
    def delete_program(self, p_id):
        try:
            self.collection.delete_one({"_id": ObjectId(p_id)})
        except Exception as e:
            raise e