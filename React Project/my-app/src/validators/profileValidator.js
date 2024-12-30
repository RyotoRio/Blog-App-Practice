const isEmail = (email) =>
  String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );

const profileValidator = ({ name, email }) => {
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

  return error;
};

export default profileValidator;
