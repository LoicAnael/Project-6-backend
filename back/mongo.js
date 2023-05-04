//database mongo
const mongoose = require("mongoose");
const userName = "loic-anael";
const password = "niUr6Q7Zd94pncfY";
const db = "test";
const uri = `mongodb+srv://${userName}:${password}@cluster0.tgnmnps.mongodb.net/${db}`;
mongoose
  .connect(uri)
  .then(() => console.log("vous etes connectes a mongodb"))
  .catch((err) => console.log(err));

//schema
const userSchema = new mongoose.Schema({
  email: String,
  password: String,
});
const User = mongoose.model("User", userSchema);

module.exports = { mongoose, User };
