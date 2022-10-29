const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const crypto = require("crypto");
const jwt = require("jsonwebtoken");

const UserSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      required: true,
      unique: true,
    },
    liked: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "Post",
        },
      ],
    },
    follows: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "User",
        },
      ],
    },
    followers: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "User",
        },
      ],
    },
    biography: {
      type: String,
    },
    avatar: {
      type: String,
    },
    password: {
      type: String,
    },
    salt: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

UserSchema.plugin(uniqueValidator);

UserSchema.methods.encryptString = function (stringToEncrypt, salt) {
  return crypto
    .pbkdf2Sync(stringToEncrypt, salt, 10000, 512, "sha512")
    .toString("hex");
};

UserSchema.methods.hashPassword = function (password) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.password = this.encryptString(password, this.salt);
};

UserSchema.methods.verifyPassword = function (password) {
  return this.password === this.encryptString(password, this.salt);
};

UserSchema.methods.generateJWT = function () {
  return jwt.sign({ userId: this._id }, process.env.SECRET);
};

mongoose.model("User", UserSchema, "User");
