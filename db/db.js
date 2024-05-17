const mongoose = require("mongoose");

mongoose
  .connect(
    "mongodb+srv://naresh762003:demo123@cluster0.q5j9u0z.mongodb.net/courses"
  )
  .then(() => {
    console.log("database is connected successfully");
  })
  .catch((err) => {
    console.log(err);
  });

module.exports = mongoose;
