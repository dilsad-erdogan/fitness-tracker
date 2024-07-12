from pymongo import MongoClient

def connect_db():
    try:
        client = MongoClient('mongodb+srv://dilsadrukiyeerdogan:WT2w2UbjUVwZszG1@fitnesstracking.ivawxw1.mongodb.net/')
        db = client['test']
        print("Successfully connected to db.")
        return db
    except Exception as e:
        print("Error connecting to db:", str(e))
        return None