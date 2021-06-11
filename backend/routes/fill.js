const express = require("express");
const MoviesModel = require("../models/movies");
const proFreq = require("../controller/freq");
const router = express.Router();
const axios = require("axios");

router.post("/", function (req, res) {
  console.log(req);
  const add = (movie, res) => {
    const newMovies = new MoviesModel({
      title: movie.title,
      date: movie.release_date,
      path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      resume: movie.overview,
    });

    proFreq({
      title: movie.title,
      date: movie.release_date,
      path: `https://image.tmdb.org/t/p/original${movie.poster_path}`,
      resume: movie.overview,
    }).then(() => {
      newMovies
        .save()
        .then(function (newDocument) {
          res.status(201).json(newDocument);
        })
        .catch(function (error) {
          if (error.code === 11000) {
            res.status(400);
          } else {
            res.status(500);
          }
        });
      console.log(req.body);
    });
  };
  for (let k = 1; k <= req.body.number; k++) {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US&page=${k.toString()}`
      )
      .then((response) => {
        // Do something if call succeeded
        console.log(`ok` + k.toString());
        for (const movie in response.data.results) {
          add(response.data.results[movie], res);
        }
      })
      .catch((error) => {
        this.usersLoadingError = "An error occured while fetching users.";
        console.error(error);
      });
  }
});

module.exports = router;
