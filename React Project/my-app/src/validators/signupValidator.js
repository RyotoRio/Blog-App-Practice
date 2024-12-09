const isEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const signupValidator = ({ name, email, password, confirmPassword }) => {
  const error = {
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  };

  if (!name) {
    error.name = "Name is required";
  }

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

  if (password !== confirmPassword) {
    error.confirmPassword = "Password don't match";
  }

  return error;
};

export default signupValidator;
