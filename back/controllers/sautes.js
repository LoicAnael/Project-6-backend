const { Product } = require("../mongo");
function getSautes(req, res) {
  Product.find({})
    .then((product) => res.send(product))
    .catch((err) => console.log(err));
}

function getSauteById(req, res) {
  const { id } = req.params;
  Product.findById(id)
    .then((product) => res.send(product))
    .catch((err) => console.log(err));
}

function deleteSaute(req, res) {
  const { id } = req.params;
  Product.findByIdAndDelete(id)
    .then((product) => res.send({ message: "produit supprimé", product }))
    .catch((err) => console.log(err));
}

function createSautes(req, res) {
  const saute = JSON.parse(req.body.sauce);
  console.log({ file: req.file });

  const { name, manufacturer, description, mainPepper, heat, userId } = saute;
  const imageUrl =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;
  console.log(req);

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
    .then((product) => {
      res.status(201).send({ message: product });
    })
    .catch((err) => console.log(err));
}

module.exports = { getSautes, createSautes, getSauteById, deleteSaute };
