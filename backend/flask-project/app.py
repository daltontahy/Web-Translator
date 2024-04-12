from flask import Flask, request, jsonify, send_from_directory, render_template
from dotenv import load_dotenv
import os
import deepl

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate_text():

    # Receive input text from the website
    input_text = request.json.get('text')

    # Check if authentication key is provided
    if os.getenv("DEEPL_API_KEY") is None:
        return jsonify({'error': 'Authentication key not provided'}), 400

    try:
        # Create a Translator object
        translator = deepl.Translator(auth_key=os.getenv("DEEPL_API_KEY"))

        # Translate input text using DeepL API
        result = translator.translate_text(input_text, target_lang='ES')

        # Return translated text to the website
        return jsonify({'translated_text': result.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
