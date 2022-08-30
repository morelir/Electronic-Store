const multer = require("multer");
const uuid = require("uuid");
const fs = require("fs");

const MIME_TYPE_MAP = {
  "image/png": "png",
  "image/jpeg": "jpeg",
  "image/jpg": "jpg",
};
const fileUploaded = multer({
  limits: 500000, //limit bytes
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      const { dest } = req.body;
      const dir = "./uploads/"+dest;
      fs.access(dir, function (error) {
        if (error) {
          console.log("Directory does not exist, creating one.");
          return fs.mkdir(dir, (error) => cb(error, dest));
        } else {
          console.log("Directory exists.");
          return cb(null, dir);
        }
      });
    },
    filename: (req, file, cb) => {
      const ext = MIME_TYPE_MAP[file.mimetype];
      cb(null, uuid.v1() + "." + ext);
    },
  }),
  fileFilter: (req, file, cb) => {
    const isValid = !!MIME_TYPE_MAP[file.mimetype];
    let error = isValid ? null : new Error("Invalid mime type!");
    cb(error, isValid);
  },
});

module.exports = fileUploaded;
