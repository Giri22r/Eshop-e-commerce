import React, { useEffect, useState } from 'react'
import {  useNavigate } from 'react-router-dom'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AdminNav from '../CommonComponents/AdminNav';
import ErrorMessage from '../CommonComponents/ErrorMessage'
import { toast } from 'react-toastify';
import {ToastContainer} from "react-toastify"



const ForgetPass = () => {


     const [showToast, setShowToast] = useState(false);
        const [msg, setMsg] = useState('');
        const [type, setType] = useState('');

    const handleInputChange = async (e) => {
        
    }

    const handleSubmit = async (e) => {
        
    }




  return (
    <>
    
  
<div className="container">
<ToastContainer/>
<ErrorMessage showToast={showToast} msg={msg} type={type} /> 
        <div className="row justify-content-center">
            <div className="col-md-6">
                <div className="card mt-5 shadow-lg border-0" style={{ borderRadius: '15px' }}>
                    <div className="card-body" style={{ background: 'linear-gradient(90deg, #4e73df 0%, #1cc88a 100%)', color: 'white', padding: '30px' }}>
                        <h2 className="text-center mb-4">Forgot password !</h2>
                        <form>

                            <div className="form-group">
                                <label htmlFor="admin_email">Admin Email</label>
                                <div className="input-group">
                                    <div className="input-group-prepend">
                                        <span className="input-group-text" style={{ backgroundColor: 'white', color: '#4e73df' }}>
                                            <i className="fas fa-lock"></i>
                                        </span>
                                    </div>
                                    <input
                                        type="password"
                                        className="form-control"
                                        id="admin_email"
                                        name="admin_email"
                                        onChange={handleInputChange}
                                        placeholder="Enter the Mail ID"
                                      
                                        style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                                    />
                                </div>
                            </div>

                            <button type="submit" className="btn btn-light btn-block" onClick = {handleSubmit} name="admin_cpass" style={{ borderRadius: '25px', fontWeight: 'bold', color: '#4e73df' }}>Send Resent Link</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
    </>
  )
}

export default ForgetPass
