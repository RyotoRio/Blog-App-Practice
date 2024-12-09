const express = require("express");
const router = express.Router();
const { categoryController } = require("../controllers");
const { addCategoryValidator, idValidator } = require("../Validators/category");
const validate = require("../Validators/validate");
const isAuth = require("../middlewares/isAuth");
const isAdmin = require("../middlewares/isAdmin");

router.post(
  "/",
  isAuth,
  addCategoryValidator,
  validate,
  categoryController.addCategory
);

router.put(
  "/:id",
  isAuth,
  isAdmin,
  idValidator,
  validate,
  categoryController.updateCategory
);

router.delete(
  "/:id",
  isAuth,
  isAdmin,
  idValidator,
  validate,
  categoryController.deleteCategory
);

router.get("/", isAuth, categoryController.getCategories);

router.get(
  "/:id",
  isAuth,
  isAdmin,
  idValidator,
  validate,
  categoryController.getCategory
);

module.exports = router;
