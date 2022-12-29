from flask import Blueprint, request, jsonify
from flask_babel import gettext
from .core import get_queried_data
from .formatter import prepare_pin
from flask_restx import Resource, Api


def make_tuple_translation(keys_to_translate):
    return [(x, gettext(x)) for x in keys_to_translate]


def core_pages(database, languages):
    core_api_blueprint = Blueprint('api', __name__, url_prefix="/api")
    core_api = Api(core_api_blueprint, doc='/doc', version='0.1')

    @core_api.route("/data")
    class Data(Resource):
        def get(self):
            all_data = database.get_data()
            query_params = request.args.to_dict(flat=False)
            data = all_data["data"]
            categories = all_data["categories"]
            visible_data = all_data["visible_data"]
            queried_data = get_queried_data(data, categories, query_params)
            formatted_data = map(lambda x: prepare_pin(x, visible_data), queried_data)
            return jsonify(list(formatted_data))

    @core_api.route("/categories")
    class Categories(Resource):
        def get(self):
            all_data = database.get_data()
            categories = make_tuple_translation(all_data["categories"].keys())
            return jsonify(categories)

    @core_api.route("/languages")
    class Languages(Resource):
        '''dupa'''
        def get(self):
            return jsonify(languages)

    @core_api.route("/category/<category_type>")
    class CategoryTypes(Resource):
        def get(self, category_type):
            all_data = database.get_data()
            local_data = make_tuple_translation(all_data["categories"][category_type])
            return jsonify(local_data)

    return core_api_blueprint
