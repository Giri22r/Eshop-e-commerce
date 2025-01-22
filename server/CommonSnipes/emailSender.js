const nodeMailer = require(`nodemailer`)
const { stack } = require("../routes/Admin/adminlogin")

//SMTP setup

const transpoter = nodeMailer.createTransport({

    host:`smtp.gmail.com`,
    port: 587,
    auth:{
        user:`Enter your email`,
        pass:`pass`
    },

})

const sendEmail = async (to, subject, text) => {
    const mailOptions = {
        from :  `basant.business22@gmail.com`,
        to,
        subject, 
        text
    }

    try {
        const info = await transpoter.sendMail(mailOptions);

    } catch (error) {
        console.error(error)
        
    }
    
}

module.exports = {sendEmail}

