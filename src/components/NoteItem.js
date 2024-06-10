import React, { useContext } from "react";
import NoteContext from "../Context/Notes/NotesContext";

function NoteItem(props) {
  let context = useContext(NoteContext);
  const { deleteNote } = context;
  const { note,updateNote } = props;
  

  return (
    <div className="col-md-3 my-3">
      <div className="card">
        <div className="card-body">
          <div className="d-flex align-items-center ">
            <h5 className="card-title">{note.title}</h5>
            <i
              className="fa-solid fa-trash mx-3"
              onClick={() => {
                deleteNote(note._id);
                props.showAlert("Note deleted Successfully","success")
              }}
            ></i>
            <i className="fa-solid fa-file-pen" onClick={() => { document.getElementById('my_modal_3').showModal() ;updateNote(note)}}></i>
          </div>
          <p className="card-text">
            {note.description}
          </p>
          <p>{note.tag}</p>
        </div>
      </div>
    </div>
  );
}

export default NoteItem;
