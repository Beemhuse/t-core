from flask import Flask, request, jsonify
from scripts.deepspeech_handler import transcribe_audio

app = Flask(__name__)

@app.route('/transcribe', methods=['POST'])
def transcribe():
    if 'file' not in request.files:
        return jsonify({'error': 'No file provided'}), 400

    file = request.files['file']
    file_path = f'./audio-files/{file.filename}'
    file.save(file_path)

    try:
        transcription = transcribe_audio(file_path)
        return jsonify({'transcription': transcription})
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5001)  # Run on all network interfaces, port 5001
