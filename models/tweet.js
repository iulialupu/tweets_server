const { Schema, model } = require("mongoose");

const tweetSchema = new Schema(
  {
    text: { type: String, maxlength: 200 },
    // user: { type: Schema.Types.ObjectId, ref: "User" },
    // comments: [{type: Schema.Types.ObjectId, ref: "Comment"}],
    // likes: [{ type: Schema.Types.ObjectId, ref: "User" },]
  },
  { timestamps: true }
);

module.exports = model("Tweet", tweetSchema);
