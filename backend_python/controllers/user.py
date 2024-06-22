from flask import Blueprint, request, jsonify
from models.user import User

user_bp = Blueprint('user', __name__)

@user_bp.route('/get', methods=['GET'])
def get_user():
    try:
        users = User.get_all_users()
        return jsonify(success=True, data=users), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/updateName/<id>', methods=['PUT'])
def update_name(id):
    data = request.get_json()
    try:
        User.update_name(id, data['u_name'])
        return jsonify(success=True, message="User name updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/updateEmail/<id>', methods=['PUT'])
def update_email(id):
    data = request.get_json()
    try:
        User.update_email(id, data['u_email'])
        return jsonify(success=True, message="User email updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/updatePassword/<id>', methods=['PUT'])
def update_password(id):
    data = request.get_json()
    try:
        User.update_password(id, data['u_password'])
        return jsonify(success=True, message="User password updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/delete/<id>', methods=['PATCH'])
def delete_user(id):
    try:
        User.delete_user(id)
        return jsonify(success=True, message="User deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@user_bp.route('/byId/<id>', methods=['GET'])
def get_user_by_id(id):
    try:
        user = User.get_user_by_id(id)
        return jsonify(success=True, data=user), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500