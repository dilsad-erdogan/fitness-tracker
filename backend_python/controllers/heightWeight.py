from flask import Blueprint, request, jsonify
from models.heightWeight import Heightweight

hw_bp = Blueprint('hw', __name__)
hw_model = None

@hw_bp.route('/get', methods=['GET'])
def get_hw():
    try:
        hw = hw_model.get_all_hw()
        print("Hw in get_all_hw route:", hw)
        return jsonify(success=True, data=hw), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@hw_bp.route('/add', methods=['POST'])
def add_hw():
    data = request.get_json()
    try:
        hw_model.add_hw(data['hw_uid'], data['height'], data['weight'])
        return jsonify(success=True, message="Hw added successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500
    
@hw_bp.route('/updateHeight/<id>', methods=['PUT'])
def update_height(id):
    data = request.get_json()
    try:
        hw_model.update_height(id, data['height'])
        return jsonify(success=True, message="Height updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500
    
@hw_bp.route('/updateWeight/<id>', methods=['PUT'])
def update_weight(id):
    data = request.get_json()
    try:
        hw_model.update_weight(id, data['weight'])
        return jsonify(success=True, message="Weight updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500
    
@hw_bp.route('/delete/<id>', methods=['PATCH'])
def delete_hw(id):
    try:
        hw_model.delete_hw(id)
        return jsonify(success=True, message="Hw deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500
    
def initialize_hw_model(model):
    global hw_model
    hw_model = model