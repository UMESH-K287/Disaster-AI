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
    data = request.json
    
    # This list MUST match the order used in train_models.py
    # f1 = Monsoon, f2 = Drainage, f3 = Siltation
    try:
        ordered_values = [
            float(data.get('f1', 0)), 
            float(data.get('f2', 0)), 
            float(data.get('f3', 0))
        ]
    except ValueError:
        return jsonify({"error": "Invalid input values"}), 400

    model = models[disaster]
    input_array = np.array([ordered_values])

    # Get the probability of DANGER (index 1)
    probabilities = model.predict_proba(input_array)[0]
    prob_danger = float(probabilities[1]) 
    
    # If danger is 50% or higher, mark as is_danger=True
    is_danger = prob_danger >= 0.5

    return jsonify({
        "disaster": disaster,
        "is_danger": bool(is_danger),
        "probability": round(prob_danger * 100, 2)
    })
