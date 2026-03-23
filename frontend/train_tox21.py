import pandas as pd
import joblib
import numpy as np
from sklearn.ensemble import RandomForestClassifier

# Mock descriptors - no rdkit needed for demo
def calculate_descriptors(smiles):
    # Simulate descriptors based on SMILES length (mock)
    if not smiles or len(smiles) == 0:
        return None
    mw = 50 + len(smiles) * 5  # Mock molecular weight
    logp = -2 + len(smiles) * 0.1  # Mock logP
    qed = 0.5 + (len(smiles) % 10) * 0.05  # Mock QED
    sas = 3.0  # Mock SAS score
    return [mw, logp, qed, sas]

# Load Tox21 CSV (adjust path/columns as needed)
df = pd.read_csv(r'c:\Users\College Stuff\atomiq\tox21_sample.csv')
print(f"DataFrame columns: {df.columns.tolist()}")
print(f"DataFrame shape: {df.shape}")

# Find the label column (could be 'label', 'target', 'activity', etc.)
label_col = None
for col in ['label', 'target', 'activity', 'SR.ARE', 'SR.AT', 'SR.ER', 'SR.hERG']:
    if col in df.columns:
        label_col = col
        break

if label_col is None:
    print(f"Warning: Could not auto-detect label column. Using first numeric column.")
    # Use first numeric column
    for col in df.select_dtypes(include=[np.number]).columns:
        label_col = col
        break

print(f"Using label column: {label_col}")

# Ensure SMILES column exists
if 'smiles' not in df.columns:
    if 'SMILES' in df.columns:
        df['smiles'] = df['SMILES']
    else:
        print("Error: No 'smiles' column found!")
        exit(1)

df = df.dropna(subset=['smiles', label_col])
df['desc'] = df['smiles'].apply(calculate_descriptors)
df = df[df['desc'].notna()]

X = np.array(list(df['desc']))
y = df[label_col].astype(int).values

if len(X) == 0:
    print("Error: No valid training data!")
    exit(1)

print(f"Training data size: {X.shape}")
clf = RandomForestClassifier(n_estimators=100, random_state=42)
clf.fit(X, y)
joblib.dump(clf, 'model/atomiq_model.pkl')
print("Model trained and saved.")