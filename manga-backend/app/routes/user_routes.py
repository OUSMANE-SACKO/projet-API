from flask import Blueprint, request, jsonify
from flask_jwt_extended import jwt_required, create_access_token
from ..models.user_models import User

user_bp = Blueprint("user_bp", __name__)

@user_bp.route('/register', methods=['POST'])
def register():
    """
    Register a new user.
    """
    data = request.get_json()
    required_fields = ["username", "email", "password"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        user = User.create_user(data["username"], data["email"], data["password"])
        return jsonify({"message": "User registered successfully!", "user": user}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400

@user_bp.route('/login', methods=['POST'])
def login():
    """
    Authenticate and log in a user.
    """
    data = request.get_json()
    required_fields = ["email", "password"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        user = User.authenticate_user(data["email"], data["password"])
        token = User.generate_token(user["_id"])
        return jsonify({"message": "Login successful!", "token": token, "user": user}), 200
    except ValueError as e:
        return jsonify({"error": str(e)}), 401
