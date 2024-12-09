import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
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

const UpdateCategory = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [formError, setFormError] = useState(initialFormError);

  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();
  const params = useParams();
  const categoryId = params.id;

  useEffect(() => {
    if (categoryId) {
      const getCategories = async () => {
        try {
          //api request
          const response = await axios.get(`/category/${categoryId}`);
          const data = response.data.data;

          setFormData({ title: data.title, desc: data.desc });

          console.log(data);
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-left",
            autoClose: true,
          });
        }
      };

      getCategories();
    }
  }, [categoryId]);

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
        const response = await axios.put(`/category/${categoryId}`, formData);

        const data = response.data;

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
          <h2 className="form-title">Update Catogory</h2>
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
            {formError.desc && <p className="error">{formError.desc}</p>}
          </div>

          <div className="form-group">
            <input
              className="button"
              type="submit"
              value={`${loading ? "Updating..." : "Update"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdateCategory;
