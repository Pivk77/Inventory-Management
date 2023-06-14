var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const User = require("./UserSchema");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Register user to mongoDB with mongoose schema
router.post("/user/add", function (req, res) {
  User.create(
    {
      id: req.body.id,
      name: req.body.name,
      surname: req.body.surname,
      access: req.body.access,
    },
    function (err, user) {
      if (err) {
        res.send(err);
      } else {
        res.status(200);
        res.end("User added 👍");
      }
    }
  );
});

router.get("/user/id/:id", (req, res) => {
  const id = req.params.id;

  User.findOne({ id: id }, (err, user) => {
    if (err) {
      console.error(err);
      res.status(500).send("An error occurred while retrieving user");
    } else if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).send("User not found");
    }
  });
});

// Route to get user by name
router.get("/user/name/:name", (req, res) => {
  const name = req.params.name;

  User.findOne(
    { name: { $regex: req.params.name, $options: "i" } },
    (err, user) => {
      // Find the user by name, regex for case insensitive search
      if (err) {
        console.error(err);
        res.status(500).send("An error occurred while retrieving user");
      } else if (user) {
        res.status(200).json(user);
      } else {
        res.status(404).send("User not found");
      }
    }
  );
});
// Verify user on login
router.post("/login", function (req, res) {});

// User logout
router.get("/logout", function (req, res) {});
module.exports = router;
