import graphene
from graphene import ObjectType, String, Int, List
from flask_jwt_extended import verify_jwt_in_request, get_jwt_identity
from app.models.mangas_models import Manga

class MangaType(ObjectType):
    id = String()
    title = String()
    description = String()
    release_date = String()
    genre_id = String()
    cover_image = String()
    created_at = String()

class Query(ObjectType):
    get_all_mangas = List(MangaType)

    def resolve_get_all_mangas(self, info):
        """
        Ensures only authenticated users can access mangas.
        """
        verify_jwt_in_request()  # Requires a valid JWT token
        user_id = get_jwt_identity()  # Extract user ID from JWT token

        if not user_id:
            raise Exception("Unauthorized access. Please log in.")

        return Manga.get_all_mangas()

class CreateManga(graphene.Mutation):
    class Arguments:
        title = String(required=True)
        description = String(required=True)
        release_date = String(required=True)
        genre_id = String(required=True)
        cover_image = String()

    manga = graphene.Field(MangaType)

    def mutate(self, info, title, description, release_date, genre_id, cover_image):
        """
        Ensures only authenticated users can create a new manga.
        """
        verify_jwt_in_request()  # Requires a valid JWT token
        user_id = get_jwt_identity()  # Extract user ID from JWT token

        if not user_id:
            raise Exception("Unauthorized access. Please log in.")

        # Create Manga
        manga_data = Manga.create_manga(title, description, release_date, genre_id, cover_image)

        return CreateManga(manga=MangaType(**manga_data))

class Mutation(ObjectType):
    create_manga = CreateManga.Field()

schema = graphene.Schema(query=Query, mutation=Mutation)
