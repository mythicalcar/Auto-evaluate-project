require("dotenv").config()
const express = require("express")
const app = express()
const path = require("path")
const mongoose = require("mongoose")
const PORT = process.env.PORT || 5500

const dbConn = async () => {
    try {
        mongoose.connect(process.env.DB_URI, {
            useUnifiedTopology: true,
            useNewUrlParser: true
        })
    } catch(err){
        //...
    }
}

dbConn()

app.set("view engine", "ejs")

app.use(express.json())
app.use(express.urlencoded({extended: true}))
app.use(express.static(path.join(__dirname, "/scripts")))
app.use(express.static(path.join(__dirname, "/styles")))

app.get("/", (req, res) => {
    res.render("home.ejs")
})


//maakt connectie met database, als deze succesvol is, begint de server met luisteren naar requests
mongoose.connection.once("open", () => {
    console.log("database connected!")
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`)
    })
})
