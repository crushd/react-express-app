const express = require('express');
const bodyParser = require('body-parser')
const path = require('path');
const PORT = process.env.PORT || 8080;
const app = express();

app.use(express.static(path.join(__dirname, 'build')));

const routes = require("./routes/api");

// Express only serves static assets in production
if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

// Middleware
app.use(express.urlencoded({ extended: false }));
app.use(express.json());

const mongoose = require('mongoose');
const mongo_uri = 'mongodb://localhost/react-express-mongodb-auth';
mongoose.connect(mongo_uri, function(err) {
  if (err) {
    throw err;
  } else {
    console.log(`Successfully connected to ${mongo_uri}`);
  }
});

// Requiring our models for syncing
var db = require("./models");

// Routes
app.use(routes);

app.get('/ping', function (req, res) {
 return res.send('pong');
});

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(PORT, function() {
  console.log(`API server now on port http://localhost:${PORT}`);
});