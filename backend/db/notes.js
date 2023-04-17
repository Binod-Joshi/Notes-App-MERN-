const mongoose = require('mongoose');

const noteSchema = mongoose.Schema({
    title:String,
    description:String,
    id:String,
})

module.exports = mongoose.model("note",noteSchema);