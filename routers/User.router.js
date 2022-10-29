const express = require("express");

const { getUserData, getAllUsers, toggleFollow } = require("../controllers");
const auth = require("../middlewares/auth");

const router = express.Router();

router.get("/getAllUsers", auth, getAllUsers);
router.get("/getUserData", auth, getUserData);
router.put("/toggleFollow", auth, toggleFollow);

module.exports = router;
