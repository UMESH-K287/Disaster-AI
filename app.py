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
    values = list(data.values())

    model = models[disaster]

    input_array = np.array([values])

    prediction = int(model.predict(input_array)[0])
    probability = float(model.predict_proba(input_array)[0][1])

    return jsonify({
        "disaster": disaster,
        "is_danger": True if prediction == 1 else False,
        "probability": round(probability * 100, 2)
    })

if __name__ == "__main__":
    print("Server running on http://127.0.0.1:5000")
    app.run(port=5000)