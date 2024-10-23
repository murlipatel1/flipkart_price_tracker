
// app.js
const express = require('express');
// const connectDB = require('./config/database');
const productRoutes = require('./routes/productRoutes');
const mongoose = require('mongoose');
// const { configDotenv } = require('dotenv');
const app = express();


// Connect to MongoDB
const connectDB = async () => {
    try {
      await mongoose.connect("mongodb://localhost:27017/flipkartPriceTracker", {
        useNewUrlParser: true,
        useUnifiedTopology: true
      });
      console.log('MongoDB connected successfully');
    } catch (error) {
      console.error('MongoDB connection error:', error);
      process.exit(1);
    }
  };


connectDB();

app.use(express.json());
app.use('/api', productRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});