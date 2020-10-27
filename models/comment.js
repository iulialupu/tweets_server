const { Schema, model } = require("mongoose");

const commentSchema = new Schema(
  {
    tweet: [{ type: Schema.Types.ObjectId, ref: "Tweet", required: true }],
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    text: { type: String, maxlength: 200, required: true },
    likes: [{ type: Schema.Types.ObjectId, ref: "User" }],
  },
  { timestamps: true }
);

module.exports = model("Comment", commentSchema);
