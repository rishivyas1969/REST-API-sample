const express = require("express") ;
const app = express() ;
const mongoose = require("mongoose") ;

const DATABASE_URL = 'mongodb://localhost/myapi' ;

mongoose.connect(DATABASE_URL, {useNewUrlParser: true}) ;
const db = mongoose.connection ;
db.on("error", (error) => console.log(error)) ;
db.once("open", () => console.log("Database connnected")) ;

app.use(express.json()) ;

const subsRouter = require("./routes/subscribers") ;
app.use( "/subscribers", subsRouter) ;

app.listen(3001, () => {
    console.log("Server started..") ;
})