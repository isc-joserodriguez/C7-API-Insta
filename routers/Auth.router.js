const express = require("express");

const { registro, login } = require("../controllers");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/login", upload.single("picture"), login);
router.post("/registro", registro);

module.exports = router;
