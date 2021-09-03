const express = require("express");
const app = express();
const dotenv = require("dotenv");
dotenv.config();
const PORT = process.env.PORT || 5000;
const cors = require("cors");
const mongoose = require("mongoose");
const errorHandler = require("./middleware/error");

const db = process.env.mongoURI;
app.use(express.json());

mongoose
  .connect(db, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("mongodb running"))
  .catch((err) => {
    console.log("the error is", err);
  });

app.use("/product", require("./routes/product"));
app.use("/", require("./routes/user"));

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`currently running on ${PORT}`);
});
