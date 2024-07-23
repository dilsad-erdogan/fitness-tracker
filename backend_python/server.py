from flask import Flask
from db import connect_db

from models.user import User
from models.heightWeight import HeightWeight
from models.movement import Movement
from models.movementTitle import MovementTitle
from models.program import Program
from models.set import Set

from controllers.user import user_bp, initialize_user_model
from controllers.heightWeight import hw_bp, initialize_hw_model
from controllers.movement import m_bp, initialize_movement_model
from controllers.movementTitle import mt_bp, initialize_title_model
from controllers.program import p_bp, initialize_program_model
from controllers.set import s_bp, initialize_set_model

app = Flask(__name__)
db = connect_db()

# Initialize User model
user_model = User(db)
hw_model = HeightWeight(db)
movement_model = Movement(db)
title_model = MovementTitle(db)
program_model = Program(db)
set_model = Set(db)

# Register Blueprint and initialize user model
app.register_blueprint(user_bp, url_prefix='/user')
initialize_user_model(user_model)
app.register_blueprint(hw_bp, url_prefix='/heightWeight')
initialize_hw_model(hw_model)
app.register_blueprint(m_bp, url_prefix='/movement')
initialize_movement_model(movement_model)
app.register_blueprint(mt_bp, url_prefix='/movementTitle')
initialize_title_model(title_model)
app.register_blueprint(p_bp, url_prefix='/program')
initialize_program_model(program_model)
app.register_blueprint(s_bp, url_prefix='/set')
initialize_set_model(set_model)

@app.route('/')
def home():
    return "Welcome to the Fitness Tracker API!"

if __name__ == '__main__':
    app.run(debug=True)