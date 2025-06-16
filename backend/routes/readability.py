from flask import Blueprint, request, jsonify
from services.readability import analyze_readability

bp = Blueprint("readability", __name__, url_prefix="/api")

@bp.route("/readability", methods=["POST"])
def readability_route():
    data = request.get_json()
    text = data.get("text", "")

    if not text.strip():
        return jsonify({"error": "No text provided"}), 400

    results = analyze_readability(text)
    return jsonify(results)
