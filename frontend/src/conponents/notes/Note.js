import React, { useEffect, useState } from 'react'
import {Link} from "react-router-dom"
import './Note.css'

const Note = () => {

  const [notes,setNotes] = useState([]);

  useEffect(()=> {
    getNotes();
  },[])
  
  const getNotes = async() => {
     const id = JSON.parse(localStorage.getItem('user'))._id;
      let result = await fetch(`http://127.0.0.1:5000/notes/${id}`,{
        method:"get"
      });
      result = await result.json();
      console.log(result)
      if(result){
      setNotes(result);
      }
  }
  const operationDelete =async(id) =>{
    let result = await fetch(`http://127.0.0.1:5000/notes/${id}`, {
      method: "delete",
    });
    result = await result.json();
    console.log(result);
    if (result) {
      getNotes();
    }
  }
  return (
    <div className="cards">
    {notes.length > 0 ? (
      notes.map((note, index) => {
        const { title, description, _id } = note;
        return (
          <div className="card" key={index}>
            <div className="notes">
              <h2>{title}</h2>
            </div>
            <div className="additonalFunctionality">
              <p>{description}</p>
              <div className="sp">
                <button
                  style={{
                    backgroundColor: 'red',
                    padding: '0 3px',
                    marginRight: '4px',
                    marginBottom: '5px',
                    height: '30px',
                    width: '80px',
                    cursor: 'pointer',
                  }}
                  onClick={() => operationDelete(_id)}
                >
                  delete
                </button>
                <button
                  style={{
                    backgroundColor: 'aquamarine',
                    padding: '0 3px',
                    marginRight: '4px',
                    height: '30px',
                    width: '80px',
                  }}
                >
                  <Link className="li1" to={`/update/${_id}`}>
                    update
                  </Link>
                </button>
              </div>
            </div>
          </div>
        );
      })
    ) : (
      <h1 className='nolist'>No notes available.</h1>
    )}
  </div>
);
};

export default Note
