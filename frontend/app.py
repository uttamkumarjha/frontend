import joblib
from flask import Flask, request, jsonify
from flask_cors import CORS
import numpy as np

app = Flask(__name__)
CORS(app)

def calculate_descriptors(smiles):
    # Mock descriptors - no rdkit needed for demo
    if not smiles or len(smiles) == 0:
        return None
    mw = 50 + len(smiles) * 5  # Mock molecular weight
    logp = -2 + len(smiles) * 0.1  # Mock logP
    qed = 0.5 + (len(smiles) % 10) * 0.05  # Mock QED
    sas = 3.0  # Mock SAS score
    return [mw, logp, qed, sas]

# Load trained model
model = joblib.load('model/atomiq_model.pkl')

@app.route('/')
def home():
    return jsonify({'message': 'Atom IQ API running'})

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.get_json(force=True)
        smiles = (data.get('smiles') or '').strip()
        if not smiles:
            return jsonify({'error': 'SMILES required'}), 400

        desc = calculate_descriptors(smiles)
        if not desc:
            return jsonify({'error': 'Invalid SMILES'}), 400

        features = np.array([desc], dtype=float)
        prediction = int(model.predict(features)[0])
        probability = float(model.predict_proba(features)[0][1])
        risk_score = round(probability * 100, 2)
        category = 'Very Toxic' if risk_score > 80 else 'High Risk' if risk_score > 60 else 'Moderate' if risk_score > 40 else 'Safe' if risk_score > 20 else 'Very Safe'

        return jsonify({
            'prediction': prediction,
            'probability': probability,
            'risk_score': risk_score,
            'category': category,
            'mw': desc[0], 'logp': desc[1], 'qed': desc[2], 'sas': desc[3],
            'feature_importance': list(model.feature_importances_)
        })
    except Exception as e:
        return jsonify({'error': 'Internal Server Error', 'detail': str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True, host='127.0.0.1', port=5000)

# Download Tox21 data
url = "https://raw.githubusercontent.com/deepchem/deepchem/master/datasets/tox21.csv"
df = pd.read_csv(url)
df.to_csv(r"c:\Users\College Stuff\atomiq\tox21_sample.csv", index=False)
print("Downloaded Tox21 data")