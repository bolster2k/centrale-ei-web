const express = require("express");
const UserModel = require("../models/user");
const router = express.Router();

router.get("/", function (req, res) {
  UserModel.find({}).then(function (users) {
    res.json({ users: users });
  });
});

router.post("/connect", function (req, res) {
  UserModel.find({ email: req.body.email, password: req.body.password }).then(
    function (user) {
      res.status(200).json(user);
    }
  );
});

router.post("/new", function (req, res) {
  const newUser = new UserModel({
    email: req.body.email,
    firstName: req.body.firstname,
    lastName: req.body.lastname,
    password: req.body.password,
  });

  newUser
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      console.log(error);
      if (error.code === 11000) {
        res.status(400).json({
          message: `User with email "${newUser.email}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the user" });
      }
    });
});

router.delete("/delete", function (req, res) {
  UserModel.deleteOne({ _id: req.body.id }, function (err) {
    if (err) return res.json({ message: "error" });
  });
  res.status(200).json({});
});
module.exports = router;
