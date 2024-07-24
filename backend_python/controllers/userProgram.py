from flask import Blueprint, request, jsonify
from models.userProgram import UserProgram

up_bp = Blueprint('up', __name__)
up_model = None

@up_bp.route('/get', methods=['GET'])
def get_up():
    try:
        up = up_model.get_all_up()
        print("Up in get_all_up route:", up)
        return jsonify(success=True, data=up), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@up_bp.route('/add', methods=['POST'])
def add_up():
    data = request.get_json()
    try:
        up_model.add_up(data['up_uid'], data['up_name'], data['up_description'], data['duration'], data['time'])
        return jsonify(success=True, message="Up added successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@up_bp.route('/updateName/<id>', methods=['PUT'])
def update_name(id):
    data = request.get_json()
    try:
        up_model.update_name(id, data['up_name'])
        return jsonify(success=True, message="Name updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@up_bp.route('/updateDescription/<id>', methods=['PUT'])
def update_description(id):
    data = request.get_json()
    try:
        up_model.update_description(id, data['up_description']), 200
        return jsonify(success=True, message="Description updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@up_bp.route('/updateDuration/<id>', methods=['PUT'])
def update_duration(id):
    data = request.get_json()
    try:
        up_model.update_duration(id, data['duration']), 200
        return jsonify(success=True, message="Duration updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@up_bp.route('/updateTime/<id>', methods=['PUT'])
def update_time(id):
    data = request.get_json()
    try:
        up_model.update_time(id, data['time']), 200
        return jsonify(success=True, message="Time updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@up_bp.route('/delete/<id>', methods=['PATCH'])
def delete_up(id):
    try:
        up_model.delete_up(id)
        return jsonify(success=True, message="Up deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

def initialize_userProgram_model(model):
    global up_model
    up_model = model