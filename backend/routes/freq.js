const express = require("express");
const FreqModel = require("../models/freq");
const router = express.Router();

router.post("/new", function (req, res) {
  const newFreq = new FreqModel({
    word: req.body.word,
    frequency: req.body.frequency,
    number: req.body.number,
  });

  newFreq
    .save()
    .then(function (newDocument) {
      res.status(201).json(newDocument);
    })
    .catch(function (error) {
      if (error.code === 11000) {
        res.status(400).json({
          message: `Word "${newFreq.word}" already exists`,
        });
      } else {
        res.status(500).json({ message: "Error while creating the word" });
      }
    });
  console.log(req.body);
});

router.delete("/clear", function (req, res) {
  FreqModel.deleteMany({}, function (err) {
    if (err) return res.json({ message: "error" });
  });
  res.status(200).json({});
});

module.exports = router;
