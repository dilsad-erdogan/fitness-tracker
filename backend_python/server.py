from flask import Flask
from db import connect_db
from models.user import User
from controllers.user import user_bp, initialize_user_model

app = Flask(__name__)

# Connect to the database
db = connect_db()

# Initialize User model
user_model = User(db)

# Register Blueprint and initialize user model
app.register_blueprint(user_bp, url_prefix='/user')
initialize_user_model(user_model)

@app.route('/')
def home():
    return "Welcome to the Fitness Tracker API!"

if __name__ == '__main__':
    app.run(debug=True)