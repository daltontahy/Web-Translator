from flask import Flask, request, jsonify, render_template, session, redirect, url_for
from dotenv import load_dotenv
import os
import deepl

# Load environment variables from .env file
load_dotenv()

app = Flask(__name__)
app.secret_key = 'your_secret_key'  # Set a secret key for session encryption


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/translate', methods=['POST'])
def translate_text():
    input_text = request.json.get('text')
    target_lang = request.json.get('language')  # Get target language from request

    # Translate the text
    if os.getenv("DEEPL_API_KEY") is None:
        return jsonify({'error': 'Authentication key not provided'}), 400

    try:
        translator = deepl.Translator(auth_key=os.getenv("DEEPL_API_KEY"))
        translated_text = translator.translate_text(input_text, target_lang=target_lang).text

        # Append the translation to the session
        if 'translation_history' not in session:
            session['translation_history'] = []

        session['translation_history'].append({
            'input_text': input_text,
            'translated_text': translated_text,
            'target_lang': target_lang
        })

        # Keep only the last 10 translations
        session['translation_history'] = session['translation_history'][-10:]

        return jsonify({'translated_text': translated_text})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@app.route('/translation-history')
def translation_history():
    history = session.get('translation_history', [])
    return jsonify({'history': history})

if __name__ == '__main__':
    app.run(debug=True)
