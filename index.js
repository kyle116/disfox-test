const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const app = express();
const dotenv = require('dotenv').config();
const users = require('./routes/users');
const reminders = require('./routes/reminders');
const cors = require('cors');
const path = require('path');

// Bodyparser Middleware
app.use(express.static(path.join(__dirname, '../client/build')));
app.use(cors());
app.use(bodyParser.json());

// Connect to Mongo
const mongoUrl = (process.env.MONGO_URL || 'mongodb://localhost/disneydb');
mongoose.connect(mongoUrl, { 
    useNewUrlParser: true,
    useCreateIndex: true,
    useUnifiedTopology: true,
    useFindAndModify: false
  })
  .then(() => console.log('MongoDB Connected...'))
  .catch(err => console.log(err));

// Routes
app.use('/users', users);
app.use('/reminders', reminders);

// Port
const port = process.env.PORT || 3001;

app.get('*', (req, res) => {
	res.sendFile(path.join(__dirname + '../client/build/index.html'));
});
app.listen(port, () => console.log(`Server started on port ${port}`));