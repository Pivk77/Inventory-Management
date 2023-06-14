var express = require("express");
var router = express.Router();
var bodyParser = require("body-parser");
const Item = require("./ItemSchema");

router.use(bodyParser.urlencoded({ extended: false }));
router.use(bodyParser.json());

// Route to get all items
router.get("/", async (req, res) => {
  try {
    const items = await Item.find(); // Find all items that belong to the specified rack
    res.send(JSON.stringify(items)); // Return the items as a JSON array
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" }); // If there's a server error, return a 500 error
  }
});

// Router to get item by name
router.get("/item/name/:name", async (req, res) => {
  try {
    const item = await Item.find({
      name: { $regex: req.params.name, $options: "i" },
    }); // Find the item by name, regex for case insensitive search
    if (!item) return res.status(404).json({ message: "Item not found" }); // If item is not found, return a 404 error
    res.json(item); // Return the item as a JSON object
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" }); // If there's a server error, return a 500 error
  }
});

// Route to get all items in a rack
router.get("/rack/:rackNumber", async (req, res) => {
  try {
    const items = await Item.find({ rack: req.params.rackNumber }); // Find all items that belong to the specified rack
    res.json(items); // Return the items as a JSON array
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" }); // If there's a server error, return a 500 error
  }
});

// Add item to db
router.post("/item/add", async function (req, res) {
  const { rack, row, column } = req.body; // Destructure the item properties from the request body

  // Check if there's already an item in the same rack row and column
  const existingItem = await Item.findOne({ rack, row, column });
  if (existingItem) {
    return res.status(409).json({
      message: "An item already exists in this rack, row, and column",
    }); // If an item already exists, return a 409 conflict error
  } else {
    Item.create(
      {
        rack: req.body.rack,
        row: req.body.row,
        column: req.body.column,
        name: req.body.name,
        amount: req.body.amount,
      }, //Insert new item into items db
      function (err, item) {
        if (err) {
          console.log(err);
          res.status(500).send(err);
        } else {
          res.status(200).send("Item added 👍");
        }
      }
    );
  }
});

// Route to update an item by name
router.put("/item/update/:id", async (req, res) => {
  const { rack, row, column, name, amount } = req.body; // Destructure the item properties from the request body

  try {
    // Check if the specified rack, row, and column already contain an item
    const existingItem = await Item.findOne({ rack, row, column });
    if (existingItem && existingItem._id.toString() !== req.params.id) {
      return res
        .status(400)
        .json({ msg: "An item already exists in this rack, row, and column" });
    }

    const updatedItem = await Item.findOneAndUpdate(
      req.params.id, // Find the item by its name
      { rack, row, column, name, amount }, // Update the item properties with the new values
      { new: true } // Return the updated item
    );

    if (!updatedItem) {
      return res.status(404).json({ message: "Item not found" }); // If the item is not found, return a 404 not found error
    }

    // Insert the updated item to the database
    const insertedItem = await updatedItem.save();

    res.json(insertedItem); // Return the updated item as a JSON object
  } catch (err) {
    console.error(err.message);
    res.status(500).json({ message: "Server error" }); // If there's a server error, return a 500 error
  }
});

module.exports = router;
