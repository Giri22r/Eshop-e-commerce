// import React, { useEffect } from "react"
// import {toast, ToastContainer} from "react-toastify"



// const ErrorMessage = ({showToast,msg,type}) => {

//     const notify = ()=>{
//         toast[type](msg,{
//                 position: "top-center",
//                 autoClose: 5000,
//                 hideProgressBar: false,
//                 closeOnClick: false,
//                 pauseOnHover: true,
//                 draggable: true,
//                 progress: undefined,
//                 theme: "light",
                
//                 }
//         )
//     }

//     useEffect(()=>{
//         if(showToast){
//               notify()
//         }

//     },[showToast])

//   return (
//    <ToastContainer/>
//   )
// }

// export default ErrorMessage


import React, { useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";

const ErrorMessage = ({ showToast, msg, type }) => {

    const notify = () => {
        if (type === 'success') {
            toast.success(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        } else if (type === 'error') {
            toast.error(msg, {
                position: "top-center",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: false,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    };

    useEffect(() => {
        if (showToast) {
            notify();
        }
    }, [showToast]);

    return <ToastContainer />;
};

export default ErrorMessage;
