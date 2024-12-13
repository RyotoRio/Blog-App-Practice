const addPostValidator = ({ title, category }) => {
  const error = {
    title: "",
    category: "",
  };

  if (!title) {
    error.title = "Title is required.";
  }

  if (!category) {
    error.category = "Category is required.";
  }

  return error;
};

export default addPostValidator;
