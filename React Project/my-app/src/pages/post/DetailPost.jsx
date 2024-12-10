import placeImg from "../../assets/images/download.jpeg";
import { useNavigate } from "react-router-dom";

const DetailPost = () => {
  const navigate = useNavigate();
  return (
    <div>
      <button className="button button-block" onClick={() => navigate(-1)}>
        Go Back
      </button>
      <button
        className="button button-block"
        onClick={() => navigate("/posts/update-post")}
      >
        Update Post
      </button>
      <div className="detail-container">
        <h2 className="post-title">React Blog post</h2>
        <h5 className="post-category">Category: Categroy 2</h5>
        <h5 className="post-category">Created at: 12/08/2024</h5>
        <h5 className="post-category">Updated at: 12/08/2024</h5>
        <p className="post-desc">
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur
          tempora eligendi nobis natus dicta non ex. Placeat, cupiditate
          asperiores temporibus ea modi sequi fugit consequuntur voluptates quas
          dicta, labore perspiciatis eveniet neque saepe eum doloremque natus
          ducimus, tempore id? Ipsum corrupti vero amet. Delectus hic expedita,
          consequuntur nesciunt molestiae libero, distinctio quisquam illo
          dolore beatae facilis! Autem, nihil distinctio? Ea, illo. Vitae
          assumenda placeat ratione earum porro, obcaecati ex error itaque sit
          eum sapiente qui eveniet hic commodi consequuntur nulla atque totam
          corrupti temporibus in perspiciatis? Dicta perspiciatis ut provident
          accusantium! Nam illum quibusdam quas. Laudantium consequatur modi
          tenetur repellendus aut saepe aspernatur porro soluta pariatur
          molestias, molestiae in quo obcaecati repellat. Exercitationem
          perferendis harum quos maiores nesciunt, accusamus sunt.
        </p>

        <img src={placeImg} alt="" />
      </div>
    </div>
  );
};

export default DetailPost;
