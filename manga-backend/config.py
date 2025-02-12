import os

class Config:
    """Base configuration with default settings."""
    SECRET_KEY = os.getenv("SECRET_KEY", "We0rUOd82MswxX9X")
    MONGO_URI = os.getenv(
        "MONGO_URI",
        "mongodb+srv://ousmanesacko233:We0rUOd82MswxX9X@cluster0.tvp7d.mongodb.net/"
    )
    DEBUG = False
    TESTING = False