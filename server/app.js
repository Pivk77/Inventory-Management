const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());


// controls and connects UserController.js and ItemController.js
var ItemController = require("./Item/ItemController");
app.use("/items", ItemController);
var UserController = require("./User/UserController");
app.use("/users", UserController);

module.exports = app;
