const jwt = require("jsonwebtoken");

function authenticateUser(req, res, next) {
  const token = req.header("Authorization").split(" ")[1];
  if (!token) {
    res.status(403).send({ message: "cannot find token" });
    console.log("cannot find token");
  }
  try {
    jwt.verify(token, process.env.JWT_PASSWORD);
    console.log("utilisateur authentifie");
    next();
  } catch (err) {
    console.log("probleme de token :", err);
  }
}

module.exports = { authenticateUser };
