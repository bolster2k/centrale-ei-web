const express = require("express");
const MoviesModel = require("../models/movies");
const router = express.Router();
const Search = require("../controller/search");
const proFreq = require("../controller/freq");
const proRecom = require("../controller/recom");

router.get("/", function (req, res) {
  MoviesModel.find({}).then(function (movies) {
    res.json({ movies: movies });
  });
});

router.post("/search", function (req, res) {
  Search(req.body, res);
});

router.post("/recomandation", async function (req, res) {
  var data = await proRecom(req.body);
  res.status(200).json({recom:data});
});

router.post("/new", function (req, res) {
  const newMovies = new MoviesModel({
    title: req.body.title,
    date: req.body.date,
    path: req.body.path,
    resume: req.body.resume,
  });

  proFreq(req.body);

  newMovies
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      if (error.code === 11000) {
        res.status(400).json({
          message: `Movie with title "${newMovies.title}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the movie" });
      }
    });
  console.log(req.body);
});

router.delete("/delete", function (req, res) {
  MoviesModel.deleteOne({ _id: req.body.id }, function (err) {
    if (err) return res.json({ message: "error" });
  });
  res.status(200).json({});
});

router.delete("/clear", function (req, res) {
  MoviesModel.deleteMany({}, function (err) {
    if (err) return res.json({ message: "error" });
  });
  res.status(200).json({});
});

module.exports = router;
