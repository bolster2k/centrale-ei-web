/* eslint-disable prettier/prettier */
const mongoose = require("mongoose");

const FreqSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  frequency: { type: Number },
  number: { type: Number }
});

const FreqModel = mongoose.model("FreqModel", FreqSchema, "freq");

module.exports = FreqModel;