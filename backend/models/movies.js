/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const MoviesSchema = new mongoose.Schema({
  title: { type: String, required: true, unique: true },
  date: { type: Date },
  path: { type: String },
  resume: { type: String }
});

const MoviesModel = mongoose.model("MoviesModel", MoviesSchema, "movies");

module.exports = MoviesModel;