const express = require('express');
const bodyparser = require('body-parser');
const mongoose = require('mongoose');
const crypto = require('crypto');
const modemailer = require('nodemailer');

const app = express();
const port = 8000;
const cors = require('cors');
app.use(cors());

app.use(bodyparser.urlencoded({ extended: false }));
app.use(bodyparser.json());

const jwt = require('jsonwebtoken');


mongoose.connect("mongodb://localhost:27017/" ,{
   useNewUrlParser: true,
   useUnifiedTopology: true,
}). then(() => {
   console.log("connected to MongoDB");
})
  .catch((err) => {
    console.log("Error connecting to mongoDB", err);
});

app.listen(port, () => {
    console.log("Server is running on port 8000");
});

