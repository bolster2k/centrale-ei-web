const mongoose = require("mongoose");

const RatingSchema = new mongoose.Schema({
  rating: { type: String, required: true, unique: true },
  movie: { type: mongoose.Schema.Types.ObjectId, ref: "MoviesModel" },
  user: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
});

const RatingModel = mongoose.model("RatingModel", RatingSchema, "rating");

module.exports = RatingModel;
