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
    try:
        data = request.json
        # We must pull f1, f2, f3 in order to match the training data
        ordered_values = [
            float(data.get('f1', 0)), 
            float(data.get('f2', 0)), 
            float(data.get('f3', 0))
        ]
        
        model = models[disaster]
        input_array = np.array([ordered_values])

        # Get probabilities for [Safe, Danger]
        probs = model.predict_proba(input_array)[0]
        
        # WE NEED INDEX 1 (Danger Probability)
        danger_prob = float(probs[1]) 
        
        # Decide if it's danger based on 50% threshold
        is_danger = danger_prob >= 0.5

        return jsonify({
            "disaster": disaster,
            "is_danger": bool(is_danger),
            "probability": round(danger_prob * 100, 2)
        })
    except Exception as e:
        return jsonify({"error": str(e)}), 500
