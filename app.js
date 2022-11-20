const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const authRouter = require("./routes/api/auth");
const blogRouter = require("./routes/api/blogs");

const app = express();

app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.static("public"));

app.use("/api/users", authRouter);
app.use("/api/blogs", blogRouter);

app.use((req, res) => {
  res.status(404).json({ message: "Not found" });
});

app.use((error, req, res, next) => {
  const { status = 500, message = "server error" } = error;
  res.status(status).json({ message });
});

module.exports = app;
