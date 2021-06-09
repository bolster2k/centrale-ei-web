const express = require("express");
const MoviesModel = require("../models/movies");
const router = express.Router();

router.post("/:id", function (req, res) {
  MoviesModel.find({ _id: req.body.id }).then(function (movie) {
    res.json({ movie: movie });
  });
});

module.exports = router;
