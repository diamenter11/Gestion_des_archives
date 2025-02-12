const express = require('express')
const router = express.Router();
const app=express()
const path = require('path'); // Import the path module
const cors = require('cors')
const multer = require('multer')
const mongoose = require('mongoose');
const fs = require ('fs')
const session = require('express-session');

const userRoutes = require('./routes/user');
const documentRoutes = require('./routes/document');
// const userRoutes = require('./routes/User');




const uri = "mongodb://127.0.0.1:27017/gestion_archives"

//connection to db
const connectDB =async()=>{
try{
await mongoose.connect(uri)
console.log("connected to db")
}
catch(err){
console.log(err)
}
}

//middle wares
app.use(express.json())
// Serve static files from the "uploads" directory
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));
// app.use('/videos', express.static('videos'));

app.use(cors());

// Routes
app.use(session({
    secret: '2001', // Change this to a secret key
    resave: false,
    saveUninitialized: false,
  }));
app.use('/api/users', userRoutes);
app.use('/api/documents', documentRoutes);


const port = 5000;
app.listen(port,()=>{
    connectDB()

console.log("app runing on port:"+port)
})
