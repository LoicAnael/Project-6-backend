const { Product } = require("../mongo");
function getSautes(req, res) {
  Product.find({})
    .then((product) => res.send(product))
    .catch((err) => console.log(err));
}

function createSautes(req, res) {
  const saute = JSON.parse(req.body.sauce);
  console.log({ file: req.file });
  const { name, manufacturer, description, mainPepper, heat, userId } = saute;
  const imageUrl = req.file.destination + req.file.filename;

  const product = new Product({
    userId,
    name,
    manufacturer,
    description,
    mainPepper,
    imageUrl,
    heat,
    likes: 0,
    dislikes: 0,
    usersLikes: [],
    usersDislikes: [],
  });
  product
    .save()
    .then((product) => console.log("nouveau produit", product))
    .catch((err) => console.log(err));
}

module.exports = { getSautes, createSautes };
