import {
    CheckCircle,
    CloudUpload,
    Description,
    Download,
    History,
    Info,
    Lightbulb,
    PhotoCamera,
    Share,
    Warning
} from '@mui/icons-material';
import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    List,
    ListItem,
    ListItemIcon,
    ListItemText,
    Paper,
    Typography
} from '@mui/material';
import React, { useRef, useState } from 'react';
import './CropHealth.css';

const CropHealth = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [previewUrl, setPreviewUrl] = useState(null);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState(null);
  const [showHistory, setShowHistory] = useState(false);
  const fileInputRef = useRef(null);

  // Mock analysis history
  const analysisHistory = [
    {
      id: 1,
      date: '2024-01-15',
      crop: 'Tomato',
      disease: 'Early Blight',
      severity: 'Moderate',
      image: 'https://via.placeholder.com/100x100/ff6b6b/ffffff?text=TB',
      status: 'Resolved'
    },
    {
      id: 2,
      date: '2024-01-10',
      crop: 'Wheat',
      disease: 'Rust',
      severity: 'High',
      image: 'https://via.placeholder.com/100x100/ffa726/ffffff?text=WR',
      status: 'Under Treatment'
    },
    {
      id: 3,
      date: '2024-01-05',
      crop: 'Rice',
      disease: 'Bacterial Blight',
      severity: 'Low',
      image: 'https://via.placeholder.com/100x100/66bb6a/ffffff?text=RB',
      status: 'Resolved'
    }
  ];

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file && file.type.startsWith('image/')) {
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onload = (e) => setPreviewUrl(e.target.result);
      reader.readAsDataURL(file);
      setAnalysisResult(null);
    }
  };

  const handleCameraCapture = () => {
    fileInputRef.current.click();
  };

  const analyzeImage = async () => {
    if (!selectedImage) return;

    setIsAnalyzing(true);
    
    // Simulate API call delay
    setTimeout(() => {
      // Mock analysis result
      const mockResult = {
        crop: 'Tomato',
        disease: 'Early Blight',
        confidence: 94.5,
        severity: 'Moderate',
        description: 'Early blight is a common fungal disease that affects tomato plants, causing dark brown spots with concentric rings on leaves, stems, and fruits.',
        symptoms: [
          'Dark brown spots with concentric rings',
          'Yellowing of leaves around spots',
          'Premature leaf drop',
          'Fruit lesions with leathery texture'
        ],
        recommendations: [
          'Remove and destroy infected plant debris',
          'Apply fungicide containing chlorothalonil or copper',
          'Improve air circulation around plants',
          'Avoid overhead watering',
          'Maintain proper plant spacing'
        ],
        prevention: [
          'Use disease-resistant tomato varieties',
          'Rotate crops annually',
          'Mulch around plants to prevent soil splash',
          'Monitor plants regularly for early signs',
          'Maintain balanced soil fertility'
        ],
        treatment: {
          organic: [
            'Neem oil spray (1-2% solution)',
            'Baking soda solution (1 tbsp per gallon)',
            'Copper-based fungicides',
            'Remove infected leaves immediately'
          ],
          chemical: [
            'Chlorothalonil (Bravo, Daconil)',
            'Copper fungicides (Kocide, Cuprofix)',
            'Mancozeb (Dithane, Manzate)',
            'Apply every 7-14 days as needed'
          ]
        },
        riskLevel: 'Medium',
        estimatedLoss: '15-25% yield reduction if untreated'
      };

      setAnalysisResult(mockResult);
      setIsAnalyzing(false);
    }, 3000);
  };

  const getSeverityColor = (severity) => {
    switch (severity.toLowerCase()) {
      case 'low': return 'success';
      case 'moderate': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  const getRiskLevelColor = (risk) => {
    switch (risk.toLowerCase()) {
      case 'low': return 'success';
      case 'medium': return 'warning';
      case 'high': return 'error';
      default: return 'default';
    }
  };

  return (
    <div className="crop-health-container">
      <Box sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom sx={{ color: '#2e7d32', fontWeight: 'bold' }}>
          <PhotoCamera sx={{ mr: 2, verticalAlign: 'middle' }} />
          Crop Health Analysis
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
          Upload a photo of your crop to detect diseases and get personalized recommendations
        </Typography>

        <Grid container spacing={3}>
          {/* Upload Section */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                  <CloudUpload sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Upload Crop Photo
                </Typography>
                
                <Box sx={{ textAlign: 'center', py: 4 }}>
                  {previewUrl ? (
                    <Box sx={{ position: 'relative', display: 'inline-block' }}>
                      <img 
                        src={previewUrl} 
                        alt="Crop preview" 
                        style={{ 
                          maxWidth: '100%', 
                          maxHeight: '300px', 
                          borderRadius: '8px',
                          border: '2px solid #4caf50'
                        }} 
                      />
                      <Button
                        variant="contained"
                        color="error"
                        size="small"
                        sx={{ position: 'absolute', top: 8, right: 8 }}
                        onClick={() => {
                          setSelectedImage(null);
                          setPreviewUrl(null);
                          setAnalysisResult(null);
                        }}
                      >
                        Remove
                      </Button>
                    </Box>
                  ) : (
                    <Box
                      sx={{
                        border: '2px dashed #ccc',
                        borderRadius: '8px',
                        p: 4,
                        textAlign: 'center',
                        cursor: 'pointer',
                        '&:hover': {
                          borderColor: '#4caf50',
                          backgroundColor: '#f8f9fa'
                        }
                      }}
                      onClick={() => fileInputRef.current.click()}
                    >
                      <CloudUpload sx={{ fontSize: 48, color: '#ccc', mb: 2 }} />
                      <Typography variant="h6" color="text.secondary" gutterBottom>
                        Click to upload or drag and drop
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        Supports JPG, PNG, GIF up to 10MB
                      </Typography>
                    </Box>
                  )}
                </Box>

                <input
                  type="file"
                  ref={fileInputRef}
                  accept="image/*"
                  onChange={handleImageUpload}
                  style={{ display: 'none' }}
                />

                <Box sx={{ display: 'flex', gap: 2, justifyContent: 'center' }}>
                  <Button
                    variant="contained"
                    startIcon={<PhotoCamera />}
                    onClick={handleCameraCapture}
                    sx={{ backgroundColor: '#2196f3' }}
                  >
                    Take Photo
                  </Button>
                  <Button
                    variant="contained"
                    startIcon={<CloudUpload />}
                    onClick={() => fileInputRef.current.click()}
                    sx={{ backgroundColor: '#4caf50' }}
                  >
                    Choose File
                  </Button>
                </Box>

                {selectedImage && (
                  <Box sx={{ mt: 2, textAlign: 'center' }}>
                    <Button
                      variant="contained"
                      onClick={analyzeImage}
                      disabled={isAnalyzing}
                      startIcon={isAnalyzing ? <CircularProgress size={20} /> : <Description />}
                      sx={{ 
                        backgroundColor: '#ff9800',
                        '&:hover': { backgroundColor: '#f57c00' }
                      }}
                    >
                      {isAnalyzing ? 'Analyzing...' : 'Analyze Crop Health'}
                    </Button>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>

          {/* Analysis Results */}
          <Grid item xs={12} md={6}>
            <Card elevation={3} sx={{ height: '100%' }}>
              <CardContent>
                <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                  <Description sx={{ mr: 1, verticalAlign: 'middle' }} />
                  Analysis Results
                </Typography>

                {isAnalyzing && (
                  <Box sx={{ textAlign: 'center', py: 4 }}>
                    <CircularProgress size={60} sx={{ color: '#4caf50', mb: 2 }} />
                    <Typography variant="h6" color="text.secondary">
                      Analyzing your crop image...
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      This may take a few moments
                    </Typography>
                  </Box>
                )}

                {analysisResult && (
                  <Box>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      <Typography variant="body2">
                        <strong>Confidence:</strong> {analysisResult.confidence}%
                      </Typography>
                    </Alert>

                    <Box sx={{ mb: 3 }}>
                      <Typography variant="h6" gutterBottom>
                        {analysisResult.crop} - {analysisResult.disease}
                      </Typography>
                      <Chip 
                        label={analysisResult.severity} 
                        color={getSeverityColor(analysisResult.severity)}
                        sx={{ mr: 1 }}
                      />
                      <Chip 
                        label={`Risk: ${analysisResult.riskLevel}`} 
                        color={getRiskLevelColor(analysisResult.riskLevel)}
                      />
                    </Box>

                    <Typography variant="body2" paragraph>
                      {analysisResult.description}
                    </Typography>

                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                      <Warning sx={{ mr: 1, verticalAlign: 'middle', color: '#ff9800' }} />
                      Symptoms
                    </Typography>
                    <List dense>
                      {analysisResult.symptoms.map((symptom, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <CheckCircle sx={{ fontSize: 16, color: '#ff9800' }} />
                          </ListItemIcon>
                          <ListItemText primary={symptom} />
                        </ListItem>
                      ))}
                    </List>

                    <Divider sx={{ my: 2 }} />

                    <Typography variant="subtitle1" gutterBottom sx={{ fontWeight: 'bold' }}>
                      <Lightbulb sx={{ mr: 1, verticalAlign: 'middle', color: '#4caf50' }} />
                      Immediate Recommendations
                    </Typography>
                    <List dense>
                      {analysisResult.recommendations.map((rec, index) => (
                        <ListItem key={index} sx={{ py: 0.5 }}>
                          <ListItemIcon sx={{ minWidth: 30 }}>
                            <Info sx={{ fontSize: 16, color: '#4caf50' }} />
                          </ListItemIcon>
                          <ListItemText primary={rec} />
                        </ListItem>
                      ))}
                    </List>

                    <Box sx={{ mt: 2, display: 'flex', gap: 1 }}>
                      <Button
                        variant="outlined"
                        startIcon={<Download />}
                        size="small"
                      >
                        Download Report
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<Share />}
                        size="small"
                      >
                        Share
                      </Button>
                    </Box>
                  </Box>
                )}

                {!isAnalyzing && !analysisResult && (
                  <Box sx={{ textAlign: 'center', py: 4, color: 'text.secondary' }}>
                    <Description sx={{ fontSize: 48, mb: 2 }} />
                    <Typography variant="h6" gutterBottom>
                      No Analysis Yet
                    </Typography>
                    <Typography variant="body2">
                      Upload a crop photo and click "Analyze Crop Health" to get started
                    </Typography>
                  </Box>
                )}
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Detailed Recommendations and Prevention */}
        {analysisResult && (
          <Grid container spacing={3} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                    <Lightbulb sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Treatment Options
                  </Typography>
                  
                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                    Organic Solutions
                  </Typography>
                  <List dense>
                    {analysisResult.treatment.organic.map((treatment, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                        </ListItemIcon>
                        <ListItemText primary={treatment} />
                      </ListItem>
                    ))}
                  </List>

                  <Typography variant="subtitle2" gutterBottom sx={{ fontWeight: 'bold', mt: 2 }}>
                    Chemical Solutions
                  </Typography>
                  <List dense>
                    {analysisResult.treatment.chemical.map((treatment, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <Info sx={{ fontSize: 16, color: '#2196f3' }} />
                        </ListItemIcon>
                        <ListItemText primary={treatment} />
                      </ListItem>
                    ))}
                  </List>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card elevation={3}>
                <CardContent>
                  <Typography variant="h6" gutterBottom sx={{ color: '#2e7d32' }}>
                    <Info sx={{ mr: 1, verticalAlign: 'middle' }} />
                    Future Prevention
                  </Typography>
                  
                  <List dense>
                    {analysisResult.prevention.map((prevention, index) => (
                      <ListItem key={index} sx={{ py: 0.5 }}>
                        <ListItemIcon sx={{ minWidth: 30 }}>
                          <CheckCircle sx={{ fontSize: 16, color: '#4caf50' }} />
                        </ListItemIcon>
                        <ListItemText primary={prevention} />
                      </ListItem>
                    ))}
                  </List>

                  <Alert severity="warning" sx={{ mt: 2 }}>
                    <Typography variant="body2">
                      <strong>Estimated Loss:</strong> {analysisResult.estimatedLoss}
                    </Typography>
                  </Alert>
                </CardContent>
              </Card>
            </Grid>
          </Grid>
        )}

        {/* Analysis History */}
        <Card elevation={3} sx={{ mt: 3 }}>
          <CardContent>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
              <Typography variant="h6" sx={{ color: '#2e7d32' }}>
                <History sx={{ mr: 1, verticalAlign: 'middle' }} />
                Analysis History
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setShowHistory(!showHistory)}
                size="small"
              >
                {showHistory ? 'Hide' : 'Show'} History
              </Button>
            </Box>

            {showHistory && (
              <Grid container spacing={2}>
                {analysisHistory.map((item) => (
                  <Grid item xs={12} sm={6} md={4} key={item.id}>
                    <Paper elevation={1} sx={{ p: 2, cursor: 'pointer', '&:hover': { elevation: 3 } }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <img 
                          src={item.image} 
                          alt={item.crop}
                          style={{ width: 40, height: 40, borderRadius: '4px', marginRight: 12 }}
                        />
                        <Box>
                          <Typography variant="subtitle2" sx={{ fontWeight: 'bold' }}>
                            {item.crop}
                          </Typography>
                          <Typography variant="caption" color="text.secondary">
                            {item.date}
                          </Typography>
                        </Box>
                      </Box>
                      <Typography variant="body2" gutterBottom>
                        {item.disease}
                      </Typography>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <Chip 
                          label={item.severity} 
                          color={getSeverityColor(item.severity)}
                          size="small"
                        />
                        <Chip 
                          label={item.status} 
                          color={item.status === 'Resolved' ? 'success' : 'warning'}
                          size="small"
                        />
                      </Box>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
            )}
          </CardContent>
        </Card>
      </Box>
    </div>
  );
};

export default CropHealth; 