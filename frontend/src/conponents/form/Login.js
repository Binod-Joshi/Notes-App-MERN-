import React, {  useEffect, useState } from 'react'
import './Login.css'
import { Link,useNavigate } from 'react-router-dom';

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [err, setErr] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
      const auth = localStorage.getItem('user');
      if(auth){
          navigate('/notes')
      }
  },[navigate])

    const loginHandler = async(e) => {
       e.preventDefault();
       console.log(email,password);

       let result = await fetch("http://127.0.0.1:5000/login",{
        method:"post",
        body:JSON.stringify({email,password}),
        headers:{
          "Content-Type":"application/json"
        },
       });
      result = await result.json();
      console.log(result);
      console.log("hello")
      if(result.auth){
        localStorage.setItem('user',JSON.stringify(result.user));
        localStorage.setItem('token',result.auth);
        navigate('/notes')
      }else{
        setErr(true)
      }

    }
  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">E-Dashboard</span>
        <span className="title">Login</span>
        <form onSubmit={loginHandler}>
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button> Login </button>
          {err && <span style={{ color: "red" }}>email or password wrong!</span>}
        </form>
        <p>
          You don't have an account ? <Link to="/signup">Sign Up</Link>
        </p>
      </div>
    </div>
  )
}

export default Login
