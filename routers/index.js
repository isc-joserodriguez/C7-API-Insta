const express = require("express");

const router = express.Router();

const authRouter = require("./Auth.router");
const userRouter = require("./User.router");
const postRouter = require("./Post.router");

router.get("/", (req, res) => {
  res.send(`
      <h1>Welcome!</h1>
      `);
});

router.use("/auth", authRouter);
router.use("/user", userRouter);
router.use("/post", postRouter);

module.exports = router;
