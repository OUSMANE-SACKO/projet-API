from flask import Blueprint, request, jsonify
from app.models import User

user_bp = Blueprint("users", __name__)

@user_bp.route("/create", methods=["POST"])
def create_user():
    data = request.json
    try:
        user = User.create_user(
            email=data.get("email"),
            date_naissance=data.get("date_naissance"),
            password=data.get("password"),
            role=data.get("role", "user")
        )
        return jsonify({"message": "User created successfully", "user": user}), 201
    except ValueError as e:
        return jsonify({"error": str(e)}), 400