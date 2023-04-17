import React, { useEffect, useState } from "react";
// import "./SignUp.css";
import { Link,useNavigate } from "react-router-dom";

const SignUp = () => {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [err, setErr] = useState(false);
  
  useEffect(()=>{
    const auth = localStorage.getItem('token');
    if(auth){
      navigate('/notes');
    }
  },[navigate])

  const submitHandlerr = async (e) => {
    e.preventDefault();
    console.log(name, email, password);
    let result = await fetch("http://127.0.0.1:5000/register",{
      method:"post",
      body:JSON.stringify({name,email,password}),
      headers:{
        "Content-Type":"application/json"
      },
    });
    result = await result.json();
    console.log(result)
    if(result.auth){
      localStorage.setItem('user',JSON.stringify(result.result));
      localStorage.setItem('token',result.auth);
      navigate('/notes')
    }else{
      setErr(true)
    }

  };

  return (
    <div className="formContainer">
      <div className="formWrapper">
        <span className="logo">E-Dashboard</span>
        <span className="title">Register</span>
        <form onSubmit={submitHandlerr}>
          <input
            type="text"
            placeholder="name"
            value={name}
            onChange={(e) => setName(e.target.value)} required
          />
          <input
            type="email"
            placeholder="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)} required
          />
          <input
            type="password"
            placeholder="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)} required
          />
          <button> Sign Up</button>
          {err && <span style={{ color: "red" }}>Somethings went wrong!</span>}
        </form>
        <p>
          You do have an account ? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
