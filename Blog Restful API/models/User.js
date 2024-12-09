const { default: mongoose } = require("mongoose");

const userSchema = mongoose.Schema(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: { type: String, require: true, minlength: 8 },
    //1-administrator, 2-moderator, 3-normalUser
    role: { type: Number, default: 3 },
    verificationCode: String,
    forgetPasswordCode: String,
    isVerified: { type: Boolean, default: false },
    profilePic: { type: mongoose.Types.ObjectId, ref: "image" },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);
module.exports = User;
