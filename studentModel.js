
const mongoose = require("mongoose")

const studentSchema = new mongoose.Schema({
    Name: {type: String,},
    age: {type: Number,},
    email: {type: String, require: true},
})

const Students = new mongoose.model("Student", studentSchema)

module.exports = Students
