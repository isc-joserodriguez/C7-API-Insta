const express = require("express");

const router = express.Router();

const authRouter = require("./Auth.router");

router.get("/", (req, res) => {
  res.send(`
      <h1>Welcome!</h1>
      `);
});

router.use("/auth", authRouter);

module.exports = router;
