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
    .then((product) => res.send({ message: "produit supprimé", product }))
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
  const { id } = req.params;
  const { body } = req;
  Product.findByIdAndUpdate(id, body)
    .then((response) => {
      if (response == null) {
        console.log("noting updated !");
        res.status(404).send({ message: "Object not found" });
      }
      res.status(200).send({ message: "Succesfully updated" });
    })
    .catch((err) => console.log("update error", err));
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
