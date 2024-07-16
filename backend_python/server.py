from flask import Flask
from db import connect_db
from models.user import User
from models.heightWeight import HeightWeight
from models.movement import Movement
from controllers.user import user_bp, initialize_user_model
from controllers.heightWeight import hw_bp, initialize_hw_model

app = Flask(__name__)
db = connect_db()

# Initialize User model
user_model = User(db)
hw_model = HeightWeight(db)
movement_model = Movement(db)

# Register Blueprint and initialize user model
app.register_blueprint(user_bp, url_prefix='/user')
initialize_user_model(user_model)
app.register_blueprint(hw_bp, url_prefix='/heightWeight')
initialize_hw_model(hw_model)
app.register_blueprint(movement_model, url_prefix='/movement')
initialize_movement_model(movement_model)

@app.route('/')
def home():
    return "Welcome to the Fitness Tracker API!"

if __name__ == '__main__':
    app.run(debug=True)