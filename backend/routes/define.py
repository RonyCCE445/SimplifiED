from flask import Blueprint, request, jsonify
from services.definitions import get_contextual_definitions


bp = Blueprint("define", __name__, url_prefix="/api")

@bp.route("/define", methods=["POST"])
def define_words():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    definitions = get_contextual_definitions(text)
    return jsonify({"definitions": definitions})


    if not definitions:
        return jsonify({"message": "No meaningful definitions found."}), 200

    return jsonify({"definitions": definitions}), 200
