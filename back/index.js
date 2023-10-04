require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const port = 3000;
require("./mongo");
const { sauteRouter } = require("./routers/saute");
const { userRouter } = require("./routers/user");

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

//routes
app.use("/api/auth", userRouter);
app.use("/api/sauces", sauteRouter);

app.use("/images", express.static(path.join(__dirname, "images")));
app.listen(port, () => console.log("Listining on port " + port));
