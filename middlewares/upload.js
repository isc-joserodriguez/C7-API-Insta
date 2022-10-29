const multer = require("multer");
const fs = require("fs");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const directory = `${__dirname}/../uploads/${req.user?.userId || "avatar"}`;

    if (!fs.existsSync(directory)) {
      fs.mkdirSync(directory, { recursive: true });
    }

    cb(null, directory);
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}.${file.originalname.split(".").pop()}`);
  },
});

module.exports = multer({ storage });
