    const express = require('express');
    const mongoose = require('mongoose');
    const cors = require('cors');
    const bodyParser = require('body-parser');
    const userRoutes = require('./routes/UserRoutes');
    require('dotenv').config();

    const app = express();
    const PORT = process.env.PORT || 5000;

    // Middleware
    app.use(cors({
        origin: 'http://localhost:5173', // Allow requests from this specific origin
        methods: ['GET', 'POST', 'PUT', 'DELETE'], // Allow specific HTTP methods
        allowedHeaders: ['Content-Type'] // Allow specific headers
      }));
      
    app.use(bodyParser.json());

    // MongoDB Connection
    mongoose.connect(process.env.MONGO_URI)
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.error(err));

    // Routes
    app.use('/api/users', userRoutes);

    // Start Server
    app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
