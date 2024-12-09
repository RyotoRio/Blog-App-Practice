const addCategoryValidator = ({ title }) => {
  const error = {
    title: "",
  };

  if (!title) {
    error.title = "Title is required.";
  }

  return error;
};

export default addCategoryValidator;
