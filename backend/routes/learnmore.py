from flask import Blueprint, request, jsonify
from services.learnmore import generate_explanation

bp = Blueprint("learnmore", __name__, url_prefix="/api")

@bp.route("/learnmore", methods=["POST"])
def learn_more():
    data = request.get_json()
    text = data.get("text", "").strip()
    
    if not text:
        return jsonify({"message": "Text is required."}), 400

    explanation = generate_explanation(text)
    return jsonify({"explanation": explanation})
