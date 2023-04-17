import './App.css';
import { Navigate, Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import Login from './conponents/form/Login';
import Nav from './conponents/nav/Nav';
import SignUp from './conponents/form/SignUp';
import Note from './conponents/notes/Note';
import PrivateComponent from './conponents/privatecomponent/PrivateComponent';
import AddNote from './conponents/notes/AddNote';
import Update from './conponents/update/Update';
import LogOut from './conponents/form/LogOut';

function App() {
  return (
    <div className="App"> 
      <Router>
      <Nav/>  
        <Routes>
          <Route element={<PrivateComponent/>}>
          <Route path='/notes'element={<Note/>} />
          <Route path='/addnotes' element={<AddNote/>}/>
          <Route path='/update/:id' element={<Update/>}/>
          <Route path='/profile' element={<h1>profile</h1>}/>
          <Route path='/logout' element={<LogOut/>}/>
          </Route>
          <Route path='/login' element={<Login/>} />
          <Route path='/signup' element={<SignUp/>}/>
          <Route path="*" element={<Navigate to="/login" />} /> 
          
        </Routes>

      </Router>
    </div>
  );
}

export default App;
