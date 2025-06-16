# services/question_generator.py

import os
import requests
from dotenv import load_dotenv

load_dotenv()

TOGETHER_API_KEY = os.getenv("TOGETHER_API_KEY")
TOGETHER_API_URL = "https://api.together.xyz/v1/chat/completions"

def generate_questions(text):
    prompt = f"""
You are an academic assistant. Read the following content and generate as many high-quality Q&A pairs as possible.
Each question should test understanding of a specific concept from the text. Avoid repetition.

Format your output as:
Q1: ...
A1: ...
Q2: ...
A2: ...
(continue as long as necessary)

Content:
{text}
"""

    headers = {
        "Authorization": f"Bearer {TOGETHER_API_KEY}",
        "Content-Type": "application/json"
    }

    payload = {
        "model": "mistralai/Mistral-7B-Instruct-v0.1",
        "messages": [{"role": "user", "content": prompt}],
        "temperature": 0.5,
        "max_tokens": 1024
    }

    response = requests.post(TOGETHER_API_URL, headers=headers, json=payload)

    if response.status_code != 200:
        raise Exception(f"Together API error: {response.status_code} - {response.text}")

    output = response.json()["choices"][0]["message"]["content"]

    # Parse Q&A pairs
    qa_pairs = []
    current_q, current_a = None, None
    for line in output.splitlines():
        line = line.strip()
        if line.lower().startswith("q"):
            current_q = line.split(":", 1)[1].strip() if ':' in line else line[1:].strip()
        elif line.lower().startswith("a"):
            current_a = line.split(":", 1)[1].strip() if ':' in line else line[1:].strip()

        if current_q and current_a:
            qa_pairs.append({"question": current_q, "answer": current_a})
            current_q, current_a = None, None

    return qa_pairs
