const mongoose = require("mongoose");
const app = require("./app");

const { HOST, MONGO_URL } = process.env;

mongoose
  .connect(MONGO_URL)
  .then(
    app.listen(HOST, () => {
      console.log(`Server is running on port ${HOST}`);
    })
  )
  .catch((error) => {
    console.log(error);
    process.exit(1);
  });
