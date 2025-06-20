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
      formData.append('file', selectedFile);

      // Make API call to backend
      const response = await fetch('http://localhost:5002/predict', {
        method: 'POST',
        body: formData,
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to predict crop health');
      }
      
      // Store the full enriched JSON response in the state
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
                style={{ borderColor: getStatusColor(prediction.prediction.is_healthy) }}
              >
                <span className="status-icon">
                  {getStatusIcon(prediction.prediction.is_healthy)}
                </span>
                <h3>
                  {prediction.prediction.is_healthy ? 'Healthy Plant' : 'Disease Detected'}
                </h3>
              </div>

              <div className="prediction-details">
                <div className="detail-row">
                  <span className="detail-label">Crop:</span>
                  <span className="detail-value">{prediction.prediction.crop}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Condition:</span>
                  <span className="detail-value">{prediction.prediction.disease}</span>
                </div>
                
                <div className="detail-row">
                  <span className="detail-label">Confidence:</span>
                  <span className="detail-value">
                    {prediction.prediction.confidence}
                  </span>
                </div>
              </div>

              <div className="prediction-message">
                <p>{prediction.advisory.title}</p>
              </div>

              {/* Recommendations */}
              <div className="recommendations">
                <h4>💡 {prediction.prediction.is_healthy ? "Preventive Care:" : "Treatment Plan:"}</h4>
                {prediction.advisory.steps && prediction.advisory.steps.length > 0 ? (
                  <ul>
                    {prediction.advisory.steps.map((step, index) => (
                      <li key={index}>{step}</li>
                    ))}
                  </ul>
                ) : (
                  <p>No specific recommendations available.</p>
                )}
              </div>
            </div>

            {/* Vegetation Index Section */}
            {prediction.vegetation_index && (
              <div className="info-card-new">
                <h3>📈 {prediction.vegetation_index.title}</h3>
                <div className="ndvi-card">
                  <div className="ndvi-score-container">
                    <span className="ndvi-score">{prediction.vegetation_index.score}</span>
                    <span className="ndvi-label">NDVI Score</span>
                  </div>
                  <div className="ndvi-details">
                    <p><strong>Interpretation:</strong> {prediction.vegetation_index.interpretation}</p>
                    <p className="details-text">{prediction.vegetation_index.details}</p>
                  </div>
                </div>
              </div>
            )}

            {/* Support Services Section */}
            {prediction.support_services && (
              <div className="info-card-new">
                <h3>🤝 Support Services</h3>
                {/* Financial Benefits */}
                {prediction.support_services.financial_benefits && prediction.support_services.financial_benefits.schemes.length > 0 &&
                  <div className="support-card">
                    <h4>💰 {prediction.support_services.financial_benefits.title}</h4>
                    <ul>
                        {prediction.support_services.financial_benefits.schemes.map(scheme => (
                            <li key={scheme.name}><strong>{scheme.name}:</strong> {scheme.description}</li>
                        ))}
                    </ul>
                  </div>
                }
                {/* Local Experts */}
                 {prediction.support_services.local_experts && prediction.support_services.local_experts.contacts.length > 0 &&
                  <div className="support-card">
                    <h4>🧑‍🔬 {prediction.support_services.local_experts.title}</h4>
                    <ul>
                        {prediction.support_services.local_experts.contacts.map(contact => (
                             <li key={contact.name}>{contact.name} - {contact.phone} ({contact.location})</li>
                        ))}
                    </ul>
                  </div>
                 }
              </div>
            )}
            
            {/* Community Insights */}
            {prediction.community_insights && prediction.community_insights.insights.length > 0 && (
              <div className="info-card-new">
                <h3>👨‍🌾 Community Insights</h3>
                <div className="insight-card">
                    <h4>{prediction.community_insights.title}</h4>
                    <ul>
                        {prediction.community_insights.insights.map((insight, index) => (
                            <li key={index}>{insight}</li>
                        ))}
                    </ul>
                </div>
              </div>
            )}

            {/* Sustainability Tips */}
            {prediction.sustainability_tips && prediction.sustainability_tips.tips.length > 0 && (
              <div className="info-card-new">
                <h3>🌱 Sustainability Tips</h3>
                 <div className="sustainability-card">
                     <h4>{prediction.sustainability_tips.title}</h4>
                    <ul>
                        {prediction.sustainability_tips.tips.map((tip, index) => (
                            <li key={index}>{tip}</li>
                        ))}
                    </ul>
                </div>
              </div>
            )}
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