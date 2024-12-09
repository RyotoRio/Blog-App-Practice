const express = require("express");
const isAuth = require("../middlewares/isAuth");
const router = express.Router();
const {
  addPostValidator,
  updatePostValidator,
  idValidator,
} = require("../Validators/post");
const validate = require("../Validators/validate");
const { postController } = require("../controllers");

router.post("/", isAuth, addPostValidator, validate, postController.addPost);

router.put(
  "/:id",
  isAuth,
  updatePostValidator,
  idValidator,
  validate,
  postController.updatePost
);

router.delete("/:id", isAuth, idValidator, validate, postController.deletePost);

router.get("/", isAuth, postController.getPosts);

router.get("/:id", isAuth, idValidator, validate, postController.getPost);

module.exports = router;
