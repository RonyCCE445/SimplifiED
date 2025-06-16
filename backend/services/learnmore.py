import os
import requests
from dotenv import load_dotenv

load_dotenv()
TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")

# You can use any supported Together model, e.g., mistralai/Mixtral-8x7B-Instruct
MODEL = "mistralai/Mixtral-8x7B-Instruct-v0.1"

def generate_explanation(entity, ent_type):
    prompt = f"Explain what '{entity}' refers to"
    if ent_type:
        prompt += f" as a {ent_type.lower()}."
    else:
        prompt += "."

    prompt += " Make it informative and clear for a student."

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
        response = requests.post(
            "https://api.together.xyz/v1/completions",
            headers=headers,
            json=payload
        )
        response.raise_for_status()
        data = response.json()
        return data["choices"][0]["text"].strip()
    except Exception as e:
        return f"An error occurred while generating explanation: {str(e)}"
