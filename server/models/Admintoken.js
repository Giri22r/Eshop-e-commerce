//const Admin = require(`../../models/Admin`)
const bcrypt = require(`bcryptjs`)
const express = require(`express`)
const { default: mongoose } = require("mongoose")
const router = express.Router()


const adminTokenSchema = new mongoose.Schema({

    adminID:{
       type:mongoose.Schema.Types.ObjectId,
       require:true,
       ref: "eshop_admin"

    },

    token:{
        type:String,
        required:true,
    },
    expriresAT:{
        type:Date,
        required: true,
    }
    

})

adminTokenSchema.index({expriresAT:1},{expireAfterSeconds:0})

module.exports = mongoose.model(`eshop_admin_token`,adminTokenSchema)