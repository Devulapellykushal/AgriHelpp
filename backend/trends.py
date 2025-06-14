# trends.py
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
import xgboost as xgb
import joblib
import os
import logging

logging.basicConfig(level=logging.INFO)

class CropTrends:
    def __init__(self, data_path):
        self.df = pd.read_csv(data_path)
        self.scalers = {}
        self.models = {}
        self.main_crops = [
            'RICE', 'WHEAT', 'KHARIF SORGHUM', 'RABI SORGHUM', 'PEARL MILLET', 'MAIZE',
            'FINGER MILLET', 'BARLEY', 'CHICKPEA', 'PIGEONPEA', 'MINOR PULSES',
            'GROUNDNUT', 'SESAMUM', 'RAPESEED AND MUSTARD', 'SAFFLOWER', 'CASTOR',
            'LINSEED', 'SUNFLOWER', 'SOYABEAN', 'OILSEEDS', 'SUGARCANE', 'COTTON',
            'FRUITS', 'VEGETABLES', 'POTATOES', 'ONION', 'FODDER'
        ]
        self.initialize_models()

    def initialize_models(self):
        for crop in self.main_crops:
            try:
                model_file = f"model_{crop}.joblib"
                scaler_file = f"scaler_{crop}.joblib"
                if os.path.exists(model_file) and os.path.exists(scaler_file):
                    self.models[crop] = joblib.load(model_file)
                    self.scalers[crop] = joblib.load(scaler_file)
                else:
                    self.train_model(crop)
            except Exception as e:
                logging.error(f"Initialization error for {crop}: {e}")

    def train_model(self, crop_name):
        try:
            features = [f"{crop_name} AREA (1000 ha)", f"{crop_name} PRODUCTION (1000 tons)", 'Year']
            target = f"{crop_name} YIELD (Kg per ha)"

            if not all(col in self.df.columns for col in features + [target]):
                logging.warning(f"Skipping model training for {crop_name}, missing columns.")
                return

            crop_df = self.df.dropna(subset=features + [target])
            X = crop_df[features]
            y = crop_df[target]

            scaler = StandardScaler()
            X_scaled = scaler.fit_transform(X)

            model = xgb.XGBRegressor(n_estimators=100, learning_rate=0.1, max_depth=5, random_state=42)
            model.fit(X_scaled, y)

            joblib.dump(model, f"model_{crop_name}.joblib")
            joblib.dump(scaler, f"scaler_{crop_name}.joblib")

            self.models[crop_name] = model
            self.scalers[crop_name] = scaler

        except Exception as e:
            logging.error(f"Training error for {crop_name}: {e}")

    def get_crop_trends(self, crop_name, state_name=None, year=None):
        try:
            def normalize(s):
                return str(s).strip().lower().replace(' ', '').replace('_', '')

            crop_name = crop_name.upper()
            filtered_df = self.df.copy()

            if state_name:
                filtered_df = filtered_df[
                    filtered_df['State Name'].apply(normalize) == normalize(state_name)
                ]
            if year:
                filtered_df = filtered_df[filtered_df['Year'] == int(year)]

            area_col = f"{crop_name} AREA (1000 ha)"
            production_col = f"{crop_name} PRODUCTION (1000 tons)"
            yield_col = f"{crop_name} YIELD (Kg per ha)"

            if not all(col in filtered_df.columns for col in [area_col, production_col, yield_col]):
                return None

            trend_data = {
                'area': filtered_df[['Year', area_col]].rename(columns={area_col: 'value'}).to_dict('records'),
                'production': filtered_df[['Year', production_col]].rename(columns={production_col: 'value'}).to_dict('records'),
                'yield': filtered_df[['Year', yield_col]].rename(columns={yield_col: 'value'}).to_dict('records')
            }

            if crop_name in self.models:
                try:
                    X_pred = filtered_df[[area_col, production_col, 'Year']]
                    X_pred_scaled = self.scalers[crop_name].transform(X_pred)
                    predictions = self.models[crop_name].predict(X_pred_scaled)
                    trend_data['predictions'] = [
                        {'Year': int(year), 'value': float(pred)}
                        for year, pred in zip(filtered_df['Year'], predictions)
                    ]
                except Exception as e:
                    logging.warning(f"Prediction error for {crop_name}: {e}")

            return trend_data

        except Exception as e:
            logging.error(f"Trend extraction error: {e}")
            return None