from flask import Blueprint, request, jsonify
from models.userRole import UserRole

r_bp = Blueprint('r', __name__)
r_model = None

@r_bp.route('/get', methods=['GET'])
def get_role():
    try:
        r = r_model.get_all_role()
        print("Role in get_all_role route:", r)
        return jsonify(success=True, data=r), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@r_bp.route('/add', methods=['POST'])
def add_role():
    data = request.get_json()
    try:
        r_model.add_role(data['r_name'])
        return jsonify(success=True, message="Role added successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@r_bp.route('/updateRole/<id>', methods=['PUT'])
def update_role(id):
    data = request.get_json()
    try:
        r_model.update_role(id, data['r_name'])
        return jsonify(success=True, message="Role updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@r_bp.route('/delete/<id>', methods=['PATCH'])
def delete_role(id):
    try:
        r_model.delete_role(id)
        return jsonify(success=True, message="Role deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

def initialize_role_model(model):
    global r_model
    r_model = model