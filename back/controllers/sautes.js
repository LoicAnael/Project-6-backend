const { Product } = require("../mongo");
function getSautes(req, res, next) {
  Product.find({})
    .then((product) => res.send(product))
    .catch((err) => console.log(err));
}

function createSautes(res, req, next) {
  //const payload = req.body;
  const product = new Product({
    userId: "loic",
    name: "loic",
    manufacturer: "loic",
    description: "loic",
    mainPepper: "loic",
    imageUrl: "loic",
    heat: 10,
    likes: 10,
    dislikes: 10,
    usersLikes: ["loic"],
    usersDislikes: ["loic"],
  });
  product
    .save()
    .then(() => console.log("nouveau produit"))
    .catch((err) => console.log(err));
}

module.exports = { getSautes, createSautes };
