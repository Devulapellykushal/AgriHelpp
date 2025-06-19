import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useAuth } from '../context/AuthContext';
import './CropHealth.css';

const CropHealth = () => {
  const { t } = useTranslation();
  const { user } = useAuth();
  
  // State management
  const [selectedFile, setSelectedFile] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState(null);

  // Handle file selection
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/bmp'];
      if (!allowedTypes.includes(file.type)) {
        setError('Please select a valid image file (JPG, PNG, GIF, BMP)');
        return;
      }

      // Validate file size (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        setError('File size must be less than 5MB');
        return;
      }

      setSelectedFile(file);
      setError(null);
      setPrediction(null);

      // Create preview URL
      const reader = new FileReader();
      reader.onload = (e) => {
        setPreviewUrl(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle form submission
  const handleSubmit = async (event) => {
    event.preventDefault();
    
    if (!selectedFile) {
      setError('Please select an image file first');
      return;
    }

    setIsLoading(true);
    setError(null);
    setPrediction(null);

    try {
      // Create FormData for file upload
      const formData = new FormData();
      formData.append('image', selectedFile);

      // Make API call to backend
      const response = await fetch('http://localhost:5001/api/predict_crop_health', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to predict crop health');
      }

      setPrediction(data);
      
    } catch (err) {
      setError(err.message || 'An error occurred while processing the image');
    } finally {
      setIsLoading(false);
    }
  };

  // Reset form
  const handleReset = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    setPrediction(null);
    setError(null);
  };

  // Get status color based on health
  const getStatusColor = (isHealthy) => {
    return isHealthy ? '#4CAF50' : '#f44336';
  };

  // Get status icon based on health
  const getStatusIcon = (isHealthy) => {
    return isHealthy ? '🌱' : '⚠️';
  };

  return (
    <div className="crop-health-container">
      <div className="crop-health-header">
        <h1>🌾 Crop Health Analysis</h1>
        <p className="welcome-message">
          Welcome, {user?.email}! Upload a leaf or crop image to analyze its health.
        </p>
      </div>

      <div className="crop-health-content">
        {/* Upload Section */}
        <div className="upload-section">
          <h2>📸 Upload Image</h2>
          <form onSubmit={handleSubmit} className="upload-form">
            <div className="file-input-container">
              <input
                type="file"
                id="image-upload"
                accept="image/*"
                onChange={handleFileSelect}
                className="file-input"
                disabled={isLoading}
              />
              <label htmlFor="image-upload" className="file-input-label">
                {selectedFile ? selectedFile.name : 'Choose an image file...'}
              </label>
            </div>

            {/* Image Preview */}
            {previewUrl && (
              <div className="image-preview">
                <h3>Image Preview:</h3>
                <img 
                  src={previewUrl} 
                  alt="Preview" 
                  className="preview-image"
                />
              </div>
            )}

            {/* Action Buttons */}
            <div className="action-buttons">
              <button 
                type="submit" 
                className="analyze-btn"
                disabled={!selectedFile || isLoading}
              >
                {isLoading ? '🔍 Analyzing...' : '🔍 Analyze Crop Health'}
              </button>
              
              <button 
                type="button" 
                className="reset-btn"
                onClick={handleReset}
                disabled={isLoading}
              >
                🔄 Reset
              </button>
            </div>
          </form>
        </div>

        {/* Error Display */}
        {error && (
          <div className="error-message">
            <span className="error-icon">❌</span>
            <p>{error}</p>
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="loading-state">
            <div className="loading-spinner"></div>
            <p>Analyzing your crop image...</p>
            <p className="loading-note">This may take a few seconds</p>
          </div>
        )}

        {/* Results Section */}
        {prediction && (
          <div className="results-section">
            <h2>📊 Analysis Results</h2>
            
            <div className="prediction-card">
              <div 
                className="prediction-header"
                style={{ borderColor: getStatusColor(prediction.is_healthy) }}
              >
                <span className="status-icon">
                  {getStatusIcon(prediction.is_healthy)}
                </span>
                <h3>
                  {prediction.is_healthy ? 'Healthy Plant' : 'Disease Detected'}
                </h3>
              </div>

              <div className="prediction-details">
                <div className="detail-row">
                  <span className="detail-label">Crop:</span>
                  <span className="detail-value">{prediction.crop_name}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Condition:</span>
                  <span className="detail-value">{prediction.disease_name}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Confidence:</span>
                  <span className="detail-value">
                    {prediction.confidence}%
                  </span>
                </div>
              </div>

              <div className="prediction-message">
                <p>{prediction.message}</p>
              </div>

              {/* Recommendations */}
              <div className="recommendations">
                <h4>💡 Recommendations:</h4>
                {prediction.is_healthy ? (
                  <ul>
                    <li>Continue with your current care routine</li>
                    <li>Monitor for any changes in appearance</li>
                    <li>Maintain proper watering and fertilization</li>
                  </ul>
                ) : (
                  <ul>
                    <li>Consider consulting with an agriculture expert</li>
                    <li>Research treatment options for {prediction.disease_name}</li>
                    <li>Monitor other plants in the area for similar symptoms</li>
                    <li>Consider preventive measures for future crops</li>
                  </ul>
                )}
              </div>
            </div>
          </div>
        )}

        {/* Information Section */}
        <div className="info-section">
          <h2>ℹ️ How It Works</h2>
          <div className="info-grid">
            <div className="info-card">
              <h3>📸 Upload</h3>
              <p>Take a clear photo of the leaf or crop you want to analyze</p>
            </div>
            <div className="info-card">
              <h3>🤖 AI Analysis</h3>
              <p>Our deep learning model analyzes the image for disease patterns</p>
            </div>
            <div className="info-card">
              <h3>📊 Results</h3>
              <p>Get instant results with confidence scores and recommendations</p>
            </div>
          </div>
          
          <div className="tips-section">
            <h3>💡 Tips for Best Results:</h3>
            <ul>
              <li>Use good lighting and clear focus</li>
              <li>Include the entire leaf or affected area</li>
              <li>Avoid shadows or reflections</li>
              <li>Supported formats: JPG, PNG, GIF, BMP (max 5MB)</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CropHealth; 