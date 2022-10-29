const mongoose = require("mongoose");
const Post = mongoose.model("Post");
const User = mongoose.model("User");

const newPost = async (req, res) => {
  try {
    const post = new Post({
      ...req.body,
      user: req.user.userId,
      img: `${req.user.userId}/${req.file.filename}`,
    });

    const resp = await post.save();

    return res.status(201).json({
      mensaje: "Post creado",
      detalles: resp,
    });
  } catch (e) {
    return res.status(500).json({
      mensaje: "Error",
      detalles: e.message,
    });
  }
};

const getPosts = async (req, res) => {
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

      const posts = await Post.find({ user: user._id })
        .populate({
          path: "user",
          select: {
            username: true,
          },
        })
        .sort({ createdAt: -1 });

      if (!posts.length)
        return res.status(404).json({
          mensaje: "Error",
          detalles: "Este usuario aún no tiene ninguna publicación.",
        });

      return res.status(200).json({
        mensaje: "Post",
        detalles: posts,
      });
    }

    return res.status(400).json({
      mensaje: "Error",
      detalles: "Es necesario enviar al menos un parámetro.",
    });
  } catch (e) {
    return res.status(500).json({
      mensaje: "Error",
      detalles: e.message,
    });
  }
};

const getPostsFollows = async (req, res) => {
  try {
    const { userId } = req.user;

    const user = await User.findById(userId);

    const posts = await Post.find({ user: { $in: user.follows } })
      .populate({
        path: "user",
        select: {
          username: true,
        },
      })
      .sort({ createdAt: -1 });

    if (!posts.length) {
      return res.status(404).json({
        mensaje: "Error",
        detalles: "No hay publicaciones.",
      });
    }

    return res.status(200).json({
      mensaje: "Post",
      detalles: posts,
    });
  } catch (e) {
    return res.status(500).json({
      mensaje: "Error",
      detalles: e.message,
    });
  }
};

const toggleLike = async (req, res) => {
  try {
    const { userId } = req.user;
    const { postId } = req.body;

    const post = await Post.findById(postId).populate({
      path: "user",
      select: {
        username: true,
      },
    });

    if (!post)
      return res.status(404).json({
        mensaje: "Error",
        detalles: "No existe este post.",
      });

    const alreadyLiked = post.likes.includes(userId);

    const newLikes = alreadyLiked
      ? post.likes.filter((like) => String(like) !== userId)
      : [...post.likes, userId];

    const updatedPost = await Post.findByIdAndUpdate(
      postId,
      {
        $set: {
          likes: newLikes,
        },
      },
      { new: true }
    );

    return res.status(200).json({
      mensaje: "Post",
      detalles: updatedPost,
    });
  } catch (e) {
    return res.status(500).json({
      mensaje: "Error",
      detalles: e.message,
    });
  }
};

module.exports = {
  newPost,
  getPosts,
  toggleLike,
  getPostsFollows,
};
