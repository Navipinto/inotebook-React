import React,{useState} from "react";
import { Link, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

function Login(props) {
    const [credentials, setcredentials] = useState({email:"",password:""})
    const navigate=useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault();
        const response = await fetch(`http://localhost:5000/api/auth/login`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email:credentials.email,password:credentials.password})
        });
        const json = await response.json();
        if(json.status)
        {
            localStorage.setItem("token",json.authtoken)
            navigate("/home")
            props.showAlert("You have logged in Succesfully","success")
        }
        else
        {
            console.log("enter the valid details")
            props.showAlert("Login failed! try again.", "danger")
        }
        setcredentials({email:"",password:""})
    }

    const onchangehandler = (e) => {
        setcredentials({ ...credentials, [e.target.name]: e.target.value });
    };
    return (
        <div className="-mt-16 h-screen w-full flex items-center justify-center text-white">
            <img src="https://wallpapercave.com/wp/wp9878778.jpg" alt="" className="w-full h-screen absolute "/>
            <div className="modal-box w-96 bg-black bg-opacity-50 z-10">
                <form method="dialog gap-3" onSubmit={handleSubmit}>
                    {/* if there is a button in form, it will close the modal */}
                    <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id="closeclicklogin">✕</button>
                    <h2 className='text-xl font-semibold mx-2'>Login</h2>
                    <label className="form-control w-full max-w-xs bg-transparent border-none text-white">
                        <div className="label">
                            <span className="label-text font-semibold">Email</span>
                        </div>
                        <input type="email" placeholder="Enter the email" className="input input-bordered w-full max-w-xs" name="email"
                            value={credentials.email}
                            onChange={onchangehandler} />
                    </label>
                    <label className="form-control w-full max-w-xs bg-transparent border-none text-white">
                        <div className="label">
                            <span className="label-text font-semibold">Password</span>
                        </div>
                        <input type="password" placeholder="Enter the password" className="input input-bordered w-full max-w-xs" name="password"
                            value={credentials.password}
                            onChange={onchangehandler} />
                    </label>
                    <div className='flex flex-row gap-16 items-center my-3 mx-3'>
                        <button className='py-2 px-3 bg-pink-500 rounded-md text-white font-semibold'>Submit</button>
                        <p>Not registered?<Link to="/signup" className='text-blue-400 underline'>Signup</Link></p>
                    </div>
                </form>
                <div>
                </div>
            </div>
            {/* <Navbar/>
            <form onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label htmlFor="email" className="form-label">
                        Email address
                    </label>
                    <input
                        type="email"
                        className="form-control"
                        id="email"
                        aria-describedby="emailHelp"
                        name="email"
                        value={credentials.email}
                        onChange={onchangehandler}
                    />
                    <div id="emailHelp" className="form-text">
                        We'll never share your email with anyone else.
                    </div>
                </div>
                <div className="mb-3">
                    <label htmlFor="password" className="form-label">
                        Password
                    </label>
                    <input
                        type="password"
                        className="form-control"
                        id="password"
                        name="password"
                        value={credentials.password}
                        onChange={onchangehandler}
                    />
                </div>
                <button type="submit" className="btn btn-primary">
                    Submit
                </button>
            </form> */}
        </div>
    );
}

export default Login;
