import React, { useEffect } from 'react'
import {  useNavigate } from 'react-router-dom'
import AdminNav from '../CommonComponents/AdminNav';

const AdminHome = () => {

    const navigate = useNavigate();

    const aid = localStorage.getItem('aid')
    const aemail = localStorage.getItem('aemail')
    const aname = localStorage.getItem('aname')
    const token = localStorage.getItem('token')


    useEffect(()=>{

        if(token===null){
            navigate(`/adminlogin`)
        }
    })

    return (
        <div>
            <AdminNav></AdminNav>
              <p>Welcome to the Home: Mr/Mrs {aname}</p>
        </div>
    )
}

export default AdminHome
