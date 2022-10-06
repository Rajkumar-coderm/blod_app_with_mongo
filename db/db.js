const mongoose = require("mongoose");
const url = "mongodb://localhost/User";

mongoose
  .connect(url)
  .then(() => console.log("Mongodb server connected successfully"))
  .catch((err) => console.log(err.meessage));
