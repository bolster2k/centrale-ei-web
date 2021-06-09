const express = require("express");
const MoviesModel = require("../models/movies");
const router = express.Router();
const axios = require("axios");

router.get("/", function (req, res) {
  const add = (movie, res) => {
    const newMovies = new MoviesModel({
      title: movie.title,
      date: movie.release_date,
      path: movie.poster_path,
      resume: movie.overview,
    });

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
  };
  axios
    .get(
      `https://api.themoviedb.org/3/movie/popular?api_key=a0a7e40dc8162ed7e37aa2fc97db5654&language=en-US&page=1`
    )
    .then((response) => {
      // Do something if call succeeded
      for (const movie in response.data.results) {
        add(response.data.results[movie], res);
      }
      res.json({ message: "terminado" });
    })
    .catch((error) => {
      this.usersLoadingError = "An error occured while fetching users.";
      console.error(error);
    });
});

module.exports = router;
