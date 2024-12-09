const isEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const loginValidator = ({ email, password }) => {
  const error = {
    email: "",
    password: "",
  };

  if (!email) {
    error.email = "Email is required";
  } else if (!isEmail(email)) {
    error.email = "Invalid email";
  }

  if (!password) {
    error.password = "Password is required";
  } else if (password.length <= 8) {
    error.password = "Password should be 8 letter long";
  }

  return error;
};

export default loginValidator;
