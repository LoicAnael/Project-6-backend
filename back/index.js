const express = require("express");
const app = express();
const cors = require("cors");
const port = 3000;
const { createUser } = require("./controllers/user");

//middleware
app.use(cors());
app.use(express.json());

//routes
app.post("/api/auth/signup", createUser);

app.listen(port, () => console.log("Listining on port " + port));
