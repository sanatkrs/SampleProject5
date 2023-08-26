const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const date = require(__dirname + "/date.js");


const app = express();
const port = 3000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.set("view engine", "ejs");
mongoose.connect('mongodb+srv://sanat:9219531370@cluster0.iie0kzp.mongodb.net/todoDB');
const itemSchema = {
  name: String,
};
const Item = mongoose.model("item", itemSchema);
const item1 = new Item({
  name: "Buy food",
});
const item2 = new Item({
  name: "Cook food",
});
const item3 = new Item({
  name: "Eat food",
})

const defaultItems = [item1, item2, item3];


var workList = [];



app.get("/", function (req, res) {
  Item.find({}).then(function (foundItems) {
    if (foundItems.length === 0) {
      Item.insertMany(defaultItems).then(function (items) {
        console.log("Items added");
      })
      res.redirect("/");
    } else {
      res.render("list", { listTitle: "Today", newListItem: foundItems });

    };
  
  });
});

app.get("/work", function (req, res) {
  res.render("list", { listTitle: "Work list", newListItem: workList });
})

app.post("/", function (req, res) {
  const itemName = req.body.newItem;
  const item = new Item({
    name: itemName
  });
  item.save();
  res.redirect("/");

})

app.post("/delete", function (req, res) {
  let checkedItemId = req.body.checkbox;
  Item.findByIdAndRemove(checkedItemId).then(function (item) {

  })
  res.redirect("/");
})

app.get("/aboutus", function (req, res) {
  res.render("about");
})


app.get("/:customListName", function(req, res) {
  console.log(req.params.customListName)
})


app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
