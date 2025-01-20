const mongoose = require(`mongoose`)

const AdminPassResetSachema = new mongoose.Schema({
    admin_email:{
        type:String,
        required:true,
    },
    reset_token:{
        type:String,
        required:true,
    },
    expriresAT:{
        type:Date,
        required: true,
    }
})

AdminPassResetSachema.index({expriresAT:1},{expireAfterSeconds:0})

module.exports = mongoose.model(`eshop_admin_pass_reset`,AdminPassResetSachema)
