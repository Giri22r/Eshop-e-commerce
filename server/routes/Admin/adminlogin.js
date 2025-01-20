const Admin = require(`../../models/Admin`)
const Admintoken = require(`../../models/Admintoken`)
const AdminPassReset = require(`../../models/AdminPassReset`)
const bcrypt = require(`bcryptjs`)
const express = require(`express`)
const router = express.Router()
const jwt = require(`jsonwebtoken`)



//http://localhost:5000/adminloginapi/createadmin
router.post(`/createadmin`, async(req, res) =>{

    try {
        
        const newAdmin = new Admin({
            admin_name:req.body.admin_name,
            admin_email:req.body.admin_email,
            admin_pass:await bcrypt.hash(req.body.admin_pass,12)
        })

        const saveAdmin = await newAdmin.save()
        res.status(200).json(saveAdmin)
    } catch (error) {
        res.status(500).json({"error":error})
    }
})



//http://localhost:5000/adminloginapi/login
router.post(`/login`, async(req, res) =>{

    const admin_email = req.body.admin_email
    const admin_pass = req.body.admin_pass

    try {
        const login = await Admin.findOne({admin_email})
        
        if(!login){
            return res.json({"sts":1,"msg":"Mail ID is not Found"})
        }else{
            if (await bcrypt.compare(admin_pass,login.admin_pass)) {
                const token = jwt.sign({adminId:login._id},process.env.ADMIN_TOKEN_SECRET,{expiresIn:'6hr'})
                const expriresAT = new Date(Date.now()+(6*60*60*1000))
                const adminTokenSave = new Admintoken({
                    adminId:login._id,
                    expriresAT,
                    token,
                    
                })
                
                const aid = login._id
                const aemail = login.admin_email
                const aname = login.admin_name

                await adminTokenSave.save()
                return res.json({"sts":0,aid,aemail,aname,token})


            } else {
                return res.json({"sts":2,"msg":"Password is not Found"})
            }
        }
       
    } catch (error) {
        res.status(500).json({"error":error})
    }
})





//http://localhost:5000/adminloginapi/checktoken
router.post(`/checktoken`, async (req, res) => {
    const token = req.body.token;
  
    try {
      const tokenchk = await Admintoken.findOne({ token });
      //console.log("Token check executed");
      if (!tokenchk) {
        return res.json({ tokensts: 1 }); // No token found
      } else {
        return res.json({ tokensts: 0 }); // Token found
      }
    } catch (error) {
      console.error("Error checking token:", error);
      res.status(500).json({ error: error.message });
    }
  });




//http://localhost:5000/adminloginapi/updatepass
router.post(`/updatepass`, async (req, res) => {

    const admin_email = req.body.admin_email;
    const old_pass = req.body.old_pass;
    const admin_pass = req.body.admin_pass;


 
    try {
        const passchk = await Admin.findOne({admin_email})
        if (await bcrypt.compare(old_pass,passchk.admin_pass)) {
            const hasadmin_pass = await bcrypt.hash(admin_pass,12)
            const updateAdminpass = await Admin.findByIdAndUpdate(
                {admin_email:admin_email},
                {$set:{admin_pass,hasadmin_pass}},
                {new:true}
            )
        
        } else {
            console.log({"msg":"old password do not matched"})
        }

        res.json({"chpasssts":0,"msg":"password is changed "},updateAdminpass )
       
    } catch (error) {
        res.json({"chpasssts":1,"msg":"password do not changed;old password do not match "})
    }
})


//http://localhost:5000/adminloginapi/logout
router.post(`/logout`, async (req, res) => {
    console.log("Logout endpoint hit");
    console.log(req.body.token)


    const token  = req.body.token;
    console.log("After sent token:", token);

    try {
        const logoutt = await Admintoken.findOneAndDelete({token})
        if (!logoutt) {
            console.log("token could not find ")
            return res.json({"logoutsts":1, "msg":"logout Failed sachhe wala"})
        } else {
            console.log("token found ")

            return res.json({"logoutsts":0, "msg":"logout is sucessfull git wala"})

        }
        

    } catch (error) {
        console.error(error)
    }

})



module.exports = router;