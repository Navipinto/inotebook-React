import React, { useContext } from "react";
import Notes from '../components/Notes'
import Navbar from "./Navbar";
import { Link } from "react-router-dom";

function Home(props) {

  return (
    <div className=" h-screen bg-gray-200  w-full">
      <Navbar/>
      <br/>
      <br/>
      <div className=" md:px-12 px-4 lg:px-16 py-10">
        <div className="flex flex-row gap-16">

        <h2 className="md:text-4xl text-3xl font-bold text-black">Your Notes</h2>
        <button className=" bg-none border-none text-blue-800 font-semibold text-xl"><Link to="/addnote"> + Add new note</Link></button>
        </div>
        <Notes/>
      </div>
    </div>
  );
}

export default Home;
