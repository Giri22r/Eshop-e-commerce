import React, { useState } from 'react';
import ErrorMessage from '../CommonComponents/ErrorMessage'
import axios from "axios"
import { useNavigate } from 'react-router-dom';

const AdminLogin = () => {
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');


    const navigate = useNavigate();

    const [logindt, setLogindt] = useState({
        admin_email: '',
        admin_pass: '',
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogindt({
            ...logindt,
            [name]: value,
        });
    };


    const handleLogin = async (e) => {
        e.preventDefault()


        try {
            const res = await axios.post(process.env.REACT_APP_ADMIN_LOGIN, logindt)
            if (res.data.sts === 0) {
                localStorage.setItem('aid', res.data.aid);
                localStorage.setItem('aemail', res.data.aemail);
                localStorage.setItem('aname', res.data.aname);
                localStorage.setItem('token', res.data.token);
                navigate('/adminhome');

            } else {
                setShowToast(true);
                setMsg(res.data.msg);
                setType('error');
                setTimeout(() => {
                    setShowToast(false);
                }, 3000);
            }
        } catch (error) {
            console.error(error)
        }

        // setShowToast(true); 
        // setMsg('Login failed'); 
        // setType('error'); 
        // setTimeout(() => {
        //      setShowToast(false); 
        //     }, 3000);  


    };

    return (
        <div className="container">
            <ErrorMessage showToast={showToast} msg={msg} type={type} />
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card mt-5 shadow-lg border-0" style={{ borderRadius: '15px' }}>
                        <div className="card-body" style={{ background: 'linear-gradient(90deg, #4e73df 0%, #1cc88a 100%)', color: 'white', padding: '30px' }}>
                            <h2 className="text-center mb-4">Admin Login</h2>
                            <form>
                                <div className="form-group">
                                    <label htmlFor="admin_email">Admin Email</label>
                                    <div className="input-group">
                                        <div className="input-group-prepend">
                                            <span className="input-group-text" style={{ backgroundColor: 'white', color: '#4e73df' }}>
                                                <i className="fas fa-user"></i>
                                            </span>
                                        </div>
                                        <input
                                            type="text"
                                            className="form-control"
                                            id="admin_email"
                                            name="admin_email"
                                            placeholder="Enter admin Email"
                                            onChange={handleInputChange}
                                            style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                                        />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="admin_pass">Password</label>
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
                                            placeholder="Enter password"
                                            onChange={handleInputChange}
                                            style={{ borderRadius: '0 0.25rem 0.25rem 0' }}
                                        />
                                    </div>
                                </div>
                               <div class="mb-3 text-center">
                                     Forget Password!! <a href='adminforgetpass'> Click Here </a> 
                               </div>
                                <button type="submit" className="btn btn-light btn-block" onClick={handleLogin} style={{ borderRadius: '25px', fontWeight: 'bold', color: '#4e73df' }}>Login</button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminLogin;