import { useEffect, useState } from "react";
import { Buffer } from "buffer";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "../../utils/axiosInstance";
import moment from "moment";
import { Modal, Button } from "react-bootstrap";

const DetailPost = () => {
  const [post, setPost] = useState(null);
  const [fileUrl, setFileUrl] = useState(null);

  const [showModal, setShowModal] = useState(false);
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

          setPost(data.post);
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
    if (post && post?.file) {
      const getFile = async () => {
        try {
          //api request
          const response = await axios.get(`/posts/${postId}`);
          const data = response.data.data;
          const image = data.post.file;
          const imageBuffer = Buffer.from(image.img.data.data);
          setFileUrl(
            `data:${image.img.contentType};base64,${imageBuffer.toString(
              "base64"
            )}`
          );
        } catch (error) {
          const response = error.response;
          const data = response.data;
          toast.error(data.message, {
            position: "top-left",
            autoClose: true,
          });
        }
      };

      getFile();
    }
  }, [post]);

  const handleDelete = async () => {
    try {
      const response = await axios.delete(`/posts/${postId}`);

      const data = response.data;
      toast.success(data.message, {
        position: "top-left",
        autoClose: true,
      });

      navigate("/post");

      setShowModal(false);
    } catch (error) {
      setShowModal(false);
      const response = error.response;
      const data = response.data;
      toast.error(data.message, {
        position: "top-left",
        autoClose: true,
      });
    }
  };

  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button
        className="button button-block"
        onClick={() => navigate(`/posts/update-post/${postId}`)}
      >
        Update Post
      </button>
      <button
        className="button button-block"
        onClick={() => setShowModal(true)}
      >
        Delete Post
      </button>
      <div className="detail-container">
        <h2 className="post-title">{post?.title}</h2>
        <h5 className="post-category">{post?.category?.title}</h5>
        <h5 className="post-category">
          Created at: {moment(post?.createdAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <h5 className="post-category">
          Updated at: {moment(post?.updatedAt).format("YYYY-MM-DD HH:mm:ss")}
        </h5>
        <p className="post-desc">{post?.desc}</p>

        <img src={fileUrl} alt="Your image description" />
      </div>

      <Modal
        show={showModal}
        onHide={() => {
          setShowModal(false);
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title>Are you sure you want to delete?</Modal.Title>
        </Modal.Header>

        <Modal.Footer>
          <div style={{ margin: "0 auto" }}>
            <Button
              className="no-button"
              onClick={() => {
                setShowModal(false);
              }}
            >
              No
            </Button>
            <Button className="yes-button" onClick={handleDelete}>
              Yes
            </Button>
          </div>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default DetailPost;
