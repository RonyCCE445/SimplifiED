# services/summarizer.py

import spacy
from collections import Counter
import heapq
import re

# Load spaCy English model
nlp = spacy.load("en_core_web_sm")

def generate_summary(text, max_sentences=3):
    # Clean and preprocess
    text = re.sub(r'\s+', ' ', text.strip())
    doc = nlp(text)

    # Sentence segmentation
    sentences = [sent for sent in doc.sents if len(sent.text.strip()) > 20]

    # Calculate word frequencies
    word_frequencies = {}
    for token in doc:
        if token.text.lower() not in nlp.Defaults.stop_words and not token.is_punct:
            word = token.text.lower()
            word_frequencies[word] = word_frequencies.get(word, 0) + 1

    # Normalize
    max_freq = max(word_frequencies.values(), default=1)
    for word in word_frequencies:
        word_frequencies[word] /= max_freq

    # Score sentences
    sentence_scores = {}
    for sent in sentences:
        for token in sent:
            if token.text.lower() in word_frequencies:
                sentence_scores[sent] = sentence_scores.get(sent, 0) + word_frequencies[token.text.lower()]

    # Get top sentences
    summary_sentences = heapq.nlargest(max_sentences, sentence_scores, key=sentence_scores.get)
    final_summary = ' '.join([sent.text for sent in summary_sentences])

    return final_summary or "Summary could not be generated."
