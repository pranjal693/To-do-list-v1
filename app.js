//jshint exversion-6


const express = require("express");
const bodyParser = require("body-parser");

const app = express();
let items = ["Buy Food","Cook food","Eat food"];
let workItem  = [];

app.set('view engine','ejs');
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static("public"))


app.get("/", function(req,res){
  let today = new Date();
  let currentDay = today.getDay();

  let options = {
    weekday: "long",
    day:"numeric",
    month:"long"
  };

  let day = today.toLocaleString("en-US",options);


  res.render("list", {listTitle: day, newListItems: items});
})
app.post("/", function(req,res){
  let item = req.body.newItem;

  if (req.body.list === "work"){
     workItem.push(item);
     res.redirect("/work");
  }else{
    items.push(item);

   res.redirect("/");
  }

})

app.get("/work",function(req,res){
  res.render("list",{listTitle: "Work list",newListItems: workItem});
})




app.listen(3000, function(){
  console.log("server started on port 3000");
})
