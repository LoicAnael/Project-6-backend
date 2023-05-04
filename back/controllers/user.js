const { User } = require("../mongo");

function createUser(req, res) {
  const { email, password } = req.body;
  const user = new User({ email, password });
  user
    .save()
    .then(() => {
      console.log("envoyeee");
      res.send({ message: "quelqu'un essaye de se connecter" });
    })
    .catch((err) => console.log(err));
}

module.exports = { createUser };
