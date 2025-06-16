import nltk
from nltk.corpus import wordnet as wn
from nltk.wsd import lesk
from nltk.tokenize import word_tokenize
import spacy

nltk.download('punkt')
nltk.download('wordnet')

nlp = spacy.load("en_core_web_sm")

def get_contextual_definitions(text):
    doc = nlp(text)
    context_words = word_tokenize(text)
    
    # Filter only meaningful candidate words (exclude stop words, punctuation, etc.)
    candidate_words = [
        token.text for token in doc
        if token.is_alpha and not token.is_stop and len(token.text) > 2
    ]

    unique_words = list(set(candidate_words))
    definitions = []

    for word in unique_words:
        synset = lesk(context_words, word)
        disambiguated = True

        # Fallback to first synset if Lesk fails
        if not synset:
            synsets = wn.synsets(word)
            if synsets:
                synset = synsets[0]
                disambiguated = False
            else:
                continue  # No definition found at all

        # Filter too short or vague definitions
        definition_text = synset.definition()
        if len(definition_text.split()) < 3:
            continue

        definition_entry = {
            "word": word,
            "definition": definition_text,
            "pos": synset.pos(),
            "example": synset.examples()[0] if synset.examples() else "",
            "disambiguated": disambiguated
        }
        definitions.append(definition_entry)

    return definitions
