const mongoose = require("mongoose");

const FreqSchema = new mongoose.Schema({
  word: { type: String, required: true, unique: true },
  frequency: { type: Float },
  number: { type: Int }
});

const FreqModel = mongoose.model("FreqModel", FreqSchema, "freq");

module.exports = FreqsModel;