from flask import Flask
from db import connect_db

from models.user import User
from models.heightWeight import HeightWeight
from models.movement import Movement
from models.movementTitle import MovementTitle

from controllers.user import user_bp, initialize_user_model
from controllers.heightWeight import hw_bp, initialize_hw_model
from controllers.movement import m_bp, initialize_movement_model
from controllers.movementTitle import mt_bp, initialize_title_model

app = Flask(__name__)
db = connect_db()

# Initialize User model
user_model = User(db)
hw_model = HeightWeight(db)
movement_model = Movement(db)
title_model = MovementTitle(db)

# Register Blueprint and initialize user model
app.register_blueprint(user_bp, url_prefix='/user')
initialize_user_model(user_model)
app.register_blueprint(hw_bp, url_prefix='/heightWeight')
initialize_hw_model(hw_model)
app.register_blueprint(m_bp, url_prefix='/movement')
initialize_movement_model(movement_model)
app.register_blueprint(mt_bp, url_prefix='/movementTitle')
initialize_title_model(title_model)

@app.route('/')
def home():
    return "Welcome to the Fitness Tracker API!"

if __name__ == '__main__':
    app.run(debug=True)