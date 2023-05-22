
import './App.css';
import Home from './Component/Home';
import Navbar from './Component/Navbar';
import {
  HashRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import About from './Component/About';
import NoteState from './context/note/NoteState';
import Alert from './Component/Alert';
import Login from './Component/Login';
import Signup from './Component/Signup';
import AlertState from './context/alert/AlertState';

function App() {
  return (
    <>
      <AlertState>
        <NoteState>
          <Router>
            <Navbar />
            <Alert />
            <nav className="container">
              <Routes>
                <Route exact path="/" element={<Home />} />
              </Routes>
              <Routes>
                <Route exact path="/about" element={<About />} />
              </Routes>
              <Routes>
                <Route exact path="/login" element={<Login />} />
              </Routes>
              <Routes>
                <Route exact path="/signup" element={<Signup />} />
              </Routes>
            </nav>
          </Router>
        </NoteState>
      </AlertState>
    </>
  );
}

export default App;
