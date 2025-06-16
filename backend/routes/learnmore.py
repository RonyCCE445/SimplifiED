from flask import Blueprint, request, jsonify
from services.learnmore import generate_explanation

bp = Blueprint("learnmore", __name__, url_prefix="/api")

@bp.route("/learnmore", methods=["POST"])
def learn_more():
    data = request.get_json()
    entity = data.get("entity", "").strip()
    ent_type = data.get("type", "").strip()

    if not entity:
        return jsonify({"message": "Entity is required."}), 400

    explanation = generate_explanation(entity, ent_type)
    return jsonify({"explanation": explanation})
