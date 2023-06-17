import time
from flask import Flask, request
import openai
import os
import io
from werkzeug.datastructures import FileStorage
import tempfile
from report_from_transcript import chat_medical_transcription

openai.api_key = os.getenv("OPENAI_API_KEY")

app = Flask(__name__)

@app.route('/api/time', methods=['POST'])
def get_current_time():
    return {'time': time.time()}


@app.route('/api/transcribe', methods=['POST'])
def transcribe():
    audio = request.files['audio']

    audio_file = audio.read()

    # Create a temporary file
    with tempfile.NamedTemporaryFile(suffix='.mp3') as temp_file:
        temp_file.write(audio_file)
        
        with open(temp_file.name, 'rb') as f:
            # Transcribe the audio from the temporary file
            transcript = openai.Audio.transcribe('whisper-1', f)

    # Generate the report from the transcript
    report = chat_medical_transcription(transcript)

    # Return the transcript
    return {'transcript': transcript, 'report': report}


if __name__ == '__main__':
    app.run(debug=True)