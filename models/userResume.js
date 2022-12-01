const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const resumeModel= new Schema({
    firstname:{
        type: String,
    },
    email:{
        type: String,
        unique: true,
    },
    file:{
        type:String
    }

})
module.exports=mongoose.model('file',resumeModel)