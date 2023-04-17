import React, { useState } from "react";

const AddNote = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [indicate,setIndicate] = useState("");
  const [err, setErr] = useState('');

  const user = JSON.parse(localStorage.getItem('user'));
  const id = user._id;

  const addHandler = async(e) => {
    e.preventDefault();
    console.log(title,description);
    let result = await fetch("http://127.0.0.1:5000/addnote",{
        method:"post",
        body:JSON.stringify({title,description,id}),
        headers:{
            "Content-Type":"application/json"
        },
    });
    result = await result.json();
    console.log(result);
    if(result.title){
    console.log("added sucessfully")
    setIndicate("add sucessfully")
    }else{
        setErr(result.result)
    }
  };

  return (
    <div>
      <div className="formContainer">
        <div className="formWrapper">
          <span className="title">Add Note</span>
          <form onSubmit={addHandler}>
            <input
              type="text"
              placeholder="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
            <textarea
              className="textarea"
              name="text"
              id="text"
              placeholder="description"
              cols="30"
              rows="10"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            ></textarea>
            <button> Add Note </button>
            {err && (
              <span style={{ color: "red" }}>{err}</span>
            )}
            {!err && (
              <span style={{ color: "green" }}>{indicate}</span>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNote;
