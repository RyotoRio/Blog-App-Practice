const mongoose = require("mongoose");

const imgSchema = new mongoose.Schema(
  {
    Key: { type: String, required: true },
    size: Number,
    img: {
      data: Buffer,
      contentType: String,
    },
    createdBy: { type: mongoose.Types.ObjectId, ref: "user" },
  },
  { timestamps: true }
);

const File = mongoose.model("image", imgSchema);
module.exports = File;
