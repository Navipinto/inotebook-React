import './App.css';
import NoteStates from './Context/Notes/NotesStates';
import About from './components/About';
import Alert from './components/Alert';
import Home from './components/Home';
import Login from './components/Login';
import Navbar from './components/Navbar';
import { BrowserRouter as Router,Routes, Route} from "react-router-dom";
import Signup from './components/Signup';
import { useState } from 'react';
import { Toaster } from 'react-hot-toast';
import Welcome from './components/Welcome';
import AddNote from './components/AddNote';

function App() {
  const [alert, setAlert] = useState(null);

  const showAlert = (message, type) => {
    setAlert({
      message: message,
      type: type
    })

    setTimeout(() => {
      setAlert(null);
    }, 1500);
  }

  return (
    <>
      <NoteStates>
        <Router>
          <Alert alert={alert} />
            <Routes>
            <Route exact path="/" element={<Welcome />}></Route>
              <Route exact path="/home" element={<Home showAlert={showAlert} />}></Route>
            <Route exact path="/addnote" element={<AddNote showAlert={showAlert} />}></Route>
              <Route exact path="/about" element={<About />}></Route>
              <Route exact path="/login" element={<Login showAlert={showAlert} />}></Route>
              <Route exact path="/signup" element={<Signup showAlert={showAlert} />}></Route>
            </Routes>
        </Router>
        <Toaster/>
      </NoteStates>
    </>
  );
}

export default App;
