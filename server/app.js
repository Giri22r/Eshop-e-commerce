require(`dotenv`).config()

const bodyParser = require(`body-parser`)
const express = require(`express`)
const cors = require(`cors`)

const db = require(`./db`)

// All Routers

const adminLoginRoute = require(`./routes/Admin/adminlogin`)

const app = express()
app.use(bodyParser.json())
app.use(cors())

// All Routes api
app.use(`/adminloginapi`,adminLoginRoute)



const port = process.env.PORT
app.get(`/`,(req,res) => {
    res.send("Hello World you jdfs f dfsds  sdfsd  dsfsdf");
})

app.listen(port,()=>{
    console.log(`Server is running on: http://localhost:${port}`)
})

//write the comment just to check

 