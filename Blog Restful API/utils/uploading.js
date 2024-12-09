const generateCode = require("./generateCode");

const uploadImage = ({ file, ext, user }) => {
  const Key = `${generateCode(12)}_${Date.now()}${ext}`;
  const pic = {
    Key,
    size: file.size,
    img: {
      data: file.buffer,
      contentType: file.mimetype,
    },
    createdBy: user._id,
  };
  try {
    return pic;
  } catch (error) {
    console.log(error);
  }
};

module.exports = { uploadImage };
