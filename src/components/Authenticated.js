import React from "react";
import { useContext } from "react";
import NoteContext from "../Context/Notes/NotesContext";
import { Navigate } from "react-router-dom";

export default function Authenticated({ children }) {
    let context = useContext(NoteContext);
    const { isAuthenticated } = context;
    console.log(isAuthenticated)
    if(isAuthenticated==true)
        return children
    else{
        return <Navigate to="/login" />
    } 
}