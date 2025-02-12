from config import Config
from pymongo import MongoClient
from app import create_app

# Récupération de l'URI MongoDB depuis la configuration
MONGO_URI = Config.MONGO_URI
if not MONGO_URI:
    print("Erreur : La variable d'environnement MONGO_URI n'est pas définie.")
    exit(1)

try:
    # Connexion à MongoDB
    client = MongoClient(MONGO_URI)
    dbs = client.list_database_names()
    print("Connexion réussie ! Bases de données disponibles :", dbs)
except Exception as e:
    print("Erreur de connexion :", e)
    exit(1)

# Création de l'application Flask
app = create_app()

if __name__ == "__main__":
    app.run(debug=True)
