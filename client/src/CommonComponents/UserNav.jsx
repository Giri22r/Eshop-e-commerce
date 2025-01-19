import React from 'react'
import { Navbar, Nav, NavDropdown } from 'react-bootstrap';

const UserNav = () => {
  return (
    <>
    
    <Navbar bg="liht-black" expand="sm" className="navbar navbar-expand-sm bg-primary nav-bar">
        <Navbar.Brand href="/userhome" className="navbar-brand">Home</Navbar.Brand>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="mr-auto">
                <Nav.Link href="#About" className="nav-link">About</Nav.Link>
                <Nav.Link href="#link1" className="nav-link">Link 2</Nav.Link>
                <Nav.Link href="adminhome" className="nav-link">Sign In</Nav.Link>
            </Nav>
        </Navbar.Collapse>
    </Navbar>
    </>
  )
}

export default UserNav
