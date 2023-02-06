const express = require('express'); 
const app= express(); 
const dotenv=require("dotenv"); 
const multer = require('multer'); 
const path =require('path'); 

const mongoose =require('mongoose') ; 
const authRoute =require('./routes/auth');
const authUser=require('./routes/user'); 
const authPost = require('./routes/posts'); 
const authCat = require('./routes/categories')

dotenv.config();
app.use(express.json());
app.use("/images",express.static(path.join(__dirname,"/images"))) 

mongoose.set('strictQuery', 
true);
mongoose
  .connect(process.env.CONNECTION_URL)
  .then(() => console.log("Connected to MongoDB..."))
  .catch((err) => console.error("Could not connect to MongoDB...", err));
  const storage = multer.diskStorage({destination:(req,file,callback)=>{
    callb(null,"images")
  },
  filename: (req,res,callb)=>{
    callb(null,"file.png")
  },
})
const upload = multer({storage: storage })

app.post('/upload',upload.single("file"),(req,res)=>{
  res.status(200).json("file has been uploaded ")
})   
app.use('/auth',authRoute)
app.use("/users",authUser)
app.use("/posts",authPost)
app.use("/category",authCat)

app.listen("5000",()=>{
    console.log("Backend running ") ;
})