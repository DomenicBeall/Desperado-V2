const express = require('express');
const mongoose = require('mongoose');
const bodyparser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8080;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(require('./config/passport').initialize());

// Add all routes
app.use(require("./routes"));

// Serve static assets
app.use(express.static("client/build"));

mongoose.connect(process.env.MONGOURI, { useNewUrlParser: true })
        .then(() => console.log("Mongo initialised successfully!"))
        .catch((err) => console.error(err));

app.listen(port, () => {
  console.log(`Server listening at port ${port}`)
})