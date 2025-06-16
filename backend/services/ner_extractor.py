import spacy

# Load the transformer-based spaCy model
nlp = spacy.load("en_core_web_trf")

# Allowed entity types for educational purposes
ALLOWED_LABELS = {
    "PERSON", "ORG", "GPE", "LOC", "DATE", "TIME", "NORP",
    "FAC", "EVENT", "WORK_OF_ART", "LAW", "LANGUAGE", "PRODUCT"
}

# Generic or unhelpful entities to exclude
EXCLUDE_LIST = {
    "first", "second", "third", "one", "two", "three", "today",
    "tomorrow", "yesterday", "monday", "tuesday", "wednesday",
    "thursday", "friday", "saturday", "sunday"
}

def extract_named_entities(text):
    doc = nlp(text)
    filtered_entities = []

    seen = set()

    for ent in doc.ents:
        text_clean = ent.text.strip()
        if (
            ent.label_ in ALLOWED_LABELS and
            text_clean.lower() not in EXCLUDE_LIST and
            text_clean.lower() not in seen
        ):
            seen.add(text_clean.lower())
            filtered_entities.append({
                "text": text_clean,
                "label": ent.label_  # ✅ important: keep this as 'label'
            })

    return filtered_entities
