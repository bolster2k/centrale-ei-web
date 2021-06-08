/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  date: { type: Date },
});

const MoviesModel = mongoose.model("MoviesModel", MoviesSchema, "movies");

module.exports = MoviesModel;