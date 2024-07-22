from flask import Blueprint, request, jsonify
from models.program import Program

p_bp = Blueprint('p', __name__)
p_model = None

@p_bp.route('/get', methods=['GET'])
def  get_p():
    try:
        p = p_model.get_all_program()
        print("P in get_all_program route:", p)
        return jsonify(success=True, data=p), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@p_bp.route('/add', methods=['POST'])
def add_p():
    data = request.get_json()
    try:
        p_model.add_program(data['p_name'], data['p_description'], data['duration'], data['time'])
        return jsonify(success=True, message="P added successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@p_bp.route('/updateName/<id>', methods=['PUT'])
def update_name(id):
    data = request.get_json()
    try:
        p_model.update_name(id, data['p_name'])
        return jsonify(success=True, message="Name updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@p_bp.route('/updateDescription/<id>', methods=['PUT'])
def update_description(id):
    data = request.get_json()
    try:
        p_model.update_description(id, data['p_description'])
        return jsonify(success=True, message="Description updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@p_bp.route('/updateDuration/<id>', methods=['PUT'])
def update_duration(id):
    data = request.get_json()
    try:
        p_model.update_duration(id, data['duration'])
        return jsonify(success=True, message="Duration updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@p_bp.route('/updateTime/<id>', methods=['PUT'])
def update_time(id):
    data = request.get_json()
    try:
        p_model.update_time(id, data['time'])
        return jsonify(success=True, message="Time updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@p_bp.route('/delete/<id>', methods=['PATCH'])
def delete_program(id):
    try:
        p_model.delete_program(id)
        return jsonify(success=True, message="Program deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

def initialize_program_model(model):
    global p_model
    p_model = model