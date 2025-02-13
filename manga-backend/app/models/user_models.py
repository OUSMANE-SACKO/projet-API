from bson.objectid import ObjectId
from datetime import datetime, timedelta
from werkzeug.security import generate_password_hash, check_password_hash
from flask_jwt_extended import create_access_token
from config import Config

class User:
    mongo = None

    @staticmethod
    def create_user(username, email, password):
        """
        Create a new user in the database.
        """
        if not username or not email or not password:
            raise ValueError("All fields (username, email, password) are required.")

        if User.mongo.db.users.find_one({"email": email}):
            raise ValueError("Email already exists.")

        hashed_password = generate_password_hash(password)

        user = {
            "username": username,
            "email": email,
            "password_hash": hashed_password,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        result = User.mongo.db.users.insert_one(user)
        user["_id"] = str(result.inserted_id)
        return user

    @staticmethod
    def authenticate_user(email, password):
        """
        Authenticate a user using email and password.
        """
        user = User.mongo.db.users.find_one({"email": email})
        if not user or not check_password_hash(user["password_hash"], password):
            raise ValueError("Invalid email or password.")

        user["_id"] = str(user["_id"])
        return user

    @staticmethod
    def generate_token(user_id):
        """
        Generate a JWT token for authentication.
        """
        return create_access_token(
            identity=str(user_id),
            additional_claims={"user_id": str(user_id)}
        )
