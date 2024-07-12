from flask import Blueprint, request, jsonify
from models.user import User

user_bp = Blueprint('user', __name__)

# Kullanıcı modelini global olarak erişilebilir hale getirelim
user_model = None

@user_bp.route('/add', methods=['POST'])
def add_user():
    data = request.get_json()
    try:
        user_model.add_user(data['u_name'], data['u_email'], data['u_password'])
        return jsonify(success=True, message="User added successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/get', methods=['GET'])
def get_user():
    try:
        users = user_model.get_all_users()
        print("Users in get_user route:", users)  # Hata ayıklama çıktısı
        return jsonify(success=True, data=users), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/updateEmail/<id>', methods=['PUT'])
def update_email(id):
    data = request.get_json()
    try:
        user_model.update_email(id, data['u_email'])
        return jsonify(success=True, message="User email updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/updatePassword/<id>', methods=['PUT'])
def update_password(id):
    data = request.get_json()
    try:
        user_model.update_password(id, data['u_password'])
        return jsonify(success=True, message="User password updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/delete/<id>', methods=['PATCH'])
def delete_user(id):
    try:
        user_model.delete_user(id)
        return jsonify(success=True, message="User deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/byId/<id>', methods=['GET'])
def get_user_by_id(id):
    try:
        user = user_model.get_user_by_id(id)
        return jsonify(success=True, data=user), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

def initialize_user_model(model):
    global user_model
    user_model = model