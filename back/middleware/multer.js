//multer upload files
const multer = require("multer");

const storage = multer.diskStorage({
  destination: "images/",
  filename: function (req, file, cb) {
    cb(null, makeFileName(req, file));
  },
});
function makeFileName(req, file) {
  const fileName = (Date.now() + "-" + file.originalname).replace(/\s/g, "-");
  req.filename = fileName;
  return fileName;
}
const upload = multer({ storage: storage });
module.exports = { upload };
