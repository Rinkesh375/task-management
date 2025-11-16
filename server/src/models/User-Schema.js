const mongoose = require("mongoose");
// If time remains, we will implement user-based task fetching and creation and google and github auth.
const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },

    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      trim: true,
    },

    password: {
      type: String,
      required: true,
      minlength: 6,
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("User", UserSchema);
