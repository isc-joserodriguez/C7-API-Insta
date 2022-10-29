const { registro, login } = require("./Auth.controller");
const { getUserData, getAllUsers, toggleFollow } = require("./User.controller");
const {
  newPost,
  getPosts,
  toggleLike,
  getPostsFollows,
} = require("./Post.controller");

module.exports = {
  registro,
  login,
  getUserData,
  getAllUsers,
  toggleFollow,
  newPost,
  getPosts,
  toggleLike,
  getPostsFollows,
};
