const { registro, login } = require("./Auth.controller");
const { getUserData, getAllUsers, toggleFollow } = require("./User.controller");

module.exports = {
  registro,
  login,
  getUserData,
  getAllUsers,
  toggleFollow,
};
