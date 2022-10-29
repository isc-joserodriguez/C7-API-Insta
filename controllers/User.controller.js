const mongoose = require("mongoose");
const User = mongoose.model("User");

const getUserData = async (req, res) => {
  try {
    const { username } = req.query;

    if (username || req.user) {
      const user = username
        ? await User.findOne(
            { username: username },
            { username: 1, followers: 1, follows: 1, biography: 1, avatar: 1 }
          )
        : await User.findById(req.user.userId, {
            username: 1,
            followers: 1,
            follows: 1,
            biography: 1,
            avatar: 1,
            liked: 1,
          });
      if (!user) {
        return res.status(404).json({
          mensaje: "Error",
          detalles: "No existe este usuario.",
        });
      }
      return res.status(200).json({
        mensaje: "Info",
        detalles: user,
      });
    }

    return res.status(400).json({
      mensaje: "Error",
      detalles: "Es necesario enviar al menos un parámetro.",
    });
  } catch (e) {
    console.log(e.message);
    return res.status(500).json({
      mensaje: "Error",
      detalles: "Error fatal",
    });
  }
};

const getAllUsers = async (req, res) => {
  try {
    const { username } = req.query;

    const users = await User.find(
      username ? { username: { $regex: username } } : {},
      {
        username: 1,
        followers: 1,
        follows: 1,
        biography: 1,
        avatar: 1,
      }
    );

    if (!users.length) {
      return res.status(404).json({
        mensaje: "Error",
        detalles: "Usuario no encontrado.",
      });
    }
    return res.status(200).json({
      mensaje: "Info",
      detalles: users,
    });
  } catch (e) {
    return res.status(500).json({
      mensaje: "Error",
      detalles: e.message,
    });
  }
};

const toggleFollow = async (req, res) => {
  try {
    const { userId } = req.body;
    const { userId: myUserId } = req.user;

    const user = await User.findById(userId);
    const myUser = await User.findById(myUserId);

    if (!user)
      return res.status(404).json({
        mensaje: "Error",
        detalles: "No existe este usuario.",
      });

    const alreadyFollow = user.followers.includes(req.user.userId);

    const newFollowers = alreadyFollow
      ? user.followers.filter(
          (follower) => String(follower) !== req.user.userId
        )
      : [...user.followers, req.user.userId];

    const newFollows = alreadyFollow
      ? myUser.follows.filter((follow) => String(follow) !== String(user._id))
      : [...myUser.follows, user._id];

    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        $set: {
          followers: newFollowers,
        },
      },
      { new: true }
    );

    const updatedMyUser = await User.findByIdAndUpdate(
      myUserId,
      {
        $set: {
          follows: newFollows,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      mensaje: "User",
      detalles: { updatedUser, updatedMyUser },
    });
  } catch (e) {
    return res.status(500).json({
      mensaje: "Error",
      detalles: e.message,
    });
  }
};

module.exports = {
  getUserData,
  getAllUsers,
  toggleFollow,
};
