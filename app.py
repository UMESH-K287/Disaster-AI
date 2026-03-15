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
    if disaster not in models:
        return jsonify({"error": "Model not found"}), 404

    data = request.json
    
    # CRITICAL FIX: Ensure the features are in order f1, f2, f3
    # This matches the 'userInputs[`f${i+1}`]' from your JavaScript
    try:
        ordered_values = [data['f1'], data['f2'], data['f3']]
    except KeyError:
        return jsonify({"error": "Missing input fields"}), 400

    model = models[disaster]
    input_array = np.array([ordered_values])

    # Faster: Get probability first, then decide if it's danger
    prob_danger = float(model.predict_proba(input_array)[0][1])
    is_danger = prob_danger >= 0.5

    return jsonify({
        "disaster": disaster,
        "is_danger": bool(is_danger),
        "probability": round(prob_danger * 100, 2)
    })
if __name__ == "__main__":
    print("Server running on http://127.0.0.1:5000")
    app.run(port=5000)
