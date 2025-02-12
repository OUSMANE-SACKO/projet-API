from flask import Flask
from flask_pymongo import PyMongo
from flask_cors import CORS
from config import Config

mongo = PyMongo()

def create_app():
    app = Flask(__name__)
    CORS(app)  # Enable CORS for cross-origin requests

    app.config.from_object(Config)

    mongo.init_app(app)

    # Test MongoDB connection during app creation
    try:
        collections = mongo.db.list_collection_names()
        print("MongoDB connection successful!")
        print(f"Collections in the database: {collections}")
    except Exception as e:
        print("MongoDB connection failed:", str(e))

    # Register blueprints
    from app.models import user_bp
    
    app.register_blueprint(User, url_prefix="/users")

    return app