const mongoose = require("mongoose");
const User = mongoose.model("User");

const registro = async (req, res) => {
  try {
    const { password } = req.body;
    delete req.body.password;
    const user = new User(req.body);

    user.hashPassword(password);
    await user.save();
    return res.status(201).json({
      mensaje: "Usuario creado",
      detalles: {
        userId: user._id,
        token: user.generateJWT(),
      },
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      mensaje: "Error",
      detalles: "Error fatal",
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });

    if (!user) {
      return res.status(404).json({
        mensaje: "Error",
        detalles: "No existe este usuario",
      });
    }

    if (user.verifyPassword(password)) {
      return res.status(200).json({
        mensaje: "Login correcto",
        detalles: {
          userId: user._id,
          token: user.generateJWT(),
        },
      });
    }

    return res.status(400).json({
      mensaje: "Error",
      detalles: "Revisa tus credenciales",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      mensaje: "Error",
      detalles: "Error fatal",
    });
  }
};

module.exports = {
  registro,
  login,
};
