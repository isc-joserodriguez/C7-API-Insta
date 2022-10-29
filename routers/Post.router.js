const express = require("express");

const {
  newPost,
  getPosts,
  toggleLike,
  getPostsFollows,
} = require("../controllers");
const auth = require("../middlewares/auth");
const upload = require("../middlewares/upload");

const router = express.Router();

router.post("/newPost", [auth, upload.single("picture")], newPost);
router.get("/getPostsFollows", auth, getPostsFollows);
router.get("/getPosts", auth, getPosts);
router.put("/toggleLike", auth, toggleLike);

module.exports = router;
