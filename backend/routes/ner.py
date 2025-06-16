from flask import Blueprint, request, jsonify
from services.ner_extractor import extract_named_entities

bp = Blueprint("ner", __name__, url_prefix="/api")

@bp.route("/ner", methods=["POST"])
def ner():
    data = request.get_json()
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"message": "Text is required."}), 400

    entities = extract_named_entities(text)
    return jsonify({"entities": entities})
