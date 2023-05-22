import React,{useContext} from 'react'
// import { useEffect } from 'react';
import alertContext from '../context/alert/alertContext';

const Alert = () => {
    // using context 
  const context = useContext(alertContext);
  const {alert} = context;

//   useEffect(()=>{
//       showAlert("this is using context" , "success")

//   },[])

   
    return (
        <>
            {alert && <div className={`alert alert-${alert.type}`} role="alert">
               {alert.msg}
            </div>}
        </>
    )
}

export default Alert
