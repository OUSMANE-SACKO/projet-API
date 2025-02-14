from flask import Blueprint, request, jsonify
from ..models.mangas_models import Manga, Chapter, Genre, Collection

manga_bp = Blueprint("manga_bp", __name__)

# 📌 Retrieve all mangas (GET ONLY)
@manga_bp.route("/mangas", methods=["GET"])
def get_all_mangas():
    try:
        mangas = Manga.get_all_mangas()
        return jsonify({"mangas": mangas}), 200
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# 📌 Create a new chapter
@manga_bp.route("/chapters", methods=["POST"])
def create_chapter():
    data = request.get_json()
    required_fields = ["manga_id", "chapter_number", "title", "release_date"]
    
    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        chapter = Chapter.create_chapter(
            data["manga_id"], data["chapter_number"], data["title"], data["release_date"]
        )
        return jsonify({"message": "Chapter created successfully!", "chapter": chapter}), 201
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# 📌 Retrieve all chapters of a manga
@manga_bp.route("/mangas/<manga_id>/chapters", methods=["GET"])
def get_chapters_by_manga(manga_id):
    try:
        chapters = Chapter.get_chapters_by_manga(manga_id)
        return jsonify({"chapters": chapters}), 200
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# 📌 Retrieve all genres
@manga_bp.route("/genres", methods=["GET"])
def get_all_genres():
    try:
        genres = Genre.get_all_genres()
        return jsonify({"genres": genres}), 200
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# 📌 Add a manga to a user's collection
@manga_bp.route("/collections", methods=["POST"])
def add_to_collection():
    data = request.get_json()
    required_fields = ["user_id", "manga_id"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        collection = Collection.add_to_collection(data["user_id"], data["manga_id"])
        return jsonify({"message": "Manga added to collection!", "collection": collection}), 201
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

# 📌 Retrieve all mangas in a user's collection
@manga_bp.route("/collections/<user_id>", methods=["GET"])
def get_user_collections(user_id):
    try:
        collections = Collection.get_user_collections(user_id)
        return jsonify({"collections": collections}), 200
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500
