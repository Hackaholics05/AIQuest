const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    content:{
        type:String,
        required:true
    },
    tags:[{
        type:String,
        default:[]
    }],
    createdat:{
        type:Date,  
        default:Date.now
    },
    updatedat:{
        type:Date,  
        default:Date.now
    },
    author:{
        type:mongoose.Schema.Types.ObjectId,
        ref:'User',
        required:true
    },
    upvotes:{
        type:Number,
        default:0
    },
    downvotes:{
        type:Number,
        default:0
    },
    answers:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Answer',
        default:[]
    }]
    
})

const QuestionModel = mongoose.model("Question",questionSchema);

module.export = QuestionModel;