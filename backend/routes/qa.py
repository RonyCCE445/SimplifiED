# routes/qa.py
from flask import Blueprint, request, jsonify
from services.question_generator import generate_questions

bp = Blueprint("qa", __name__, url_prefix="/api")

@bp.route("/quiz", methods=["POST"])
def generate_quiz():
    data = request.get_json()
    text = data.get("text", "")
    if not text.strip():
        return jsonify({"error": "No input text provided"}), 400

    try:
        qa_pairs = generate_questions(text)
        return jsonify({"qa_pairs": qa_pairs})  # fixed key name here
    except Exception as e:
        return jsonify({"error": str(e)}), 500
