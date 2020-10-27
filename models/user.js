const { Schema, model } = require("mongoose");

const userSchema = new Schema(
  {
    email: { type: String, required: true, unique: true },
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },

    tweets: [{ type: Schema.Types.ObjectId, ref: "Tweet" }],
    followers: [{ type: Schema.Types.ObjectId, ref: "User" }],
    following: [{ type: Schema.Types.ObjectId, ref: "User" }],

    firstName: String,
    lastName: String,
    profileImageUrl: String,
    backgroundImageUrl: String,
    bio: { type: String, maxlength: 160 },
    location: { type: String, maxlength: 30 },
    website: { type: String, maxlength: 100 },
  },
  { timestamps: true }
);

module.exports = model("User", userSchema);
