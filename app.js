// jshint esversion:6
const express = require("express");
const bodyParser = require("body-parser");
const date = require(__dirname + "/views/date.js");

const app = express();

const items = ["Brush your teeth", "Make coffee", "Drink coffee"];
const workItems = [];

app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"))

app.get("/", (req, res) => {
    
    const day = date();
    res.render("list", {listTitle: day, newListItems: items});
    // console.log(today.getDay());
});

app.post("/", function(req, res){

    const item = req.body.newItem;

    if (req.body.list === "Work") {
        workItems.push(item);
        res.redirect("/work");
    } else {
        items.push(item);
        res.redirect("/");
    }
    

});

app.get("/work", (req, res) => {
    res.render("list", {listTitle: "Work", newListItems: workItems});
})

// app.post("/work", function (req, res) {
//     let item = req.body.newItem;
//     workItems.push(item);
//     res.redirect("/work");
// })

app.get("/about", (req,res) =>{
    res.render("about");
});

app.listen(3000, function(){
    console.log("The server is successfully running on port 3000.");
});