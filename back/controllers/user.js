const { User } = require("../mongo");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

async function createUser(req, res) {
  const { email, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const user = new User({ email, password: hashedPassword });
  user
    .save()
    .then(() => {
      res.send({ message: "quelqu'un essaye de se connecter" });
    })
    .catch((err) => console.log(err));
}

async function logUser(req, res) {
  const { email, password } = req.body;
  const user = await User.findOne({ email });
  const isPasswordOK = await bcrypt.compare(password, user.password);
  if (!isPasswordOK) {
    res.status(403).send({ message: "Mot de passe incorrect" });
  }
  if (isPasswordOK) {
    const token = createToken(email);
    res.status(200).send({ userId: user._id, token: token });
  }
}

function hashPassword(password) {
  const saltRounds = 10;
  return bcrypt.hash(password, saltRounds);
}

function createToken(email) {
  const jwtPassword = process.env.JWT_PASSWORD;
  return jwt.sign({ email }, jwtPassword, { expiresIn: "99999999h" });
}

module.exports = { createUser, logUser };
