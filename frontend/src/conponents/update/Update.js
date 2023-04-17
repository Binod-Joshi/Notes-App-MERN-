import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const Update = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const navigate = useNavigate();
  const params = useParams();

  useEffect(() => {
    getNoteDetails();
  }, []);

  const getNoteDetails = async () => {
    let result = await fetch(`http://127.0.0.1:5000/note/${params.id}`, {
      method: "get",
    });
    result = await result.json();
    console.log(params.id)
    console.log(result);
    if (result.title && result.description) {
      setTitle(result.title);
      setDescription(result.description);
    }
  };

  const UpdateHandler = async (e) => {
    e.preventDefault();
      console.log("dsjfh")
    let result = await fetch(`http://127.0.0.1:5000/updates/${params.id}`, {
      method: "put",
      body: JSON.stringify({ title, description }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    result = await result.json();
    console.log(result);
    navigate("/notes");
  };
  return (
    <div>
      <div>
        <div className="formContainer">
          <div className="formWrapper">
            <span className="title">Add Note</span>

            <form onSubmit={UpdateHandler}>
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
              <button type="submit"> Add Note </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Update;
