require("dotenv").config();
require("./models");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const routers = require("./routers");

const app = express();

app.use(cors());
app.use(express.json());
app.use(express.static(`${__dirname}/uploads`));

mongoose.connect(process.env.MONGO_URI);

app.use("v1", routers);

app.use((req, res) => {
  res.send('<a href="/v1">Regresa a la API </a>');
});

app.listen(process.env.PORT, () => {
  console.log("Escuchando en el puerto:", process.env.PORT);
});
