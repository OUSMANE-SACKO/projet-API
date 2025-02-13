from flask import Blueprint
from flask_graphql import GraphQLView
from app.graphql_schema import schema
from flask_jwt_extended import jwt_required

graphql_bp = Blueprint("graphql_bp", __name__)

graphql_bp.add_url_rule(
    "/graphql",
    view_func=jwt_required()(GraphQLView.as_view(
        "graphql",
        schema=schema,
        graphiql=True
    ))
)
