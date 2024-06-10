import React, { useEffect } from 'react'
import {Link, useNavigate } from "react-router-dom";
import iNoteBook from '../assets/iNoteBooklogo.png'
import { useLocation } from "react-router-dom";

function Navbar() {
  const navigate=useNavigate()
  let location = useLocation();
  useEffect(() => {

  }, [location])

  const handleLogout=()=>{
      localStorage.clear();
      navigate("/login")
  }
  
  return (
    <div>
      <nav className="navbar navbar-expand-lg bg-dark navbar-dark">
        <div className="container-fluid">
          <Link className="navbar-brand" to="/">
            <img style={{ height: "45px" }} src={iNoteBook} alt="" />
          </Link>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {localStorage.getItem("token")&&<li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/"
                >
                  Home
                </Link>
              </li>}
              {localStorage.getItem("token") &&<li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/about" ? "active" : ""
                  }`}
                  to="/about"
                >
                  About
                </Link>
              </li>}
            </ul>
            {localStorage.getItem('token')&&
            <div><button onClick={handleLogout} className='btn btn-primary rounded-md mx-3'>Logout</button></div>
            } 
          </div>
        </div>
      </nav>
    </div>
  );
}

export default Navbar