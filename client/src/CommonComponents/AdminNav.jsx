import axios from 'axios';
import React, { useState } from 'react';
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'
import { toast } from 'react-toastify';

const AdminNav = () => {

    const nagivate = useNavigate()
    const [showToast, setShowToast] = useState(false);
    const [msg, setMsg] = useState('');
    const [type, setType] = useState('');



    const aid = localStorage.getItem(`aid`);
    const aemail = localStorage.getItem(`aemail`);
    const aname = localStorage.getItem(`aname`);
    const token = localStorage.getItem(`token`);

    console.log("Initial token:", token);
    const [tokendt,setTokendt] = useState(token)
    const logout = async (e) => {
        console.log("Token being sent for logout:", tokendt);
        const res = await axios.post("http://localhost:5000/adminloginapi/logout",{token:tokendt})
        if (res.data.logoutsts === 0) {
            localStorage.removeItem(`token`)　
            localStorage.removeItem(`aid`)
            localStorage.removeItem(`aname`)
            localStorage.removeItem(`aemail`)

            nagivate(`/adminlogin`)
            
        } else {
            setShowToast(true);
            setMsg(res.data.msg);
            toast.error(res.data.msg); // Use toast.error directly
            setTimeout(() => {
                setShowToast(false);
        }, 1000);
            
        }
    }

    return (
        <>
        <ErrorMessage showToast={showToast} msg={msg} type={type} />
        <Navbar bg="liht-black" expand="sm" className="navbar navbar-expand-sm bg-primary nav-bar">
            <Navbar.Brand href="/userhome" className="navbar-brand">Admin e-shop</Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="mr-auto">
                    <Nav.Link href="/adminhome" className="nav-link">Home</Nav.Link>
                    <Nav.Link href="#link1" className="nav-link">Link 1</Nav.Link>
                    <Nav.Link href="#link2" className="nav-link">Link 2</Nav.Link>
                    <NavDropdown title={aname} id="basic-nav-dropdown" className="nav-dropdown">
                        <NavDropdown.Item href="#edit-profile" className="dropdown-item">Edit Profile</NavDropdown.Item>
                        <NavDropdown.Item href="/adminchangepass" className="dropdown-item">Change Password</NavDropdown.Item>
                        <NavDropdown.Item href="#" onClick={logout} className="dropdown-item">Logout</NavDropdown.Item>
                        <NavDropdown.Item href="userhome"  className="dropdown-item">Users UI</NavDropdown.Item>
                    </NavDropdown>
                </Nav>
            </Navbar.Collapse>
        </Navbar>
        </>
    );
};

export default AdminNav;