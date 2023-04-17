import React from 'react'
import './Nav.css'
import { Link,useNavigate } from 'react-router-dom'

const Nav = () => {
  const navigate = useNavigate();
  const auth = localStorage.getItem('user');

  return (
    <div>
      {auth? <ul className="nav-ul">
      <li> <Link to='/notes' className='li'>Notes</Link></li>
      <li> <Link to ='/addnotes' className='li' >Add note</Link></li>
      {/* <li> <Link to ='/update' className='li' >Update</Link></li> */}
      <li> <Link to ='/profile' className='li' >Profile({JSON.parse(auth).name}) </Link></li>
      <li> <Link to='/logout' className='li'>Logout</Link></li>
      </ul>: <ul  className="nav-ul">
      <li> <Link to= '/signup' className='li'> SignUp</Link></li></ul>
     }
    </div>
  )
}

export default Nav
