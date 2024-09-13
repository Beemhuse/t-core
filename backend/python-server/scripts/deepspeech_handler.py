import subprocess

def transcribe_audio(file_path):
    try:
        # Run the DeepSpeech command
        result = subprocess.run(['deepspeech', '--model', 'model/deepspeech.pbmm', '--scorer', 'model/deepspeech.scorer', '--audio', file_path], stdout=subprocess.PIPE, stderr=subprocess.PIPE)
        
        if result.returncode == 0:
            return result.stdout.decode('utf-8').strip()
        else:
            raise Exception(f"DeepSpeech error: {result.stderr.decode('utf-8')}")
    except Exception as e:
        raise Exception(f"Failed to transcribe audio: {str(e)}")
