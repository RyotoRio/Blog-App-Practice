const express = require("express");
const router = express.Router();
const isAuth = require("../middlewares/isAuth");
const { fileController } = require("../controllers");
const upload = require("../middlewares/upload");

router.post(
  "/upload",
  isAuth,
  upload.single("image"),
  fileController.uploadFile
);

router.delete("/delete-file", isAuth, fileController.deleteFile);

module.exports = router;
