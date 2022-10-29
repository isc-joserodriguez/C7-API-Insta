const express = require("express");

const { registro, login } = require("../controllers");

const router = express.Router();

router.post("/login", login);
router.post("/registro", registro);

module.exports = router
