//database mongo
const mongoose = require("mongoose");
const userName = process.env.DB_USER;
const password = process.env.DB_PASSWORD;
const db = process.env.DB_NAME;
const uri = `mongodb+srv://${userName}:${password}@cluster0.tgnmnps.mongodb.net/${db}`;
const uniqueValidator = require("mongoose-unique-validator");
mongoose
  .connect(uri)
  .then(() => console.log("vous etes connectes a mongodb"))
  .catch((err) => console.log(err));

//schema
const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});
userSchema.plugin(uniqueValidator);
const User = mongoose.model("User", userSchema);

const productSchema = new mongoose.Schema({
  userId: String,
  name: String,
  manufacturer: String,
  description: String,
  mainPepper: String,
  imageUrl: String,
  heat: Number,
  likes: Number,
  dislikes: Number,
  usersLikes: [String],
  usersDislikes: [String],
});
const Product = mongoose.model("Product", productSchema);

module.exports = { mongoose, User, Product };
