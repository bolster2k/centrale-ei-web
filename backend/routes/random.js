const express = require("express");
const MoviesModel = require("../models/movies");
const router = express.Router();

router.get("/", function (req, res) {
  // Get the count of all users
  MoviesModel.count().exec(function (err, count) {
    // Get a random entry
    var random = Math.floor(Math.random() * count);
    console.log(count);
    // Again query all users but only fetch one offset by our random #
    MoviesModel.findOne()
      .skip(random)
      .exec(function (err, movie) {
        // Tada! random user
        res.json({ movie: movie });
      });
  });
});

module.exports = router;
