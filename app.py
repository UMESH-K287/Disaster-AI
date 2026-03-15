from flask import Flask, request, jsonify
from flask_cors import CORS
import joblib
import numpy as np

app = Flask(__name__)
CORS(app)

# Load trained models
models = {
    "landslide": joblib.load("models/landslide_model.pkl"),
    "flood": joblib.load("models/flood_model.pkl"),
    "cyclone": joblib.load("models/cyclone_model.pkl"),
    "drought": joblib.load("models/drought_model.pkl"),
    "heatwave": joblib.load("models/heatwave_model.pkl"),
    "earthquake": joblib.load("models/earthquake_model.pkl"),
    "tsunami": joblib.load("models/tsunami_model.pkl"),
    "forestfires": joblib.load("models/forestfires_model.pkl")
}

@app.route("/predict/<disaster>", methods=["POST"])
def predict(disaster):
    # Only pull the data once
    data = request.json
    input_array = np.array([[float(data['f1']), float(data['f2']), float(data['f3'])]])

    # Get probability directly - don't call .predict() separately
    # This cuts the math work in half
    prob_danger = models[disaster].predict_proba(input_array)[0][1]

    return jsonify({
        "is_danger": bool(prob_danger >= 0.5),
        "probability": round(prob_danger * 100, 2)
    })
