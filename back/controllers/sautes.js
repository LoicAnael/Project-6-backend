const { unlink } = require("fs").promises;
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
    .then(deleteImage)
    .then((product) => {
      return res.send({ message: "produit supprimé", product });
    })
    .catch((err) =>
      res.status(500).send({ message: "une erreur est survenue", err })
    );
}

function deleteImage(product) {
  const imgUrl = product.imageUrl;
  const fileToDelete = imgUrl.split("/").at(-1);
  return unlink(`images/${fileToDelete}`).then(() => product);
}

function modifySaute(req, res) {
  const sauceObject = req.file
    ? {
        ...JSON.parse(req.body.sauce),
        imageUrl: `${req.protocol}://${req.get("host")}/images/${
          req.file.filename
        }`,
      }
    : { ...req.body };
  Product.findByIdAndUpdate(req.params.id, sauceObject)
    .then((product) => deleteImage(product))
    .then(() => res.status(200).json({ message: "sauce mise à jour" }))
    .catch((error) => res.status(400).json({ error }));
}

function createSautes(req, res) {
  const saute = JSON.parse(req.body.sauce);
  const { name, manufacturer, description, mainPepper, heat, userId } = saute;
  const imageUrl =
    req.protocol + "://" + req.get("host") + "/images/" + req.file.filename;

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

module.exports = {
  getSautes,
  createSautes,
  getSauteById,
  deleteSaute,
  modifySaute,
};
