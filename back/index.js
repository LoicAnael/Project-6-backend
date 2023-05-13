require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const { createUser, logUser } = require("./controllers/user");
const { getSautes, createSautes } = require("./controllers/sautes");
require("./mongo");

//middleware
app.use(cors());
app.use(express.json());
const { authenticateUser } = require("./middleware/auth");

//routes
app.post("/api/auth/signup", createUser);
app.post("/api/auth/login", logUser);
app.post("/api/sauces", authenticateUser, createSautes);
app.get("/api/sauces", authenticateUser, getSautes);

app.listen(port, () => console.log("Listining on port " + port));
