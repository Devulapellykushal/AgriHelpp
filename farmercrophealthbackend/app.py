import sys
import os
from flask import Flask, request, jsonify
from flask_cors import CORS

# Add the project root to the Python path
sys.path.insert(0, os.path.dirname(os.path.abspath(__file__)))

from inference import predict as model_predict
from agents.orchestrator import run_agents as orchestrator_run_agents

# --- Flask App Initialization ---
app = Flask(__name__)
CORS(app)

# --- API Endpoint Definition ---
@app.route('/predict', methods=['POST'])
async def predict(): # Make the function asynchronous
    """
    Handles the image prediction request using a fully async pipeline.
    """
    if 'file' not in request.files:
        return jsonify({'error': 'No file part provided.'}), 400
    
    file = request.files['file']
    if file.filename == '':
        return jsonify({'error': 'No file selected.'}), 400

    try:
        class_name, confidence = model_predict(file)
        if class_name is None:
            return jsonify({'error': 'Model prediction failed.'}), 500
    except Exception as e:
        return jsonify({'error': f'Model error: {e}'}), 500

    user_info = {
        "farmer_id": request.form.get("user_id", "user_placeholder_123"),
        "language": request.headers.get("Accept-Language", "en-US")
    }

    try:
        # Await the asynchronous orchestrator directly
        enriched_response = await orchestrator_run_agents(class_name, confidence, user_info)
        return jsonify(enriched_response)
    except Exception as e:
        print(f"❌ Orchestrator error: {e}")
        return jsonify({'error': f'Error processing result: {e}'}), 500

# --- Main Execution ---
if __name__ == '__main__':
    app.run(debug=True, port=5001)

# --- cURL Example for Testing ---
#
# curl -X POST -F "file=@/path/to/your/test_image.jpg" http://127.0.0.1:5001/predict
#
# Replace `/path/to/your/test_image.jpg` with the actual path to a test image.
# For example, if you have an image `apple_scab.jpg` in your Downloads folder:
# curl -X POST -F "file=@~/Downloads/apple_scab.jpg" http://127.0.0.1:5001/predict
#

# app.py

import torch
import json
from torchvision import transforms
from PIL import Image
from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

class CNN(torch.nn.Module):
    def __init__(self, num_classes):
        super(CNN, self).__init__()
        self.conv_layers = torch.nn.Sequential(
            torch.nn.Conv2d(3, 32, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(32),
            torch.nn.Conv2d(32, 32, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(32),
            torch.nn.MaxPool2d(2),
            torch.nn.Conv2d(32, 64, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(64),
            torch.nn.Conv2d(64, 64, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(64),
            torch.nn.MaxPool2d(2),
            torch.nn.Conv2d(64, 128, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(128),
            torch.nn.Conv2d(128, 128, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(128),
            torch.nn.MaxPool2d(2),
            torch.nn.Conv2d(128, 256, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(256),
            torch.nn.Conv2d(256, 256, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(256),
            torch.nn.MaxPool2d(2),
            torch.nn.Conv2d(256, 256, 3, 1, 1),
            torch.nn.ReLU(),
            torch.nn.BatchNorm2d(256)
        )
        self.avgpool = torch.nn.AdaptiveAvgPool2d((7, 7))
        self.dense_layers = torch.nn.Sequential(
            torch.nn.Dropout(0.4),
            torch.nn.Linear(256 * 7 * 7, 1024),
            torch.nn.ReLU(),
            torch.nn.Dropout(0.4),
            torch.nn.Linear(1024, num_classes)
        )

    def forward(self, x):
        x = self.conv_layers(x)
        x = self.avgpool(x)
        x = torch.flatten(x, 1)
        x = self.dense_layers(x)
        return x

with open("classes.json") as f:
    class_names = json.load(f)

model = CNN(num_classes=len(class_names))
model.load_state_dict(torch.load("plantvillage_weights_v22.pt", map_location="cpu"))
model.eval()

print("✅ Model loaded locally!")

def transform_image(image_bytes):
    transform = transforms.Compose([
        transforms.Resize((256, 256)),
        transforms.CenterCrop(224),
        transforms.ToTensor(),
        transforms.Normalize([0.485, 0.456, 0.406],
                             [0.229, 0.224, 0.225])
    ])
    image = Image.open(image_bytes).convert("RGB")
    return transform(image).unsqueeze(0)

def get_prediction(image_tensor):
    with torch.no_grad():
        output = model(image_tensor)
        _, predicted_class_index = torch.max(output, 1)
        
        # Get probabilities using softmax
        probabilities = torch.nn.functional.softmax(output, dim=1)
        confidence = probabilities[0, predicted_class_index.item()].item() * 100
        
        predicted_class_name = class_names[predicted_class_index.item()]
        
    return predicted_class_name, confidence

@app.route('/predict', methods=['POST'])
def predict():
    if 'file' not in request.files:
        return jsonify({'error': 'no file provided'}), 400
    
    file = request.files['file']
    
    try:
        image_tensor = transform_image(file)
        class_name, confidence = get_prediction(image_tensor)
        return jsonify({'class_name': class_name, 'confidence': f'{confidence:.2f}%'})
    except Exception as e:
        return jsonify({'error': str(e)}), 500 