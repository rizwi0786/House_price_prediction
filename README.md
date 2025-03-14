# House price prediction


## 📌 Overview
This project is a **House Price Prediction System** built using **Machine Learning** and deployed via a **Flask API**. The frontend is built using **ReactJS** for user interaction.

## 📂 Project Structure
```
House-Price-Prediction/
│── frontend/               # React frontend (UI for user input)
│── backend/                # Flask API
│   │── app.py              # Flask application
│   │── house_price_model.pkl # Trained model
│── notebooks/              # Jupyter Notebook for model training
│   │── housing_price_predict.ipynb 
│── models/                 # Saved models
│── requirements.txt        # Dependencies
│── README.md               # Documentation
```

---

## 🛠 Installation & Setup

### 1️⃣ Clone the Repository
```bash
git clone <repository-url>
cd House-Price-Prediction
```

### 2️⃣ Set Up Virtual Environment & Install Dependencies
```bash
python -m venv venv
source venv/bin/activate  # On Windows use: venv\Scripts\activate
pip install -r requirements.txt
```

### 3️⃣ Train the Model
Run the **Jupyter Notebook (`housing_price_predict.ipynb`)** to:
- Load and preprocess the dataset.
- Train a regression model.
- Save the trained model as `house_price_model.pkl`.

---

## 🚀 Running the Application

### 1️⃣ Start the Flask API
Move to the `backend/` directory and run:
```bash
python app.py
```
- This will start the API at `http://127.0.0.1:5000/`

### 2️⃣ Test API Endpoint
You can use **Postman** or `curl` to send a POST request to the `/predict` endpoint:
```bash
curl -X POST http://127.0.0.1:5000/predict \
-H "Content-Type: application/json" \
-d '{"features": [2.3, 1.5, 2.5, 3, 3.5, 1.5, 36.7783, -119.4179]}'
```
- The response will be a JSON object containing the predicted house price.

### 3️⃣ Run the React Frontend
Move to the `frontend/` directory and install dependencies:
```bash
npm install
```
Start the React app:
```bash
npm start
```
The application will be available at `http://localhost:3000/`

---

## 📊 Model Performance
- **Algorithm Used:** [Specify Model: Linear Regression, Random Forest, XGBoost, etc.]
- **Evaluation Metrics:**
  - RMSE: [Value]
  - MAE: [Value]
  - R² Score: [Value]

---

## 🌍 Deployment (Optional)
To deploy the Flask app:
- **Containerization:** Use Docker (`Dockerfile` included)
- **Cloud Deployment:** Deploy on AWS, GCP, or Heroku

---

## 🔥 Future Improvements
- Improve model accuracy using advanced feature engineering.
- Implement authentication in the API.
- Deploy the project on cloud platforms.

## 👨‍💻 Contributors
[Md Shafiullah Quraishi]

---
**Note:** This is a personal project for learning and practice purposes.
