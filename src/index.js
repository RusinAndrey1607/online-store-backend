require("dotenv").config()
const express = require("express")
const db = require("./db/db")
const app = express()
const port = process.env.PORT || 5000
const cors = require("cors")
const fileUpload = require("express-fileupload")
const models = require("./db/models/models")
const router = require("./routes/index")
const errorMiddleware = require("./middlewares/errorMiddleware")
const path = require("path")

app.use("/static", express.static(path.join(__dirname, "static")));
app.use(cors())
app.use(express.json())
app.use(fileUpload({}))
app.use("/api",router)


//Last middleware 
// app.use(errorMiddleware)

const start = async() =>{
    try {
        await db.authenticate()
        // await db.sync({alter:true})
        app.listen(port,()=>{
            console.log("Server working on port",port);
        })
    } catch (error) {
        console.log(error);
    }
}
start()
