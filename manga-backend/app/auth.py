from flask import Blueprint, request, jsonify
import jwt
import datetime
from config import Config
from app.models import create_user, find_user_by_email, bcrypt

auth = Blueprint("auth", __name__)

@auth.route("/register", methods=["POST"])
def register():
    data = request.get_json()
    username = data.get("username")
    email = data.get("email")
    password = data.get("password")

    if find_user_by_email(email):
        return jsonify({"message": "Email déjà utilisé"}), 400

    user = create_user(username, email, password)
    return jsonify({"message": "Utilisateur créé avec succès"}), 201

@auth.route("/login", methods=["POST"])
def login():
    data = request.get_json()
    email = data.get("email")
    password = data.get("password")

    user = find_user_by_email(email)
    if not user or not bcrypt.check_password_hash(user["password"], password):
        return jsonify({"message": "Identifiants invalides"}), 401

    token = jwt.encode(
        {"email": user["email"], "exp": datetime.datetime.utcnow() + datetime.timedelta(hours=1)},
        Config.SECRET_KEY,
        algorithm="HS256",
    )

    return jsonify({"token": token}), 200
