import React, { useState } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap CSS

const HousePricePredictor = () => {
  const [formData, setFormData] = useState({
    MedInc: "",
    HouseAge: "",
    AveRooms: "",
    AveBedrms: "",
    Population: "",
    AveOccup: "",
    Latitude: 36.7783, // Default California latitude
    Longitude: -119.4179, // Default California longitude
  });

  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const processedData = {
        ...formData,
        MedInc: parseFloat(formData.MedInc),   // Convert to float
        HouseAge: parseFloat(formData.HouseAge), // Convert to float
        Population: parseFloat(formData.Population),
        AveOccup: parseFloat(formData.AveOccup),
        AveRooms: parseFloat(formData.AveRooms),
        AveBedrms: parseFloat(formData.AveBedrms),
      };
  
      const calculatedData = {
        ...processedData,
        POPULATION_PER_HOUSEHOLD: processedData.Population / processedData.AveOccup,
        ROOMS_PER_HOUSEHOLD: processedData.AveRooms / processedData.AveOccup,
        BEDROOM_RATIO: processedData.AveBedrms / processedData.AveRooms,
      };
  
      console.log(Object.values(calculatedData)); // Debugging
  
      const response = await axios.post("http://127.0.0.1:5000/predict", {
        features: Object.values(calculatedData),
      });
  
      setPrediction(response.data.predicted_price);
    } catch (error) {
      console.error("Error predicting house price:", error);
    }
  };
  

  return (
    <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "50%" }}>
        <h2 className="text-center mb-4">🏡 House Price Predictor</h2>

        <form onSubmit={handleSubmit}>
          <div className="row">
            {Object.keys(formData).map((key, index) => (
              <div className="col-md-6 mb-3" key={key}>
                <label className="form-label">{key}</label>
                <input
                  type="number"
                  name={key}
                  value={formData[key]}
                  onChange={handleChange}
                  className="form-control"
                  disabled={key === "Latitude" || key === "Longitude"} // Disable lat & long
                />
              </div>
            ))}
          </div>

          <button type="submit" className="btn btn-primary w-100 mt-3">
            Predict Price
          </button>
        </form>

        {error && (
          <div className="alert alert-danger mt-3 text-center">{error}</div>
        )}

        {prediction !== null && (
          <div className="alert alert-success mt-3 text-center">
            <h4>Predicted Price: ${parseFloat(prediction).toFixed(2)} M</h4>
          </div>
        )}
      </div>
    </div>
  );
};

export default HousePricePredictor;
