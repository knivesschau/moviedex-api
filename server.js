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

app.use(function bearerTokenValidation(req,res,next) {
    const apiToken = process.env.API_TOKEN;
    const authorToken = req.get('Authorization');

    if (!authorToken || authorToken.split(' ')[1] !== apiToken) {
        return res.status(401).json({error: 'Unauthorized request.'});
    }
    next();
});

app.get('/movie', function getMovies(req,res) {
    let response = MOVIEDATA;

    if (req.query.genre) {
        response = response.filter(movie => 
            movie.genre.toLowerCase().includes(req.query.genre.toLowerCase())
            );
    }

    if (req.query.country) {
        response = response.filter(movie => 
            movie.country.toLowerCase().includes(req.query.country.toLowerCase())
            );
    }

    if (req.query.avg_vote) {
        response = response.filter(movie => 
            Number(movie.avg_vote) >= Number(req.query.avg_vote)
            );
    }

    res.json(response);
})

app.listen(PORT, () => {
    console.log(`Server started listening at http://localhost:${PORT}!`);
})