from flask import Flask, request, jsonify
from deepl import Translator
import os

app = Flask(__name__)

# Define environment variable names
DEEPL_AUTH_KEY = os.getenv("DEEPL_AUTH_KEY") ## change this for security purposed
DEEPL_SERVER_URL = "https://api.deepl.com/v2"

@app.route('/translate', methods=['POST'])
def translate_text():
    # Receive input text from the website
    input_text = request.json.get('text')

    # Retrieve authentication key and server URL from environment variables
    auth_key = os.getenv(DEEPL_AUTH_KEY)
    server_url = os.getenv(DEEPL_SERVER_URL)

    # Check if authentication key is provided
    if auth_key is None:
        return jsonify({'error': 'Authentication key not provided'}), 400

    # Create a Translator object with authentication key and server URL
    translator = Translator(auth_key, server_url=server_url)

    try:
        # Translate input text using DeepL API
        translated_text = translator.translate_text(input_text, target_lang='FR')

        # Return translated text to the website
        return jsonify({'translated_text': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
