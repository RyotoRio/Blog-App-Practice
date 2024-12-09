const mongoose = require("mongoose");

const categorySchema = mongoose.Schema(
  {
    title: { type: String, require: true },
    desc: String,
    updateBy: { type: mongoose.Types.ObjectId, ref: "User", require: true },
  },
  { timestamps: true }
);

const Category = mongoose.model("category", categorySchema);

module.exports = Category;
