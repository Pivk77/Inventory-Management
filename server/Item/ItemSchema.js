const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

//User model
const ItemSchema = new mongoose.Schema(
  {
    rack: { type: Number, required: true },
    row: { type: Number, required: true },
    column: { type: Number, required: true },
    name: { type: String, required: true },
    amount: { type: Number, required: true },
  },
  { timestamps: true }
);

const Item = mongoose.model("Item", ItemSchema);

module.exports = Item;
