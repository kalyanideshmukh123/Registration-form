var express=require("express")
var bodyparser=require("body-parser")
var mongoose=require("mongoose")

const app=express()

app.use(bodyparser.json())
app.use(express.static('public'))
app.use(bodyparser.urlencoded({
    extended:true
}))
mongoose.connect('mongodb://localhost:27017/Database')
var db=mongoose.connection
db.on('error',()=> console.log("Error in connecting to Database"))
db.once('open',()=> console.log("Connected to Database"))

app.post("/sign_up",(req,res) =>{
    var name= req.body.name
    var age= req.body.age
    var email= req.body.email
    var phno= req.body.phno
    var gender= req.body.gender
    var password= req.body.password

    var data={
        "name":name,
        "age":age,
        "email":email,
        "phno":phno,
        "gender":gender,
        "password":password
    }
    db.dropCollection('users').insertOne(data,(err,collection)=>{
        if(err){
            throw err;
        }
        console.log("Record Inserted Succesfully")
    })
    return res.redirect('signup_successful.html')
})
app.get("/",(req,res) => {
    res.set({
        "Allow-acces-Allow-Origin":"*"
    })
    return res.redirect('index.html')
}).listen(8080);

console.log("Listening on port")
