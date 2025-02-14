from flask import Flask
from flask_pymongo import PyMongo
from config import Config
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
app.config.from_object(Config)

# Initialize MongoDB globally
mongo = PyMongo(app)

# Attach MongoDB instance to the models
from app.models.user_models import User
from app.models.mangas_models import Manga, Chapter, Genre, Collection

User.mongo = mongo
Manga.mongo = mongo
Chapter.mongo = mongo
Genre.mongo = mongo
Collection.mongo = mongo

# Enable CORS
CORS(app)
@app.after_request
def add_header(r):
    """
    Add headers to both force latest IE rendering engine or Chrome Frame,
    and also to cache the rendered page for 10 minutes.
    """
    r.headers["Cache-Control"] = "no-cache, no-store, must-revalidate"
    r.headers["Pragma"] = "no-cache"
    r.headers["Expires"] = "0"
    r.headers['Cache-Control'] = 'public, max-age=0'
    # Enable Access-Control-Allow-Origin
    r.headers['Access-Control-Allow-Origin'] = ""
    r.headers['Access-Control-Allow-Headers'] = "Content-Type, Authorization"
    r.headers['Access-Control-Allow-Methods'] = ""
    return r

# Enabling CORS for specific origin
CORS(app, origins="http://localhost:5174", methods=["GET", "POST"], allow_headers=["Content-Type"])

# Register blueprints
from app.routes.user_routes import user_bp
from app.routes.mangas_routes import manga_bp

app.register_blueprint(user_bp, url_prefix="/users")
app.register_blueprint(manga_bp, url_prefix="/manga")

@app.route("/")
def home():
    return {"message": "Welcome to the Manga Backend API!"}