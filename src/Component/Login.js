import React,{useState, useContext} from 'react'
import {useNavigate} from 'react-router-dom';
import alertContext from '../context/alert/alertContext';

const Login = () => {

  // using context 
  const alertcontext = useContext(alertContext);
  const {showAlert} = alertcontext;

    // use navigate
    let navigate = useNavigate();

    const [cred,setCred] = useState({email:"" , password:""})
    // const [email,setEmail]= useState("");
    // const [password,setPassword]= useState("");

    // login submit
  const handleClick= async (e)=>{
    e.preventDefault()
     // api call
     const response = await fetch("http://localhost:5000/api/auth/login", {
        method: 'POST', 
        headers: {
          'Content-Type': 'application/json',
          },
        body: JSON.stringify({email:cred.email,password:cred.password}) 
      });
      const json = await response.json();
      console.log(json);
      if(json.success){
        // save auth token and redirect 
        localStorage.setItem('token',json.jwtToken);
        localStorage.setItem('names',json.name);
        navigate("/")
        showAlert("Logged in successfully","success");
      }
      else{
        showAlert("Invalid credentials","danger");
      }
  }

  const onChange=(e)=>{
    setCred({...cred,[e.target.name]: e.target.value})
}


    return (
        <>
            <form onSubmit={handleClick}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' value={cred.email} onChange={onChange} id="email" aria-describedby="emailHelp"/>
                        <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div> 
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" onChange={onChange} value={cred.password} name='password' id="password"/>
                </div>
                <button type="submit" className="btn btn-primary">Submit</button>
            </form>
        </>
    )
}

export default Login
