from werkzeug.security import generate_password_hash, check_password_hash
from bson.objectid import ObjectId
import jwt
from datetime import datetime, timedelta
from config import Config
from app import mongo  # Import MongoDB instance from init.py

class User:
    """
    User model for managing users in the database.
    """

    @staticmethod
    def create_user(email, date_naissance, password, role="user"):
        """
        Create a new user in the database.
        """
        if not email or not date_naissance or not password:
            raise ValueError("All fields (email, date_naissance, password) are required.")

        if role not in ["user", "admin"]:
            raise ValueError("Role must be 'user' or 'admin'.")

        hashed_password = generate_password_hash(password)  # Hash password before storing

        user = {
            "email": email,
            "date_naissance": date_naissance,
            "password": hashed_password,
            "etat": "actif",  # Default status
            "role": role,  # User role
            "created_at": datetime.utcnow()
        }

        # Insert into MongoDB
        result = mongo.db.users.insert_one(user)
        user["_id"] = str(result.inserted_id)  # Convert ObjectId to string

        return user

    @staticmethod
    def get_user_by_email(email):
        """
        Retrieve a user from the database by email.
        """
        user = mongo.db.users.find_one({"email": email})
        if user:
            user["_id"] = str(user["_id"])  # Convert ObjectId to string
        return user

    @staticmethod
    def verify_password(email, password):
        """
        Check if a given password matches the stored hash for a user.
        """
        user = User.get_user_by_email(email)
        if user and check_password_hash(user["password"], password):
            return user
        return None