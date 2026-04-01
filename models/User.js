const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  phone: { type: String },
  password: { type: String, required: true },

role: {
  type: String,
  enum: ["User", "Admin"],
  default: "User"
}
});
module.exports = mongoose.model("User", UserSchema);