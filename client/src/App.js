// //import React from "react";
// import { useEffect, useState } from "react";
// import AdminHome from "./AdminPages/AdminHome";
// import AdminLogin from "./AdminPages/AdminLogin";
// import {BrowserRouter, Routes, Route } from "react-router-dom"
// import axios from "axios"



// function App() {

//   const token = localStorage.getItem("token")
 

//   const [tokendt, setTokendt]  = useState({
//         token

//   })

//   useEffect(()=>{
//      const checkToken = async()=>{
//       try {
//         const res = await axios.post("http://localhost:5000/adminloginapi/checktoken",tokendt)
//         if (res.data.tokensts===1) {
//           console.log("Token not Found from front end")
//            localStorage.removeItem("token")
//            localStorage.removeItem("aid")
//            localStorage.removeItem("aname")
//            localStorage.removeItem("aemail")
          
//         }

//       } catch (error) {
//          console.error(error)
//       }
//      };
//      checkToken();
//   },[])


//   return (
//          <BrowserRouter>
         
//          <Routes>
//            <Route exact path="/adminlogin" element={<AdminLogin/>} />
//            <Route exact path="/adminhome" element={<AdminHome/>} />
//          </Routes>
         
//          </BrowserRouter>

//   );
// }

// export default App;


import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import axios from "axios";
import AdminHome from "./AdminPages/AdminHome";
import AdminLogin from "./AdminPages/AdminLogin";
import ChangePassword from "./AdminPages/ChangePassword";
import UserHome  from "./UserPages/UserHome";


function App() {
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {
    const checkToken = async () => {
      try {
        const res = await axios.post("http://localhost:5000/adminloginapi/checktoken", { token });
        if (res.data.tokensts === 1) {
          console.log("Token not found from front end");
          localStorage.removeItem("token");
          localStorage.removeItem("aid");
          localStorage.removeItem("aname");
          localStorage.removeItem("aemail");
          setToken(null);
        }
      } catch (error) {
        console.error(error);
      }
    };
    checkToken();
  }, [token]);

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/userhome" element={<UserHome />} />
        <Route exact path="/adminlogin" element={<AdminLogin />} />
        <Route exact path="/adminhome" element={<AdminHome />} />
        <Route exact path="/adminchangepass" element={<ChangePassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;