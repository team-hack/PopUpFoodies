require('dotenv').config({ path: '../.env', debug: process.env.DEBUG });
const { PORT } = process.env;
const express = require('express');
const app = express();


app.listen(PORT, () => console.log(`App listening on port:${PORT}`))