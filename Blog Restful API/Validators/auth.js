const { check } = require("express-validator");
const validateEmail = require("./validateEmail");
const mongoose = require("mongoose");

const signupValidator = [
  check("name").notEmpty().withMessage("Name is Required"),
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is required"),
  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password should have atleast 8 characters")
    .notEmpty()
    .withMessage("Password is required."),
];

const signinValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is require"),

  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password should have atleast 8 characters")
    .notEmpty()
    .withMessage("Password is required."),
];

const emailValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is require"),
];

const verifyUserValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is require"),

  check("code").notEmpty().withMessage("code is required."),
];

const recoverPasswordValidator = [
  check("email")
    .isEmail()
    .withMessage("Invalid Email")
    .notEmpty()
    .withMessage("Email is require"),

  check("code").notEmpty().withMessage("code is required."),

  check("password")
    .isLength({
      min: 8,
    })
    .withMessage("Password should have atleast 8 characters")
    .notEmpty()
    .withMessage("Password is required."),
];

const changePasswordValidator = [
  check("oldPassword").notEmpty().withMessage("old password is required."),

  check("newPassword").notEmpty().withMessage("new password is required."),
];

const updateProfile = [
  check("email").custom(async (email) => {
    if (email) {
      const isValidEmail = validateEmail(email);
      if (!isValidEmail) {
        throw "Invalid Email";
      }
    }
  }),

  check("profilePic").custom(async (profilePic) => {
    if (profilePic && mongoose.Types.ObjectId.isValid(profilePic)) {
      throw "Invalid profile picture";
    }
  }),
];

module.exports = {
  signupValidator,
  signinValidator,
  emailValidator,
  verifyUserValidator,
  recoverPasswordValidator,
  changePasswordValidator,
  updateProfile,
};
