// SEVER 
const express = require("express")

// PROCESS ENVIRONMENT
const dotenv = require("dotenv").config()

const mongoose = require("mongoose")
const Students = require("./studentModel")

const app = express()

// MIDDLEWARE
app.use(express.json())

const PORT = process.env.PORT || 8000

// CONNECT MONGODB 
mongoose.connect(`${process.env.MONGODB_URL}`)

.then(()=> console.log("MongoDB Connected sucessfully"))


app.listen(PORT, ()=>{
  console.log(`server active on PORT ${PORT}`)
})

// POST REQUEST 1
app.post("/add-user", async(request, response)=>{
  const { name } = request.body

  if(!name){
    return response.status(400).json({messge: "Please add our name"})
  }

  const newUser = new Students({name}) 
  
  await newUser.save()

  return response.status(200).json({message: "Successful", user: newUser})
})

// POST REQUEST 2
app.post("/update-email", async(request, response)=>{
  const { name, email } = request.body

  if(!name){
    return response.status(400).json({messge: "Please add our name"})
  }

  if(!email){
    return response.status(400).json({message: "Please add your email"})
  }

  const alreadyExisting = await Students.findOne({email})
  
  if(alreadyExisting){
    return response.status(400).json({message: "This user already exist!"})
  }

  const newUser = new Students({name, email}) 
  
  await newUser.save()

  return response.status(200).json({messge: "Successful", user: newUser})
})


// POST REQUEST 3
app.post("/add-users", async(request, response)=>{
  const {name, email, age, } = request.body

  if(age < 18){
    return response.status(400).json({message: "you are under_age"})
  }
  if(age > 99){
    return response.status(400).json({message: "you are over_age"})
  }
  if(!email){
    return response.status(400).json({message: "Your email is required"})
  }
  if(!name){
    return response.status(400).json({message: "add your name"})
  }

  const alreadyRegistered = await Students.findOne({email})
  
  if(alreadyRegistered){
    return response.status(400).json({message: "This user already exist!"})
  }

  const newUser = new Students ({ name, email, age })

  await newUser.save()

  return response.status(200).json({message: "Successful", user: newUser})

})

app.use((request, response)=>{
  return response.status(404).json({message: "This page does not exist!"})
})