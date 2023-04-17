const express = require("express");
const cors = require("cors");
require("./db/configs");
const User = require("./db/user");
const Note = require("./db/notes");
const Jwt = require("jsonwebtoken");
const jwtKey = "keepnotes";

const app = express();
app.use(express.json());
app.use(cors());

app.post("/register", async (req, res) => {
  const user = new User(req.body);
  let result = await user.save();
  result = result.toObject();
  delete result.password;
  Jwt.sign({ result }, jwtKey, { expiresIn: "1h" }, (err, token) => {
    if (err) {
      res.send({
        result: "something went wrong.please try after  a sometime.",
      });
    } else {
      res.send({ result, auth: token });
    }
  });
});

app.post("/login", async (req, res) => {
  if (req.body.email && req.body.password) {
    const user = await User.findOne(req.body).select("-password");
    if (user) {
      Jwt.sign({ user }, jwtKey, { expiresIn: "1h" }, (err, token) => {
        if (err) {
          res.send({
            result: "somethig went wrong.please try after a sometime.",
          });
        } else {
          res.send({ user, auth: token });
        }
      });
    } else {
      res.send({ result: "no user found" });
    }
  } else {
    res.send({ result: "no user found" });
  }
});

app.post("/addnote",async(req,res) => {
  if(req.body.title && req.body.id){
    let note = new Note(req.body);
        note = await note.save();
        res.send(note);
  }else{
    res.send({result:"title is mandatory"})
  }
})
app.get("/notes/:id",async(req,res) => {
  const notes = await Note.find({id:req.params.id});
  console.log(notes)
  if(notes){
    res.send(notes)
  }else{
    res.send({notes:"No list are available."})
  }  
})
app.get("/note/:id",async(req,res) => {
  const notes = await Note.findOne({_id:req.params.id});
  console.log(notes)
  if(notes){
    res.send(notes)
  }else{
    res.send({notes:"No list are available."})
  }  
})
app.delete("/notes/:id",async(req,res) => {
  const notes = await Note.deleteOne({_id:req.params.id});
  res.send(notes);
})
app.put("/updates/:id",async(req,res) => {
  console.log(req.params.id)
  let result = await Note.updateOne(
    { _id: req.params.id },
    { $set: req.body }
  );

  // let result= await Note.findByIdAndUpdate(req.params.id,req.body,{new:true})
  res.send(result);
})

app.listen(5000, () => {
  console.log("http://localhost:5000");
});
