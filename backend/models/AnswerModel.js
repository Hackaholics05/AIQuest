const mongoose = require('mongoose');

const answerSchema = new mongoose.Schema({
    content:{
        type:String,
    },
    createdat:{
        type:Date,  
        default:Date.now()
    },
    updatedat:{
        type:Date,  
        default:Date.now()
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    
   
})

const AnswerModel = mongoose.model('Answer',answerSchema);

module.exports = AnswerModel;