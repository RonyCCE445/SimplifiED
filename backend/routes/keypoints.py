from flask import Blueprint, request, jsonify
from services.keypoints import generate_keypoints

bp = Blueprint("keypoints", __name__, url_prefix="/api")

@bp.route("/keypoints", methods=["POST"])
def key_points():
    data = request.get_json()
    text = data.get("text", "").strip()

    if not text:
        return jsonify({"message": "Text is required."}), 400

    points = generate_keypoints(text)
    return jsonify({"keypoints": points})
