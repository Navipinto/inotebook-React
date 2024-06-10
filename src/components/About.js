import React, { useContext ,useEffect} from 'react'
import Navbar from './Navbar';
import NoteContext from '../Context/Notes/NotesContext';


function About() {
  let context = useContext(NoteContext);
  const { toggleon } = context;
  return (
    <div>
      <Navbar/>
      <br/>
      <br/>
      <div className={`w-full h-screen px-4 md:px-10 ${toggleon?'py-40':'py-10'}`}>
        <h2 className='text-4xl text-black font-bold underline'>About </h2>
        <p className='text-xl text-black text-justify py-3'>iNotebook is a versatile and user-friendly application designed for efficient note management. It serves as a secure digital storage space where users can effortlessly add, delete, and update their notes. The intuitive interface ensures that users can quickly create new notes, categorize and organize them, and make necessary edits or updates as their thoughts evolve. Additionally, iNotebook allows for seamless deletion of outdated or unnecessary notes, ensuring that users can maintain a clutter-free and organized workspace. With robust features and a focus on user convenience, iNotebook is the perfect tool for managing and preserving important information and ideas. </p>
      </div>
    </div>
  );
}

export default About