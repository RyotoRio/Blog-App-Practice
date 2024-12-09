const path = require("path");
const { uploadImage } = require("../utils/uploading");
const validateExtension = require("../Validators/file");
const imgSchema = require("../models/File");
const File = require("../models/File");

const uploadFile = async (req, res, next) => {
  try {
    const { file } = req;
    const user = req.user;
    console.log(file);

    if (!file) {
      res.code = 400;
      throw new Error("File is not selected.");
    }

    const ext = path.extname(file.originalname);
    const isvalidExt = validateExtension(ext);

    if (!isvalidExt) {
      res.code = 400;
      throw new Error("Only supported image file are require (jpg, jpeg, png)");
    }

    const pic = uploadImage({ file, ext, user });
    console.log(pic);

    imgSchema.create(pic);

    res.status(200).json({
      code: 200,
      status: true,
      message: "File Uploaded successfully",
      data: pic,
    });
  } catch (error) {
    next(error);
  }
};

const deleteFile = async (req, res, next) => {
  try {
    const { Key } = req.query;
    if (!Key) {
      res.code = 404;
      throw new Error("File not found");
    }

    await File.findOneAndDelete({ Key });

    res.status(200).json({
      code: 200,
      status: true,
      message: "File deleted successfully",
    });
  } catch (error) {
    next(error);
  }
};

module.exports = { uploadFile, deleteFile };
