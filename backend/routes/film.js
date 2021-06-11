const express = require("express");
const MoviesModel = require("../models/movies");
const RatingModel = require("../models/rating");
const UserModel = require("../models/user");
const router = express.Router();

router.post("/:id", function (req, res) {
  MoviesModel.find({ _id: req.body.id }).then(function (movie) {
    res.json({ movie: movie });
  });
});

router.post("/:id/rating", function (req, res) {
  UserModel.find({
    email: req.body.email,
    password: req.body.password,
  }).then(function (user) {
    if (!user) {
      res.status(404).json({
        message: `No user with these caracteristics`,
      });
    } else {
      const newRating = new RatingModel({
        rating: req.body.rating,
        movie: req.body.movie.id,
        user: user[0].id,
      });
      RatingModel.find({ movie: req.body.movie.id, user: user[0].id })
        .then(function (rating) {
          RatingModel.find(
            { user: rating.user, movie: rating.movie },
            { rating: req.body.rating }
          );
        })
        .catch(function () {
          newRating
            .save()
            .then(function (newDocument) {
              res.status(201).json(newDocument);
            })
            .catch(function (error) {
              if (error.code === 11000) {
                res.status(400).json({
                  message: `Rating with rate "${newRating.rating}" for user "${user[0].title}" and movie "${req.body.movie.title}" already exists`,
                });
              } else {
                res
                  .status(500)
                  .json({ message: "Error while creating the rating" });
                console.log(error);
              }
            });
        });
    }
  });
});

module.exports = router;
