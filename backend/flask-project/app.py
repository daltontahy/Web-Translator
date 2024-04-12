from flask import Flask, request, jsonify, render_template
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
    input_text = request.json.get('text')
    target_lang = request.json.get('language')  # Get target language from request

    if os.getenv("DEEPL_API_KEY") is None:
        return jsonify({'error': 'Authentication key not provided'}), 400

    try:
        translator = deepl.Translator(auth_key=os.getenv("DEEPL_API_KEY"))
        result = translator.translate_text(input_text, target_lang=target_lang)
        return jsonify({'translated_text': result.text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
