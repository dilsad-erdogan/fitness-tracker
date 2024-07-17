from flask import Blueprint, request, jsonify
from models.movementTitle import MovementTitle

mt_bp = Blueprint('mt', __name__)
mt_model = None

@mt_bp.route('/get', methods=['GET'])
def get_mt():
    try:
        mt = mt_model.get_all_title()
        print("MT in get_all_title route:", mt)
        return jsonify(success=True, data=mt), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@mt_bp.route('/add', methods=['POST'])
def add_mt():
    data = request.get_json()
    try:
        mt_model.add_title(data['t_name'])
        return jsonify(success=True, message="Mt added successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@mt_bp.route('/updateTitle/<id>', methods=['PUT'])
def update_title(id):
    data = request.get_json()
    try:
        mt_model.update_title(id, data['t_name'])
        return jsonify(success=True, message="Title updated successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

@mt_bp.route('/delete/<id>', methods=['PATCH'])
def delete_title(id):
    try:
        mt_model.delete_title(id)
        return jsonify(success=True, message="Title deleted successfully"), 200
    except Exception as e:
        return jsonify(success=False, message=str(e)), 500

def initialize_title_model(model):
    global mt_model
    mt_model = model