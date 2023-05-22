import React, { useState,useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import alertContext from '../context/alert/alertContext';

const Signup = () => {

    // using context 
  const alertcontext = useContext(alertContext);
  const {showAlert} = alertcontext;

    const [cred, setCred] = useState({ name: "", email: "", password: "" , cpassword:"" })
    let navigate = useNavigate();

    // login submit
    const handleClick = async (e) => {
        e.preventDefault()
        // api call
        const response = await fetch("http://localhost:5000/api/Auth/newuser", {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({name: cred.name , email: cred.email , password: cred.password })
        });
        const json = await response.json();
        console.log(json);
        if (json.success) {
            // save auth token and redirect 
            localStorage.setItem('token', json.jwtToken);
            navigate("/")
            showAlert("Created Account successfully","success");
        }
        else {
            showAlert("Invalid Credentials","danger");
        }
    }

    const onChange = (e) => {
        setCred({ ...cred, [e.target.name]: e.target.value })
    }


    return (
        <div>
            <form onSubmit={handleClick} >
                <div className="mb-3">
                    <label htmlFor="name" className="form-label">Name</label>
                    <input type="text" className="form-control" name='name' onChange={onChange} id="name" />
                </div>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">Email address</label>
                    <input type="email" className="form-control" name='email' id="email"  onChange={onChange} aria-describedby="emailHelp" />
                    <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">Password</label>
                    <input type="password" className="form-control" name='password' onChange={onChange} minLength={5} required id="password" />
                </div>
                <div className="mb-3">
                    <label htmlFor="cpassword" className="form-label">Confirm Password</label>
                    <input type="password" className="form-control" name='cpassword' onChange={onChange} minLength={5} required id="cpassword" />
                </div>
                <button disabled={cred.password !== cred.cpassword} type="submit" className="btn btn-info">Submit</button>
            </form>
        </div>
    )
}

export default Signup
