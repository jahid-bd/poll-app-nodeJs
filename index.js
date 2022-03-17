const express = require("express");
const morgan = require("morgan");
const cors = require("cors");
const mongoose = require("mongoose");

const app = express();

app.set("view engine", "ejs");

app.use(express.urlencoded({ extended: true }));
app.use(express.static("./public"));
app.use(require("./routes"));
app.use(express.json());
app.use(morgan("dev"));
app.use(cors());

mongoose
  .connect("mongodb://localhost:27017/poll")
  .then(() => {
    app.listen(4000, () => {
      console.log("App is listining on port 4000");
    });
  })
  .catch((e) => {
    console.log(e);
  });
