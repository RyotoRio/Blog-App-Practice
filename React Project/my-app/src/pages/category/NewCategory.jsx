import { useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import addCategoryValidator from "../../validators/addCategoryValidator";

const initialFormData = {
  title: "",
  desc: "",
};

const initialFormError = {
  title: "",
};

const NewCategory = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState(initialFormData);

  const [formError, setFormError] = useState(initialFormError);

  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = addCategoryValidator({ title: formData.title });

    if (errors.title) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        //api request
        // const requestBody = {
        //   email: formData.email,
        //   password: formData.password,
        // };

        //we will not need request body as forData state has same  properties as requestBody

        const response = await axios.post("/category", formData);

        const data = response.data;

        console.log(data);

        toast.success(data.message, {
          position: "top-left",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/categories");
      } catch (error) {
        setLoading(false);
        const response = error.response;
        const data = response.data;
        console.log(data);

        toast.error(data.message, {
          position: "top-left",
          autoClose: true,
        });
      }
      setFormError(initialFormError);
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">New Catogory</h2>
          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="Technology"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <input
              className="form-control"
              type="text"
              name="desc"
              placeholder="AI and ML"
              value={formData.desc}
              onChange={handleChange}
            />
          </div>

          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={`${loading ? "Adding..." : "Add"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewCategory;
