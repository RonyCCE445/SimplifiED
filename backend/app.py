# app.py

from flask import Flask, jsonify
from flask_cors import CORS
from routes.summarize import bp as summarize_bp
from routes.define import bp as define_bp
from routes.learnmore import bp as learnmore_bp
from routes.qa import bp as qa_bp
from routes.readability import bp as readability_bp
from routes.keypoints import bp as keypoints_bp
import nltk

# Download necessary resources only once
def download_nltk_resources():
    try:
        nltk.data.find('tokenizers/punkt')
    except LookupError:
        nltk.download('punkt')
    try:
        nltk.data.find('corpora/wordnet')
    except LookupError:
        nltk.download('wordnet')

download_nltk_resources()

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*"}}, supports_credentials=True)

# Register all routes
app.register_blueprint(summarize_bp)
app.register_blueprint(define_bp)
app.register_blueprint(learnmore_bp)
app.register_blueprint(qa_bp)
app.register_blueprint(readability_bp)
app.register_blueprint(keypoints_bp)

@app.route("/", methods=["GET"])
def root():
    return jsonify({"message": "SimplifiED Flask backend is running!"})

if __name__ == "__main__":
    app.run(debug=True)
