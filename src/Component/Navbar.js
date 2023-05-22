import React from 'react';

import { Link, useLocation,useNavigate } from "react-router-dom";

function Navbar() {

    let nav = useNavigate();

    let name = localStorage.getItem('names');

    let location = useLocation();

    const logout=()=>{
        localStorage.removeItem('token');
        nav('/login');
    }

    // useEffect(()=>{
    //     console.log(location.pathname);
    // },[location])
    return (
        <div>
            <nav className={`navbar navbar-expand-lg navbar-${location.pathname === "/" ? "light" : "light"}  bg-${location.pathname === "/" ? "ligth" : "primary"}`}>
                <div className="container-fluid">
                    <Link className="navbar-brand" >CloudNotes</Link>
                    <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
                        <span className="navbar-toggler-icon"></span>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarNavAltMarkup">
                        <div className="navbar-nav">
                            <Link className={`nav-link ${location.pathname === "/" ? "active " : ""}`} aria-current="page" to="/">Home</Link>
                            <Link className={`nav-link ${location.pathname === "/about" ? "active " : ""}`} aria-current="page" to="/about">About</Link>


                        </div>
                    </div>
                    {!localStorage.getItem('token')?<form className="d-flex">
                        <Link className="btn btn-info mx-1" to="/login" role="button">Login</Link>
                        <Link className="btn btn-info mx-1" to="/signup" role="button">signup</Link>
                    </form>:
                    
                    <form className="d-flex">
                        <h5 className="mx-1 my-2" >HELLO! {name}</h5>
                        <Link className="btn btn-info mx-1" to="/login" onClick={logout} role="button">Logout</Link>
                    </form>
                    }

                    

                </div>
            </nav>
        </div>
    )
}

export default Navbar
