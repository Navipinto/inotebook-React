import './App.css';
import NoteStates from './Context/Notes/NotesStates';
import About from './components/About';
import Home from './components/Home';
import Login from './components/Login';
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import { Toaster } from 'react-hot-toast';
import Welcome from './components/Welcome';
import AddNote from './components/AddNote';

function App() {

  return (
    <>
      <NoteStates>
        <Router>
            <Routes>
            <Route exact path="/" element={<Welcome />}></Route>
              <Route exact path="/home" element={<Home />}></Route>
            <Route exact path="/addnote" element={<AddNote  />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login  />}></Route>
              <Route exact path="/signup" element={<Signup />}></Route>
            </Routes>
        </Router>
        <Toaster/>
      </NoteStates>
    </>
  );
}

export default App;
