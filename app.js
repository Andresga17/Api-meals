const express = require('express');
const cors = require('cors');

//SE CREA LA INSTANCIA DE LA APP
const app = express();
app.use(express.json());
app.use(cors());

module.exports = app;

//Dialect needs to be explicitly supplied as of v4.0.0