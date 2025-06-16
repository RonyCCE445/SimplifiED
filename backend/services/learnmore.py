import os
import requests
from dotenv import load_dotenv

load_dotenv()
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1"
TOGETHER_API_URL = "https://api.together.xyz/v1/completions"

def generate_explanation(entity: str, ent_type: str = None) -> str:
    if not entity or not entity.strip():
        return "Entity is required to generate an explanation."

    prompt = f"Explain what '{entity}' refers to"
    if ent_type and ent_type.strip().lower() != "none":
        prompt += f" as a {ent_type.lower()}."
    else:
        prompt += "."

    prompt += " Make the explanation clear and concise for a student-level understanding."

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": MODEL,
        "prompt": prompt,
        "max_tokens": 300,
        "temperature": 0.7,
        "stop": ["</s>"]
    }

    try:
        response = requests.post(TOGETHER_API_URL, headers=headers, json=payload)
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["text"].strip()
    except requests.exceptions.RequestException as e:
        return f"Error reaching Together API: {str(e)}"
    except Exception as e:
        return f"An error occurred: {str(e)}"
