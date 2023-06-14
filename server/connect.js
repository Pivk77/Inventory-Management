const mongoose = require("mongoose");

mongoose.set("strictQuery", false); //option will be switched back to false by default in Mongoose 7

const connectDB = (URL) => {
  return mongoose.connect(URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
};

module.exports = connectDB;
