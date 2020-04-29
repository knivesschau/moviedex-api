require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const cors = require('cors');
const MOVIEDATA = require('./movie-data.json');


const app = express();

app.use(morgan('dev'));
app.use(helmet());
app.use(cors());

const PORT = 8000;

app.get('/', (req, res) => {
    res.send("This is a server test!");
})

app.listen(PORT, () => {
    console.log(`Server started listening at http://localhost:${PORT}!`);
})