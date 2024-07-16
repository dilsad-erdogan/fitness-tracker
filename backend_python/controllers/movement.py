from flask import Blueprint, request, jsonify
from models.movement import Movement

m_bp = Blueprint('m', __name__)
m_model = None

@m_bp.route('/get', methods=['GET'])
def get_m():
    try:
        m = m_model.get_all_movement()
        print("M in get_all_movement route:", m)
        return jsonify(success=True, data=m), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@m_bp.route('/add', methods=['POST'])
def add_m():
    data = request.get_json()
    try:
        m_model.add_movement(data['m_tid'], data['m_name'], data['m_description'], data['m_photo'], data['m_video'])
        return jsonify(success=True, message="M added successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@m_bp.route('/updateDescription/<id>', methods=['PUT'])
def update_description(id):
    data = request.get_json()
    try:
        m_model.update_description(id, data['m_description'])
        return jsonify(success=True, message="Description updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@m_bp.route('/updatePhoto/<id>', methods=['PUT'])
def update_photo(id):
    data = request.get_json()
    try:
        m_model.update_photo(id, data['m_photo'])
        return jsonify(success=True, message="Photo updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@m_bp.route('/updateVideo/<id>', methods=['PUT'])
def update_video(id):
    data = request.get_json()
    try:
        m_model.update_video(id, data['m_video'])
        return jsonify(success=True, message="Video updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@m_bp.route('/delete/<id>', methods=['PATCH'])
def delete_m(id):
    try:
        m_model.delete_movement(id)
        return jsonify(success=True, message="Movement deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, messafe=str(e)), 500

def initialize_movement_model(model):
    global m_model
    m_model = model