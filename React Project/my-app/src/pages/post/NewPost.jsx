import { useNavigate } from "react-router-dom";

const NewPost = () => {
  const navigate = useNavigate();

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <div className="form-container">
        <form className="inner-container">
          <h2 className="form-title">New Post</h2>

          <div className="form-group">
            <label>Title</label>
            <input
              className="form-control"
              type="text"
              name="title"
              placeholder="React blog post"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              className="form-control"
              name="desc"
              placeholder="Lorem ipsum"
            ></textarea>
          </div>

          <div className="form-group">
            <label>Select an image</label>
            <input
              className="form-control"
              type="file"
              name="file"
              placeholder="Lorem ipsum"
            />
          </div>

          <div className="form-group">
            <label>Select a category</label>
            <select className="form-control">
              <option value="category 1">category 1</option>
              <option value="category 2">category 2</option>
              <option value="category 3">category 3</option>
            </select>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewPost;
