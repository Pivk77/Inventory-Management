const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//User model
const UserSchema = new mongoose.Schema(
  {
    id: { type: Number, required: true, unique: true },
    name: { type: String, required: true },
    surname: { type: String, required: true },
    access: {
      type: [{ type: String, required: true, enum: ["Admin", "User"] }], // Creates access level for user, if not specified it sets to User rights
      default: ["User"],
    },
  },
  { timestamps: true }
);

UserSchema.plugin(uniqueValidator, { message: "User already exists 🤞" });
const User = mongoose.model("User", UserSchema);

module.exports = User;
