const express = require("express")

const app = express();


app.set("view engine", "ejs")
app.use(express.static("public"))
app.use(express.urlencoded( {extended: true}))
app.get('/', (req, res) =>{

    res.render("HomePage")
})

app.get("/login", (req, res) =>{
    res.render("login")
})

app.post("/register", (req, res)=>{

    const error = [];


   if(typeof req.body.username !== "string"){
    req.body.username = ""
   }
   if(typeof req.body.password !== "string"){
    req.body.password = ""
   }

   if(!req.body.username){
    error.push("Please enter user name")
   }
   if(req.body.username && req.body.username.length < 3){
    error.push("Username should be at least 3 characters")
   }
    res.send("Thanks your credential submited successefull")

})
app.listen(5500)