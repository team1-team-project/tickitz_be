const multer = require("multer");
const path = require("path");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/upload");
  },
  filename: (req, file, cb) => {
    //const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    // cb(null, Date.now() + "-" + file.originalname);
    cb(null, `${new Date().getTime()}-${file.originalname}`);
  },
});

const formUpload = multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    let formatType = path.extname(file.originalname);
    if (formatType == ".png" || formatType == ".jpg" || formatType == ".jpeg") {
      cb(null, true);
    } else {
      cb("Image not valid", false);
    }
  },
  limits: {
    fileSize: 1048576 * 3,
  },
});

module.exports = formUpload;
