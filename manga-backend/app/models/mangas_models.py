from bson.objectid import ObjectId
from datetime import datetime
from app import mongo

class Manga:
    mongo = None

    @staticmethod
    def create_manga(title, description, release_date, genre_id, cover_image):
        manga = {
            "title": title,
            "description": description,
            "release_date": release_date,
            "genre_id": ObjectId(genre_id),
            "cover_image": cover_image,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        result = Manga.mongo.db.mangas.insert_one(manga)
        manga["_id"] = str(result.inserted_id)
        manga["genre_id"] = str(manga["genre_id"])
        return manga

    @staticmethod
    def get_all_mangas():
        mangas = list(Manga.mongo.db.mangas.find())
        for manga in mangas:
            manga["_id"] = str(manga["_id"])
            manga["genre_id"] = str(manga["genre_id"])
        return mangas

class Chapter:
    mongo = None

    @staticmethod
    def create_chapter(manga_id, chapter_number, title, release_date):
        chapter = {
            "manga_id": ObjectId(manga_id),
            "chapter_number": chapter_number,
            "title": title,
            "release_date": release_date,
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        result = Chapter.mongo.db.chapters.insert_one(chapter)
        chapter["_id"] = str(result.inserted_id)
        chapter["manga_id"] = str(chapter["manga_id"])
        return chapter

    @staticmethod
    def get_chapters_by_manga(manga_id):
        chapters = list(Chapter.mongo.db.chapters.find({"manga_id": ObjectId(manga_id)}))
        for chapter in chapters:
            chapter["_id"] = str(chapter["_id"])
            chapter["manga_id"] = str(chapter["manga_id"])
        return chapters

class Genre:
    mongo = None

    @staticmethod
    def create_genre(name):
        genre = {"name": name}
        result = Genre.mongo.db.genres.insert_one(genre)
        genre["_id"] = str(result.inserted_id)
        return genre

    @staticmethod
    def get_all_genres():
        genres = list(Genre.mongo.db.genres.find())
        for genre in genres:
            genre["_id"] = str(genre["_id"])
        return genres

class Collection:
    mongo = None

    @staticmethod
    def add_to_collection(user_id, manga_id):
        collection_entry = {
            "user_id": ObjectId(user_id),
            "manga_id": ObjectId(manga_id),
            "created_at": datetime.utcnow(),
        }
        result = Collection.mongo.db.collections.insert_one(collection_entry)
        collection_entry["_id"] = str(result.inserted_id)
        collection_entry["user_id"] = str(collection_entry["user_id"])
        collection_entry["manga_id"] = str(collection_entry["manga_id"])
        return collection_entry

    @staticmethod
    def get_user_collections(user_id):
        collections = list(Collection.mongo.db.collections.find({"user_id": ObjectId(user_id)}))
        for collection in collections:
            collection["_id"] = str(collection["_id"])
            collection["user_id"] = str(collection["user_id"])
            collection["manga_id"] = str(collection["manga_id"])
        return collections
