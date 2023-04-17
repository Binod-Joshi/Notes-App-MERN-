import React from 'react'
import './LogOut.css'
import {  useNavigate } from 'react-router-dom';

const LogOut = () => {
    const navigate = useNavigate()
    const logout = () => {
        localStorage.clear();
        navigate('/login');
    }
    const cancel = () => {
        navigate("/notes");
    }

  return (
    <div className="logouts">
    <div className='logout'>
        <h1>Conform the logout.</h1>
      <div className="buttons">
        <button onClick={logout} className='ok' >Ok</button>
        <button onClick={cancel} className='cancel'>Cancel</button>
      </div>
    </div>
    </div>
  )
}

export default LogOut
