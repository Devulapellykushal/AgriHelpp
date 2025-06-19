#!/usr/bin/env python3
"""
Test script for Crop Health Prediction API
This script tests the /api/predict_crop_health endpoint
"""

import requests
import json
import os

def test_crop_health_api():
    """Test the crop health prediction API"""
    
    # API endpoint
    url = "http://localhost:5001/api/predict_crop_health"
    
    print("🧪 Testing Crop Health Prediction API")
    print("=" * 50)
    
    # Test 1: No file provided
    print("\n1️⃣ Testing with no file...")
    try:
        response = requests.post(url)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 2: Invalid file type
    print("\n2️⃣ Testing with invalid file type...")
    try:
        files = {'image': ('test.txt', 'This is not an image', 'text/plain')}
        response = requests.post(url, files=files)
        print(f"Status Code: {response.status_code}")
        print(f"Response: {response.json()}")
    except Exception as e:
        print(f"Error: {e}")
    
    # Test 3: Check if server is running
    print("\n3️⃣ Testing server connectivity...")
    try:
        response = requests.get("http://localhost:5001/")
        print(f"Server Status: {response.status_code}")
    except requests.exceptions.ConnectionError:
        print("❌ Server not running. Please start the Flask backend first.")
        print("💡 Run: cd backend && python app.py")
        return False
    except Exception as e:
        print(f"Error: {e}")
    
    print("\n✅ Test completed!")
    print("\n📝 To test with a real image:")
    print("   curl -X POST -F 'image=@path/to/your/image.jpg' http://localhost:5001/api/predict_crop_health")
    
    return True

if __name__ == "__main__":
    test_crop_health_api() 