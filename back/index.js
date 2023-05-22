require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3000;
//const bodyParser = require("body-parser");
const { createUser, logUser } = require("./controllers/user");
const { getSautes, createSautes } = require("./controllers/sautes");
require("./mongo");

//middleware
app.use(cors());
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content, Accept, Content-Type, Authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, DELETE, PATCH, OPTIONS"
  );
  next();
});
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
const { authenticateUser } = require("./middleware/auth");
const { upload } = require("./middleware/multer");

//routes
app.post("/api/auth/signup", createUser);
app.post("/api/auth/login", logUser);
app.post("/api/sauces", authenticateUser, upload.single("image"), createSautes);
app.get("/api/sauces", authenticateUser, getSautes);

app.use("/images", express.static(path.join(__dirname, "images")));
app.listen(port, () => console.log("Listining on port " + port));
