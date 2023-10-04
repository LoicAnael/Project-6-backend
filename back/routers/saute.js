const express = require("express");
const sauteRouter = express.Router();

const { authenticateUser } = require("../middleware/auth");
const { upload } = require("../middleware/multer");
const {
  getSautes,
  createSautes,
  getSauteById,
  deleteSaute,
  modifySaute,
  likeSaute,
} = require("../controllers/sautes");

sauteRouter.post("/", authenticateUser, upload.single("image"), createSautes);
sauteRouter.put("/:id", authenticateUser, upload.single("image"), modifySaute);
sauteRouter.get("/", authenticateUser, getSautes);
sauteRouter.get("/:id", authenticateUser, getSauteById);
sauteRouter.delete("/:id", authenticateUser, deleteSaute);
sauteRouter.post("/:id/like", authenticateUser, likeSaute);

module.exports = { sauteRouter };
