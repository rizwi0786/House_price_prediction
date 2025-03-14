from flask import Flask, request, jsonify
import joblib
import logging
import numpy as np
from flask_cors import CORS

# Initialize Flask app
app = Flask(__name__)
CORS(app)

# Set up logging
logging.basicConfig(filename="app.log", level=logging.INFO, format="%(asctime)s - %(levelname)s - %(message)s")

# Load the trained model
try:
    model = joblib.load("house_price_model.pkl")
    logging.info("Model loaded successfully.")
except Exception as e:
    logging.error("Error loading model: %s", str(e))
    model = None

@app.route("/predict", methods=["POST"])
def predict():
    try:
        if model is None:
            return jsonify({"error": "Model not loaded"}), 500
        
        # Get JSON data
        data = request.get_json()

        # Ensure "features" is in the request
        if "features" not in data:
            return jsonify({"error": "Missing 'features' in request"}), 400

        # Convert input to NumPy array
        input_data = np.array(data['features']).reshape(1, -1)

        # Predict
        prediction = model.predict(input_data)

        logging.info(f"Prediction made successfully: {prediction}")

        return jsonify({"predicted_price": prediction.tolist()})
    
    except Exception as e:
        logging.error("Error in prediction: %s", str(e))
        return jsonify({"error": str(e)}), 400

if __name__ == "__main__":
    app.run(debug=True)
