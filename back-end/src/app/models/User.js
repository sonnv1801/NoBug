const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const UserSchema = new Schema(
  {
    googleId: {
      type: String,
    },
    username: {
      type: String,
      max: 30,
      unique: true,
    },
    displayName: {
      type: String,
    },
    email: {
      type: String,
      max: 50,
      unique: true,
    },
    password: {
      type: String,
    },
    photos: {
      type: String,
    },
    acctiveAccount: {
      type: Boolean,
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    token: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("User", UserSchema);
