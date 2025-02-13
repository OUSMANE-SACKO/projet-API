import os

class Config:
    """Base configuration with default settings."""
    SECRET_KEY = os.getenv("SECRET_KEY", "1PhU4kEdZnDAECN5")
    MONGO_URI = os.getenv(
        "MONGO_URI",
        "mongodb+srv://jdanielkom:1PhU4kEdZnDAECN5@cluster0.tw4eyui.mongodb.net/mangasDB"
    )
    DEBUG = False
    TESTING = False