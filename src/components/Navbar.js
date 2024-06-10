import React, { useContext, useEffect } from 'react'
import {Link, useNavigate } from "react-router-dom";
import iNoteBook from '../assets/iNoteBooklogo.png'
import { useLocation } from "react-router-dom";
import NoteContext from '../Context/Notes/NotesContext';

function Navbar() {
  let context = useContext(NoteContext);
  const { isAuthenticated,setisAuthenticated ,settoggleon,toggleon} = context;
  const navigate=useNavigate()
  let location = useLocation();
  useEffect(() => {

  }, [location])

  const handleLogout=()=>{
      localStorage.clear();
      setisAuthenticated(false)
      navigate("/login")
  }
  
  return (
      <div className="navbar navbar-expand-lg bg-dark navbar-dark absolute">
        <div className="container-fluid">
          <div className="navbar-brand">
            <img style={{ height: "45px" }} src={iNoteBook} alt="" />
          </div>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarSupportedContent"
            aria-controls="navbarSupportedContent"
            aria-expanded="false"
            aria-label="Toggle navigation"
            onClick={()=>{settoggleon(!toggleon)}}
          >
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              {isAuthenticated&&<li className="nav-item">
                <Link
                  className={`nav-link ${
                    location.pathname === "/" ? "active" : ""
                  }`}
                  aria-current="page"
                  to="/home"
                >
                  Home
                </Link>
              </li>}
              {isAuthenticated &&<li className="nav-item">
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
            {isAuthenticated&&
            <div><button onClick={handleLogout} className='btn btn-primary rounded-md md:mx-3 '>Logout</button></div>
            } 
          </div>
        </div>
      </div>
  );
}

export default Navbar