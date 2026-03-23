import pandas as pd
import numpy as np

# Create synthetic Tox21-like data
np.random.seed(42)
n_samples = 100

# Simple mock SMILES (just for demo)
smiles_list = ['CCO', 'CC(=O)O', 'c1ccccc1', 'CC(C)O', 'C1CCCCC1', 'CC(C)C', 
               'CCCCC', 'c1ccccc1O', 'CC(=O)N', 'CCN', 'CCC', 'CC', 'C',
               'CC(C)C(=O)O', 'c1ccc(O)cc1', 'CC(C)Cl'] * 7  # Repeat to get 100+ samples

smiles_list = smiles_list[:n_samples]

# Mock activity labels (0=inactive, 1=active/toxic)
activity = np.random.binomial(1, 0.3, n_samples)

df = pd.DataFrame({
    'smiles': smiles_list,
    'label': activity
})

df.to_csv(r'c:\Users\College Stuff\atomiq\tox21_sample.csv', index=False)
print(f"Created mock Tox21 data with {len(df)} samples")
print(df.head())
