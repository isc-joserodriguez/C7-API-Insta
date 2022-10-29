const express = require("express");

const { registro, login } = require("../controllers");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/login", login);
router.post("/signup", upload.single("picture"), registro);

module.exports = router;
