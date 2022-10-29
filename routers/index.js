const express = require("express");

const router = express.Router();

const authRouter = require("./Auth.router");
const userRouter = require("./User.router");

router.get("/", (req, res) => {
  res.send(`
      <h1>Welcome!</h1>
      `);
});

router.use("/auth", authRouter);
router.use("/user", userRouter);

module.exports = router;
