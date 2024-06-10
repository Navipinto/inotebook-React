import React, { useContext ,useState} from "react";
import NoteContext from "../Context/Notes/NotesContext";
import Navbar from "./Navbar";
import { Link, useNavigate } from "react-router-dom";
import toast from 'react-hot-toast';

function AddNote() {
  let context = useContext(NoteContext);
  const navigate=useNavigate()
  const { addNote } = context;

  const [note, setnote] = useState({title:"",description:"",tag:""})
  const onSubmithandler=(e)=>{
    e.preventDefault();
    addNote(note)
    setnote({ title: "", description: "", tag: "" });
    toast.success("Note added successfully")
    navigate("/home")
  }

  const onchangehandler=(e)=>{
        setnote({...note,[e.target.name]:e.target.value})
  }
  return (
    <div className=" h-screen flex flex-col justify-center items-center w-full bg-gradient-to-r from-blue-950 to-cyan-900 absolute">
      <div className="absolute top-0 left-0 right-0 w-full">

      <Navbar/>
      </div>
      <div className="modal-box bg-black bg-opacity-50 text-white px-4 flex flex-col justify-center items-center">
        <form method="dialog" className="sm:w-96">
          {/* if there is a button in form, it will close the modal */}
          <h2 className='text-xl font-semibold mx-2'>Add new note</h2>
          <Link to="/home" className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2" id="closeclick">✕</Link>

          <label className="form-control w-full bg-transparent border-none text-white">
            <div className="label">
              <span className="label-text font-semibold text-white">Note Title</span>
            </div>
            <input type="text" placeholder="Enter the name" className="input input-bordered w-full max-w-xs " name="title"
              onChange={onchangehandler}
              required
              minLength={5}
              value={note.title} />
          </label>
          <label className="form-control w-full bg-transparent border-none text-white">
            <div className="label">
              <span className="label-text font-semibold text-white">Note Description</span>
            </div>
            <input type="email" placeholder="Enter the email" className="input input-bordered w-full max-w-xs" name="description"
              onChange={onchangehandler}
              required
              minLength={5}
              value={note.description} />
          </label>
          <label className="form-control w-full  bg-transparent border-none text-white">
            <div className="label">
              <span className="label-text font-semibold text-white">Tag</span>
            </div>
            <input type="text" placeholder="Enter the password" className="input input-bordered w-full max-w-xs" name="tag"
              onChange={onchangehandler}
              value={note.tag} />
          </label>
          <div className='flex flex-row gap-11 items-center m-3'>
            <button type="submit"
              className="btn btn-primary"
              onClick={onSubmithandler}
              disabled={note.title.length < 5 || note.description.length < 5} >Submit</button>
          </div>
        </form>
        <div>

        </div>
      </div>
      {/* <div className="container h-screen w-full mx-16">
        <h2 className="my-3 text-3xl md:text-4xl text-black font-semibold">Add New Note</h2>
        <form>
          <div className="mb-3">
            <label htmlFor="title" className="form-label">
              Note Title
            </label>
            <input
              type="text"
              className="form-control"
              id="title"
              name="title"
              aria-describedby="emailHelp"
              onChange={onchangehandler}
              required
              minLength={5}
              value={note.title}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="description" className="form-label">
              Note Description
            </label>
            <input
              type="text"
              className="form-control"
              id="description"
              name="description"
              onChange={onchangehandler}
              required
              minLength={5}
              value={note.description}
            />
          </div>
          <div className="mb-3">
            <label htmlFor="tag" className="form-label">
              tag
            </label>
            <input
              type="text"
              className="form-control"
              id="tag"
              name="tag"
              onChange={onchangehandler}
              value={note.tag}
            />
          </div>
          <button
            type="submit"
            className="btn btn-primary"
            onClick={onSubmithandler}
            disabled={note.title.length < 5 || note.description.length < 5}
          >
            Submit
          </button>
        </form>
      </div> */}
    </div>
  );
}

export default AddNote;
