const { User, File } = require("../models");
const hashPassword = require("../utils/hashPassword");
const comparePassword = require("../utils/comparePassword");
const generateToken = require("../utils/generateToken");
const generateCode = require("../utils/generateCode");
const sendEmail = require("../utils/sendEmail");

const signup = async (req, res, next) => {
  try {
    const { name, email, password, role } = req.body;

    const isEmailExist = await User.findOne({
      email,
    });
    if (isEmailExist) {
      res.code = 400;
      throw new Error("Email already exists.");
    }

    const hashedPassword = await hashPassword(password);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
      role,
    });

    await newUser.save();

    res.status(201).json({
      code: 201,
      status: true,
      message: "User created successfully",
    });
  } catch (error) {
    next(error);
  }
};

const signin = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.code = 401;
      throw new Error("Invalid credential");
    }
    const match = await comparePassword(password, user.password);
    if (!match) {
      res.code = 401;
      throw new Error("Invalid credential");
    }

    const token = generateToken(user);

    res.status(200).json({
      code: 200,
      status: true,
      message: "Signed in successful",
      data: {
        token,
      },
    });
  } catch (error) {
    next(error);
  }
};

const verifyCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({
      email,
    });
    if (!user) {
      res.code = 401;
      throw new Error("Invalid email");
    }
    if (user.isVerified) {
      res.code = 400;
      throw new Error("User is already verified");
    }
    const code = generateCode(6);

    user.verificationCode = code;
    await user.save();

    //sendemail
    await sendEmail({
      emailTo: user.email,
      subject: "Verify your email",
      code,
      content: "Verify your account.",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "Verification code sent.",
    });
  } catch (error) {
    next(error);
  }
};

const verifyUser = async (req, res, next) => {
  try {
    const { email, code } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("user not found.");
    }

    if (user.verificationCode !== code) {
      res.code = 400;
      throw new Error("Invalid verification code");
    }

    user.isVerified = true;
    user.verificationCode = null;
    await user.save();

    res
      .status(200)
      .json({ code: 200, status: true, message: "User verified successfully" });
  } catch (error) {
    next(error);
  }
};

const forgetPasswordCode = async (req, res, next) => {
  try {
    const { email } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }

    const code = generateCode(6);
    user.forgetPasswordCode = code;

    await user.save();

    await sendEmail({
      emailTo: user.email,
      subject: "forget password code.",
      code,
      content: "change your password...",
    });

    res.status(200).json({
      code: 200,
      status: true,
      message: "forget password send successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const recoverPassword = async (req, res, next) => {
  try {
    const { email, code, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      res.code = 404;
      throw new Error("User not found.");
    }

    if (user.forgetPasswordCode !== code) {
      res.code = 404;
      throw new Error("Invalid code.");
    }

    const hashedPassword = await hashPassword(password);
    user.password = hashedPassword;
    user.forgetPasswordCode = null;

    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Password recovered successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const changePassword = async (req, res, next) => {
  try {
    const { oldPassword, newPassword } = req.body;
    const { _id } = req.user;

    const user = await User.findById(_id);
    if (!user) {
      res.code = 404;
      throw new Error("User not found.");
    }

    const match = await comparePassword(oldPassword, user.password);
    if (!match) {
      res.code = 400;
      throw new Error("Invalid old password.");
    }

    if (oldPassword == newPassword) {
      res.code = 400;
      throw new Error("Old and new password cannot be the same.");
    }

    const hashedPassword = await hashPassword(newPassword);
    user.password = hashedPassword;

    await user.save();

    res.status(200).json({
      code: 200,
      status: true,
      message: "Passowrd changed successfully.",
    });
  } catch (error) {
    next(error);
  }
};

const updateProfile = async (req, res, next) => {
  try {
    const { _id } = req.user;
    const { name, email, profilePic } = req.body;

    const user = await User.findById(_id).select(
      "-password -forgetPasswordCode -verificationCode"
    );
    if (!user) {
      res.code = 404;
      throw new Error("User not found.");
    }

    if (email) {
      const isUserExist = await User.findOne({ email });
      if (
        isUserExist &&
        isUserExist.email === email &&
        String(user._id) !== String(isUserExist._id)
      ) {
        res.code = 400;
        throw new Error("Email already exist.");
      }
    }

    if (profilePic) {
      const pic = await File.findById(profilePic);
      if (!pic) {
        res.code = 404;
        throw new Error("File not found.");
      }
    }

    user.name = name ? name : user.name;
    user.email = email ? email : user.email;
    user.profilePic = profilePic;

    if (email) {
      user.isVerified = false;
    }

    await user.save();

    res.status(200).json({
      code: 200,
      statue: true,
      message: "Profile Updated",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

const currentUser = async (req, res, next) => {
  try {
    const { _id } = req.user;

    const user = await User.findById(_id)
      .select("-password -verificationCode -forgetPasswordCode")
      .populate({
        path: "profilePic",
        select: "-img.data", // Exclude the img.data field from profilePic
      });
    if (!user) {
      res.code = 404;
      throw new Error("User not found");
    }

    res.status(200).json({
      code: 200,
      status: true,
      message: "Current User",
      data: { user },
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
  signin,
  verifyCode,
  verifyUser,
  forgetPasswordCode,
  recoverPassword,
  changePassword,
  updateProfile,
  currentUser,
};
