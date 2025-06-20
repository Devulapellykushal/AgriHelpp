# agents/ndvi_agent.py

import random

def get_ndvi_analysis(class_name: str) -> dict:
    """
    Simulates an NDVI (Normalized Difference Vegetation Index) score based on the health of the plant.
    In a real-world scenario, this would involve processing near-infrared and red light data from a specialized camera.
    
    NDVI values range from -1 to +1.
    - Healthy vegetation: 0.5 to 0.9
    - Stressed/unhealthy vegetation: 0.1 to 0.4
    - Non-vegetation (water, soil): < 0.1
    """
    disease = class_name.split('___')[1] if '___' in class_name else class_name
    is_healthy = "healthy" in disease.lower()

    if is_healthy:
        # Simulate a high NDVI score for healthy plants
        ndvi_score = round(random.uniform(0.75, 0.90), 2)
        interpretation = "The plant appears to have vigorous, healthy vegetation."
    else:
        # Simulate a lower NDVI score for stressed or diseased plants
        ndvi_score = round(random.uniform(0.20, 0.50), 2)
        interpretation = "The plant shows signs of stress, which could indicate disease or nutrient deficiency."

    return {
        "title": "Vegetation Index Analysis (Simulated NDVI)",
        "score": ndvi_score,
        "interpretation": interpretation,
        "details": "This NDVI score is a simulation based on the visual prediction. Higher values typically correlate with denser, healthier vegetation."
    } 