const express = require("express");
const UserModel = require("../models/user");
const router = express.Router();

router.post("/", function (req, res) {
  const newUser = new UserModel({
    firstname: req.body.firstname,
    lastname: req.body.lastname,
    email: req.body.email,
    password: req.body.password,
  });

  newUser
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      if (error.code === 11000) {
        res.status(400).json({
          message: `Movie with title  already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the movie" });
      }
    });
  console.log(req.body);
});

router.delete("/delete", function (req, res) {
  UserModel.deleteOne({ _id: req.body.id }, function (err) {
    if (err) return res.json({ message: "error" });
  });
  res.status(200).json({});
});

module.exports = router;
