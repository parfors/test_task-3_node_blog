const { Blog } = require("../../models/blogs");
const fs = require("fs/promises");
const path = require("path");

const coverDir = path.join(__dirname, "../../", "public", "covers");

const add = async (req, res) => {
  // ----------------------cover---------------------
  const _id = req.user;
  const body = req.body;
  let coverUrl;
  if (req.file) {
    const { path: tempUpload, originalname } = req.file;
    const resultUpload = path.join(coverDir, originalname);
    await fs.rename(tempUpload, resultUpload);
    coverUrl = path.join("covers", originalname);
  } else {
    coverUrl = "";
  }
  // ------------------------blog-----------------------
  const { _id: owner } = req.user;
  const result = await Blog.create({
    ...body,
    owner,
    coverUrl,
  });
  res.json({ data: result, message: "success" });
  res.status(200);
};

module.exports = add;
