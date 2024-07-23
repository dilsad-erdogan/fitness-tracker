from flask import Blueprint, request, jsonify
from models.set import Set

s_bp = Blueprint('s', __name__)
s_model = None

@s_bp.route('/get', methods=['GET'])
def get_set():
    try:
        s = s_model.get_all_set()
        print("S in get_all_set route:", s)
        return jsonify(success=True, data=s), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@s_bp.route('/add', methods=['POST'])
def add_set():
    data = request.get_json()
    try:
        s_model.add_set(data['s_pid'], data['s_mid'])
        return jsonify(success=True, message="S added successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@s_bp.route('/delete/<id>', methods=['PATCH'])
def delete_set(id):
    try:
        s_model.delete_set(id)
        return jsonify(success=True, message="Set deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

def initialize_set_model(model):
    global s_model
    s_model = model