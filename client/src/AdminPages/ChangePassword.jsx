import axios from 'axios';
import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AdminNav from '../CommonComponents/AdminNav';
import ErrorMessage from '../CommonComponents/ErrorMessage'
import { toast } from 'react-toastify';
import {ToastContainer} from "react-toastify"


function ChangePassword() {

    const navigate = useNavigate();
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');


    const aid = localStorage.getItem('aid')
    const aemail = localStorage.getItem('aemail')
    const aname = localStorage.getItem('aname')
    const token = localStorage.getItem('token')


        const [cpassdt, setCpassdt] = useState({
            old_pass: '',
            admin_pass: '',
            admin_email: aemail
        });
    
        const handleInputChange = (e) => {
            const { name, value } = e.target;
            setCpassdt({
                ...cpassdt,
                [name]: value,
            });
        };


        const handleSubmit = async (e) => {
            e.preventDefault();
        
            try {
                const res = await axios.post("http://localhost:5000/adminloginapi/updatepass", cpassdt);
                console.log(res);
                setShowToast(true);
                setMsg(res.data.msg);
                if (res.data.chpasssts === 0) {
                   // setType('sucess');
                   toast.success(res.data.msg); // Use toast.success directly
                } else {
                    //setType('error');
                    toast.error(res.data.msg); // Use toast.error directly
                }
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
        
            } catch (error) {
                console.error(error);
                toast.error("An error occurred while changing the password.");
            }
        };

    useEffect(()=>{

        if(token===null){
            navigate(`/adminlogin`)
        }
    })
  return (
    <>
        <AdminNav/>
      
    <div className="container">
    <ToastContainer/>
    <ErrorMessage showToast={showToast} msg={msg} type={type} /> 
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 shadow-lg border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-body" style={{ background: 'linear-gradient(90deg, #4e73df 0%, #1cc88a 100%)', color: 'white', padding: '30px' }}>
                            <h2 className="text-center mb-4">Change Password of {aemail}</h2>
                            <form>
    
                                <div className="form-group">
                                    <label htmlFor="old_pass">Old Password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" style={{ backgroundColor: 'white', color: '#4e73df' }}>
                                                <i className="fas fa-lock"></i>
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="old_pass"
                                            name="old_pass"
                                            onChange={handleInputChange}
                                            placeholder="Enter old password"
                                          
                                            style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                                        />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="admin_pass">New Password</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" style={{ backgroundColor: 'white', color: '#4e73df' }}>
                                                <i className="fas fa-lock"></i>
                                            </span>
                                        </div>
                                        <input
                                            type="password"
                                            className="form-control"
                                            id="admin_pass"
                                            name="admin_pass"
                                            onChange={handleInputChange}
                                            placeholder="Enter new password"
                                          
                                            style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                                        />
                                    </div>
                                </div>
                                <button type="submit" className="btn btn-light btn-block" onClick = {handleSubmit} name="admin_cpass" style={{ borderRadius: '25px', fontWeight: 'bold', color: '#4e73df' }}>Change Password</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        </>
  )
}

export default ChangePassword
