import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import AdminNav from '../CommonComponents/AdminNav';
import ErrorMessage from '../CommonComponents/ErrorMessage';
import { toast } from 'react-toastify';
import { ToastContainer } from 'react-toastify';
import axios from 'axios';

const ResetPassLink = () => {
    
    const { rtoken } = useParams();
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');
    const [resetpassdt, setResetpassdt] = useState({
        reset_token: rtoken,
        admin_pass: "",
    });

    const handleInputChange = async (e) => {
        const { name, value } = e.target;
        setResetpassdt({
            ...resetpassdt,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("the value of resetpassdt before sending", resetpassdt);
        try {
            const res = await axios.post("http://localhost:5000/adminloginapi/resetpass", resetpassdt);
            console.log(res);
            setShowToast(true);
            setMsg(res.data.msg);
            if (res.data.sts === 0) {
                toast.success(res.data.msg); // Use toast.success directly
            } else {
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

    return (
        <>
            <div className="container">
                <ToastContainer />
                <ErrorMessage showToast={showToast} msg={msg} type={type} />
                <div className="row justify-content-center">
                    <div className="col-md-6">
                        <div className="card mt-5 shadow-lg border-0" style={{ borderRadius: '15px' }}>
                            <div className="card-body" style={{ background: 'linear-gradient(90deg, #4e73df 0%, #1cc88a 100%)', color: 'white', padding: '30px' }}>
                                <h2 className="text-center mb-4">Change New Password</h2>
                                <form>
                                    <div className="form-group">
                                        <label htmlFor="admin_pass">Admin New Password</label>
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
                                                placeholder="Enter New Password"
                                                style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                                            />
                                        </div>
                                    </div>
                                    <button type="submit" className="btn btn-light btn-block" onClick={handleSubmit} name="admin_cpass" style={{ borderRadius: '25px', fontWeight: 'bold', color: '#4e73df' }}>Change Password</button>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ResetPassLink;