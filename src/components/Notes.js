import React, { useContext, useEffect, useRef, useState } from "react";
import NoteContext from "../Context/Notes/NotesContext";
import NoteItem from "./NoteItem";
import { useNavigate } from "react-router-dom";

function Notes(props) {
  const naviagte=useNavigate();
  const {showAlert}=props;
  let context = useContext(NoteContext);
  const { notes, getAllNotes ,editNote} = context;
  useEffect(() => {
    if(localStorage.getItem('token'))
    {
    getAllNotes();
    }
    else{
      naviagte("/login")
    }
  }, [])

const ref = useRef(null);

const refClose = useRef(null);

   const [note, setnote] = useState({
    id:"",
     etitle: "",
     edescription: "",
     etag: "default",
   });

  const updateNote=(currentNote)=>{
      setnote({id:currentNote._id,etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
  }

  const onSubmithandler = (e) => {
    console.log("updatingg the existing note")
    editNote(note.id,note.etitle,note.edescription,note.etag)
    document.getElementById('my_modal_3').close()
    props.showAlert("Note updated succesfully","success")
  };

  const onchangehandler = (e) => {
    setnote({ ...note, [e.target.name]: e.target.value});
  };

  return (
    <div>
      {/* You can open the modal using document.getElementById('ID').showModal() method */}
      {/* <button className="btn" onClick={() => document.getElementById('my_modal_3').showModal()}>open modal</button> */}
      <dialog id="my_modal_3" className="modal">
        <div className="modal-box text-white">
          <h3 className="font-bold text-lg">Update Note!</h3>
          <form method="dialog">
            {/* if there is a button in form, it will close the modal */}
            <div className="mb-3">
              <label htmlFor="title" className="form-label">
                Note Title
              </label>
              <input
                type="text"
                className="form-control"
                id="title"
                name="etitle"
                value={note.etitle}
                aria-describedby="emailHelp"
                onChange={onchangehandler}
                required
                minLength={5}
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
                name="edescription"
                value={note.edescription}
                onChange={onchangehandler}
                required
                minLength={5}
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
                name="etag"
                value={note.etag}
                onChange={onchangehandler}
              />
            </div>
            <button
              type="button"
              className="btn btn-primary"
              onClick={onSubmithandler}
              disabled={note.etitle.length < 5 || note.edescription.length < 5}
            >
              Update Note
            </button>
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
          </form>
          
        </div>
      </dialog>
      {/* <button
        type="button"
        className="btn btn-primary visually-hidden"
        ref={ref}
        data-bs-toggle="modal"
        data-bs-target="#exampleModal"
      >
        Launch demo modal
      </button>

      <div
        className="modal fade"
        id="exampleModal"
        tabIndex="-1"
        aria-labelledby="exampleModalLabel"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                Edit Note
              </h5>
              <button
                type="button"
                className="btn-close"
                data-bs-dismiss="modal"
                aria-label="Close"
              ></button>
            </div>
            <div className="modal-body">
              <form>
                <div className="mb-3">
                  <label htmlFor="title" className="form-label">
                    Note Title
                  </label>
                  <input
                    type="text"
                    className="form-control"
                    id="title"
                    name="etitle"
                    value={note.etitle}
                    aria-describedby="emailHelp"
                    onChange={onchangehandler}
                    required
                    minLength={5}
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
                    name="edescription"
                    value={note.edescription}
                    onChange={onchangehandler}
                    required
                    minLength={5}
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
                    name="etag"
                    value={note.etag}
                    onChange={onchangehandler}
                  />
                </div>
              </form>
            </div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss="modal"
                ref={refClose}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={onSubmithandler}
                disabled={note.etitle.length < 5 || note.edescription.length < 5}
              >
                Update Note
              </button>
            </div>
          </div>
        </div> */}
      {/* </div> */}
      <div className="row my-3">
        {notes.length===0&&<div>Please add the notes to display!</div>}
        {notes.map((note) => {
          return (
            <NoteItem
              note={note}
              key={note._id}
              showAlert={showAlert}
              updateNote={() => {
                updateNote(note);
              }}
            />
          );
        })}
      </div>
    </div>
  );
}

export default Notes