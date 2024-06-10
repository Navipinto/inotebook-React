import { useState } from "react"
import NoteContext from "./NotesContext"
import toast from 'react-hot-toast';

const NoteStates=(props)=>{
  const host = "https://inotebook-react-k0tf.onrender.com";
  // const s1={
  //     name:"Naveen Shaun pinto",
  //     age:"21"
  // }
  // const [state, setstate] = useState(s1)

  // const update=()=>{
  //     setTimeout(()=>{
  //         setstate({
  //             name:"Architha S Meti",
  //             age:"22"
  //         })
  //     },2000)

  const [alert, setAlert] = useState(null);
  // const [alert, setAlert] = useState(null);
  // const showAlert = (message, type) => {
  //   setAlert({
  //     message: message,
  //     type: type
  //   })
  //   setshowAlert(true)

  //   setTimeout(() => {
  //     setAlert(null);
  //     setshowAlert(false)
  //   }, 1500);

  const initialNotes = [];
  const [notes, setnotes] = useState(initialNotes);
  const [isAuthenticated, setisAuthenticated] = useState(false)
  const [token, settoken] = useState("")
  const [toggleon, settoggleon] = useState(false)


  //get all notes

  const getAllNotes = async () => {
    //api call
    console.log(token)
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        "auth-token":token
          
      },
    });
    const json= await response.json();
    setnotes(json)
  };

  //add a note

  const addNote = async ({ title, description, tag }) => {
    //api call
    const response = await fetch(`${host}/api/notes/addnotes`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ title, description, tag }),
    });
    const newnote=await response.json();
    setnotes(notes.concat(newnote))
  };

  //delete a note

  const deleteNote = async (id) => {
    //api call
    const response = await fetch(`${host}/api/notes/deletenotes/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
    });
    const json=await response.text()
    console.log(json)

    const newNotes = notes.filter((note) => {
      return note._id !== id;
    });
    setnotes(newNotes);
  };

  //edit the existing note
  const editNote = async (id, title, description, tag) => {
    //api call
    const response = await fetch(`${host}/api/notes/updatenotes/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        "auth-token": token
      },
      body: JSON.stringify({ id,title, description, tag }),
    });
    console.log(await response.json())

    let newNotes= JSON.parse(JSON.stringify(notes))
    for (let index = 0; index < notes.length; index++) {
      const element = notes[index];
      if (element._id === id) {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setnotes(newNotes)
    toast.success("Note updated successfully")
  };

  
  return (
    <NoteContext.Provider value={{ notes, setnotes, addNote, deleteNote ,getAllNotes, editNote,isAuthenticated,setisAuthenticated,setAlert,alert,token,settoken,toggleon,settoggleon}}>
      {props.children}
    </NoteContext.Provider>
  );
}

export default NoteStates

