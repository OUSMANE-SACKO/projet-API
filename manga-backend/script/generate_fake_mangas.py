import os
import sys
import random
from faker import Faker
from bson.objectid import ObjectId
from datetime import datetime

# 📌 Add the project root directory to sys.path
sys.path.append(os.path.abspath(os.path.join(os.path.dirname(__file__), "..")))

from app import mongo  # Now it will find your Flask app's mongo instance

fake = Faker()

# 📌 Set the path to your assets directory containing manga covers
ASSETS_DIR = os.path.abspath("assets/")

def get_random_cover():
    """Select a random image file from the assets directory."""
    images = [img for img in os.listdir(ASSETS_DIR) if img.endswith((".jpg", ".png", ".jpeg"))]
    if not images:
        return "default_cover.jpg"  # Fallback image if no images are found
    return os.path.join("assets/", random.choice(images))  # Relative path for MongoDB storage

def generate_fake_mangas(num_mangas=20):
    """Generate and insert fake manga data into MongoDB."""
    # Retrieve existing genre IDs from the database
    genres = list(mongo.db.genres.find({}, {"_id": 1}))
    genre_ids = [str(genre["_id"]) for genre in genres] if genres else [str(ObjectId())]  # Dummy ObjectId if none exist

    mangas = []
    for _ in range(num_mangas):
        manga = {
            "title": fake.sentence(nb_words=3),
            "description": fake.text(max_nb_chars=200),
            "release_date": fake.date_between(start_date="-10y", end_date="today").strftime("%Y-%m-%d"),
            "genre_id": ObjectId(random.choice(genre_ids)),  # Assign random genre
            "cover_image": get_random_cover(),  # Assign random cover image
            "created_at": datetime.utcnow(),
            "updated_at": datetime.utcnow(),
        }
        mangas.append(manga)

    # Insert fake mangas into MongoDB
    result = mongo.db.mangas.insert_many(mangas)
    print(f" Inserted {len(result.inserted_ids)} fake mangas into the database.")

if __name__ == "__main__":
    generate_fake_mangas()
