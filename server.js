const express = require('express');
const app = express();
const db=require('./models/userResume')
const path = require('path')
const {GridFsStorage} = require('multer-gridfs-storage');
const bodyParser=require('body-parser');
const multer=require('multer');
const  mongoose = require('mongoose');
const PORT = 3000; 

/* *|MARKER_CURSOR|* */
/* Telling express to use the views folder as the default folder for the views. */
app.set('view engine', 'views')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

let url ="mongodb://localhost:27017/file"
mongoose.connect(url,(err)=>{
    if(err) {
        console.log(`Error in connection ${err.message}`)
        throw err.message
        }else{
            console.log("databse connected!!")
        }
})

const imageStorage = multer.diskStorage({
    // Destination to store image     
    destination: './pdf',
      filename: (req, file, cb) => {
          cb(null, file.fieldname + '_' + Date.now() 
             + path.extname(file.originalname))
            // file.fieldname is name of the field (image)
            // path.extname get the uploaded file extension
    }
});

const imageUpload = multer({
    storage: imageStorage,
    limits: {
      fileSize: 1000000 // 1000000 Bytes = 1 MB
    },
    fileFilter(req, file, cb) {
      if (!file.originalname.match(/\.(pdf|docx)$/)) { 
        console.log("Incorrect file")
         return cb(new Error('Please upload a pdf or doc'))
         }
     cb(undefined, true)
  }
})


app.get('/postResume',(req, res)=>{
    res.render('index.ejs')
})
app.post('/postResume',imageUpload.single('resume'),(req,res)=>{
  console.log(req.file)
  res.json({status:200,message:req.file})
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

/* Listening to the port 3000. */
app.listen(PORT,(err)=>{
      if(err){
        throw err
      }else{
        console.log("Server is Running o http://localhost:3000")
      }
      
})