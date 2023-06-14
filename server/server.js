require("dotenv").config();
const connectDB = require("./connect");

const app = require("./app");

const port = process.env.PORT || 3000;
const db_uri = process.env.DB_URI || 3002;

//Starts server on successfull connection with mongodb databse.
const start = async () => {
  try {
    await connectDB(db_uri);
    app.listen(port, () => {
      console.log(`Server listening on port ${port}. 👍`);
    });
  } catch (error) {
    console.log(error);
    console.log("Failed to connect to the database, server is not running. 👎");
  }
};
start();
