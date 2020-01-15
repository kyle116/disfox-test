const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const users = require('./routes/users');
const cors = require('cors');

// Bodyparser Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to Mongo
const mongoUrl = (process.env.MONGO_URL || 'mongodb://localhost/disneydb');
mongoose.connect(mongoUrl, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/users', users);

// Port
const port = process.env.PORT || 3001;

app.listen(port, () => console.log(`Server started on port ${port}`));