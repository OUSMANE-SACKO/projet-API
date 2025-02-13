from flask import Blueprint, request, jsonify
from ..models.mangas_models import Manga, Chapter, Genre, Collection

manga_bp = Blueprint("manga_bp", __name__)

@manga_bp.route("/mangas", methods=["POST"])
def create_manga():
    data = request.get_json()
    required_fields = ["title", "description", "release_date", "genre_id", "cover_image"]

    for field in required_fields:
        if field not in data:
            return jsonify({"error": f"Missing field: {field}"}), 400

    try:
        manga = Manga.create_manga(
            data["title"], data["description"], data["release_date"], data["genre_id"], data["cover_image"]
        )
        return jsonify({"message": "Manga created successfully!", "manga": manga}), 201
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

@manga_bp.route("/mangas", methods=["GET"])
def get_all_mangas():
    try:
        mangas = Manga.get_all_mangas()
        return jsonify({"mangas": mangas}), 200
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

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

@manga_bp.route("/mangas/<manga_id>/chapters", methods=["GET"])
def get_chapters_by_manga(manga_id):
    try:
        chapters = Chapter.get_chapters_by_manga(manga_id)
        return jsonify({"chapters": chapters}), 200
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

@manga_bp.route("/genres", methods=["POST"])
def create_genre():
    data = request.get_json()
    if "name" not in data:
        return jsonify({"error": "Genre name is required."}), 400

    try:
        genre = Genre.create_genre(data["name"])
        return jsonify({"message": "Genre created successfully!", "genre": genre}), 201
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

@manga_bp.route("/genres", methods=["GET"])
def get_all_genres():
    try:
        genres = Genre.get_all_genres()
        return jsonify({"genres": genres}), 200
    except Exception as e:
        return jsonify({"error": f"Internal Server Error: {str(e)}"}), 500

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
