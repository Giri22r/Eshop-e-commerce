
require(`dotenv`).config()
const mongoose = require(`mongoose`)

mongoose.connect(process.env.DB_URL)

mongoose.connection.on(`connected`, ()=>{

    console.log("Connected to Mongodb");
    
})

mongoose.connection.on(`error`, (error)=>{
    console.error("Error is error: ",error);
    
})

module.exports = mongoose;