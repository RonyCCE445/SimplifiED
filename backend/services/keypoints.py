# services/keypoints.py

import spacy
from sklearn.feature_extraction.text import TfidfVectorizer
from sklearn.metrics.pairwise import cosine_similarity

nlp = spacy.load("en_core_web_sm")

def generate_keypoints(text, num_points=5):
    doc = nlp(text)
    sentences = [sent.text.strip() for sent in doc.sents if len(sent.text.strip()) > 20]

    if len(sentences) <= num_points:
        return sentences

    # TF-IDF based sentence ranking
    vectorizer = TfidfVectorizer().fit_transform(sentences)
    similarity_matrix = cosine_similarity(vectorizer)

    # Sentence importance score = sum of similarities
    scores = similarity_matrix.sum(axis=1)
    ranked_sentences = [sentence for _, sentence in sorted(zip(scores, sentences), reverse=True)]

    return ranked_sentences[:num_points]
