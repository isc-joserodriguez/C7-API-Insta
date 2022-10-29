const mongoose = require("mongoose");

const PostSchema = new mongoose.Schema(
  {
    img: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.ObjectId,
      ref: "User",
    },
    likes: {
      type: [
        {
          type: mongoose.ObjectId,
          ref: "User",
        },
      ],
    },
    description: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

mongoose.model("Post", PostSchema, "Post");
