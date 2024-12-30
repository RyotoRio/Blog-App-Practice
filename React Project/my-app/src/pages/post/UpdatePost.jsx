import { useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "../../utils/axiosInstance";
import { toast } from "react-toastify";
import addPostValidator from "../../validators/addPostValidator";

const initialFormData = {
  title: "",
  desc: "",
  category: "",
};

const initialFormError = {
  title: "",
  category: "",
};

const UpdatePost = () => {
  const [formData, setFormData] = useState(initialFormData);

  const [formError, setFormError] = useState(initialFormError);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [extensionError, setEntensionError] = useState(null);
  const [isDisable, setIsDisable] = useState(false);
  const [fileId, setFileId] = useState(null);

  const navigate = useNavigate();

  const params = useParams();
  const postId = params.id;

  useEffect(() => {
    if (postId) {
      const getPost = async () => {
        try {
          //api request
          const response = await axios.get(`/posts/${postId}`);
          const data = response.data.data;

          setFormData({
            title: data.post.title,
            desc: data.post.desc,
            category: data.post.category._id,
            file: data.post?.file?._id,
          });

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

      getPost();
    }
  }, [postId]);

  useEffect(() => {
    // This is where you would fetch the data from your API
    const getCategories = async () => {
      try {
        //api request
        const response = await axios.get(`/category?size=1000`);
        const data = response.data.data;

        setCategories(data.categories);
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
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const errors = addPostValidator({
      title: formData.title,
      category: formData.category,
    });

    if (errors.title || errors.category) {
      setFormError(errors);
    } else {
      try {
        setLoading(true);

        let input = formData;

        if (fileId) {
          input = { ...input, image: fileId };
        }
        //api request
        const response = await axios.put(`/posts/${postId}`, input);

        const data = response.data;

        toast.success(data.message, {
          position: "top-left",
          autoClose: true,
        });

        setFormData(initialFormData);
        setFormError(initialFormError);
        setLoading(false);
        navigate("/posts");
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

  const handleFileChange = async (e) => {
    console.log(e.target.files);

    const formInput = new FormData();
    formInput.append("image", e.target.files[0]);

    const type = e.target.files[0].type;
    if (type === "image/png" || type === "image/jpg" || type === "image/jpeg") {
      setEntensionError(null);

      try {
        setIsDisable(true);
        //api request
        const response = await axios.post("/file/upload", formInput);

        const data = response.data;

        setFileId(data.data._id);

        console.log(data);

        toast.success(data.message, {
          position: "top-left",
          autoClose: true,
        });
        setIsDisable(false);
      } catch (error) {
        setIsDisable(false);
        const response = error.response;
        const data = response.data;
        console.log(data);

        toast.error(data.message, {
          position: "top-left",
          autoClose: true,
        });
      }
    } else {
      setEntensionError("Only PNG or JPG or JPEG files are allowed.");
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container" onSubmit={handleSubmit}>
          <h2 className="form-title">Update Post</h2>

          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React blog post"
              value={formData.title}
              onChange={handleChange}
            />
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="desc"
              placeholder="Lorem ipsum"
              value={formData.desc}
              onChange={handleChange}
            ></textarea>
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
              onChange={handleFileChange}
            />
            {extensionError && <p className="error">{extensionError}</p>}
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select
              className="form-control"
              name="category"
              value={formData.category}
              onChange={handleChange}
            >
              {categories.map((category) => (
                <option key={category._id} value={category._id}>
                  {category.title}
                </option>
              ))}
            </select>
            {formError.title && <p className="error">{formError.title}</p>}
          </div>

          <div className="form-group">
            <input
              className="button"
              type="submit"
              disabled={isDisable}
              value={`${loading ? "updating..." : "update"}`}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default UpdatePost;
