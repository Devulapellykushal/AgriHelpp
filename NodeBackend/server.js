const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const authRoutes = require('./Routes/auth');
const adminRoutes = require('./Routes/admin');

const app = express();

app.use(cors());
app.use(express.json());

const MONGO_URI = 'mongodb+srv://dev:test1234@cluster0.yeftyle.mongodb.net/AgriDB?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => {
    console.log('✅ Connected to MongoDB');
})
.catch((error) => {
    console.error('❌ MongoDB connection error:', error);
});

// Log all incoming requests
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});

app.use('/api/auth', authRoutes);
app.use('/api/admin', adminRoutes);

const PORT = 5005;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
