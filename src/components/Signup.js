import React, { useState } from "react";
import toast from 'react-hot-toast';
import { Link, useNavigate } from "react-router-dom";

function Signup(props) {
  const [signupcredentials, setsignupcredentials] = useState({sname:"", semail: "", spassword: "",cpassword:"" })

  const navigate=useNavigate()

  const onchangehandler = (e) => {
    setsignupcredentials({ ...signupcredentials, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch(`http://localhost:5000/api/auth/create-user`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({name:signupcredentials.sname, email:signupcredentials.semail, password:signupcredentials.spassword })
    });
    const json = await response.json();
    console.log(json)
    if (json.status) {
      toast.success("Login Successful!")
      localStorage.setItem("token",json.token)
      navigate("/home")
      props.showAlert("You have succesfully signedup","success")
    }
    else {
      console.log("enter the valid details")
      toast.error("Enter valid credentials!")
      props.showAlert("You failed to signup", "danger")
    }
  }

  return (
    <div className='flex place-items-center justify-center h-screen w-full -mt-16'>
      <img src="https://images.pexels.com/photos/1629212/pexels-photo-1629212.jpeg?cs=srgb&dl=pexels-minan1398-1629212.jpg&fm=jpg" alt="" className="w-full h-screen absolute" />
      <div className="modal-box bg-black bg-opacity-50 text-white w-fit">
        <form method="dialog" onSubmit={handleSubmit}>
          {/* if there is a button in form, it will close the modal */}
          <Link to="/" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id="closeclick">✕</Link>
          <h2 className='text-xl font-semibold mx-2'>Signup</h2>

          <label className="form-control w-full max-w-xs bg-transparent border-none text-white">
            <div className="label">
              <span className="label-text font-semibold">Name</span>
            </div>
            <input type="text" placeholder="Enter the name" className="input input-bordered w-full max-w-xs " name="sname" value={signupcredentials.sname} onChange={onchangehandler} />
          </label>
          <label className="form-control w-full max-w-xs bg-transparent border-none text-white">
            <div className="label">
              <span className="label-text font-semibold">Email</span>
            </div>
            <input type="email" placeholder="Enter the email" className="input input-bordered w-full max-w-xs" name="semail" value={signupcredentials.semail} onChange={onchangehandler} />
          </label>
          <label className="form-control w-full max-w-xs bg-transparent border-none text-white">
            <div className="label">
              <span className="label-text font-semibold">Password</span>
            </div>
            <input type="password" placeholder="Enter the password" className="input input-bordered w-full max-w-xs" name="spassword" value={signupcredentials.spassword} onChange={onchangehandler} />
          </label>
          <div className='flex flex-row gap-11 items-center m-3'>
            <button className='py-2 px-3 bg-pink-500 rounded-md text-white font-semibold'  >Submit</button>
            <p>Already registered?<Link to="/login" className='text-blue-400 underline'>login</Link></p>
          </div>
        </form>
        <div>

        </div>
      </div>
    </div>
      /* <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Name</label>
          <input type="text" className="form-control" id="name" name="sname" aria-describedby="emailHelp" value={signupcredentials.sname} onChange={onchangehandler}/>
        </div>
        <div className="mb-3">
          <label htmlFor="semail" className="form-label">Email address</label>
          <input type="email" className="form-control" id="semail" name="semail" aria-describedby="emailHelp" value={signupcredentials.semail} onChange={onchangehandler}/>
            <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        </div>
        <div className="mb-3">
          <label htmlFor="password" className="form-label">Password</label>
          <input type="password" className="form-control" id="password" name="spassword" value={signupcredentials.spassword} onChange={onchangehandler}/>
        </div>
        <div className="mb-3">
          <label htmlFor="cpassword" className="form-label">Password</label>
          <input type="password" className="form-control" id="cpassword" name="cpassword" value={signupcredentials.cpassword} onChange={onchangehandler}/>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form> */
  )
}

export default Signup