const bcrypt = require("bcrypt");

const mongoose = require("mongoose");

const movieSchema = new mongoose.Schema({
  Title: { type: String, required: true },
  ShortDescription: { type: String, required: true },
  LongDescription: { type: String, required: true },
  Genre: [String],
  Duration: String,
  ReleaseDate: String,
  Rating: String,
  Director: String,
  Actors: [String],
  Thumbnail: String,
  LargeThumbnail: String,
  Background: String,
  Logo: String,
  Featured: Boolean,
  Series: Boolean,
  Movie: Boolean,
  Brand: String,
});

const userSchema = mongoose.Schema({
  Username: { type: String, required: true },
  Password: { type: String, required: true },
  Email: { type: String, required: true },
  Watchlist: [{ type: mongoose.Schema.Types.ObjectId, ref: "Movie" }],
});

userSchema.statics.hashPassword = (password) => {
  return bcrypt.hashSync(password, 10);
};

userSchema.methods.validatePassword = function (password) {
  return bcrypt.compareSync(password, this.Password);
};

let Movie = mongoose.model("Movie", movieSchema);
let User = mongoose.model("User", userSchema);

module.exports.Movie = Movie;
module.exports.User = User;
