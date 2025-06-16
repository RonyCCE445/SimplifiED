# routes/summarize.py

from flask import Blueprint, request, jsonify
from services.summarizer import generate_summary

bp = Blueprint("summarize", __name__, url_prefix="/api")

@bp.route("/summarize", methods=["POST"])
def summarize_text():
    data = request.json
    text = data.get("text", "")
    if not text:
        return jsonify({"error": "No text provided"}), 400

    summary = generate_summary(text)
    return jsonify({"summary": summary})
