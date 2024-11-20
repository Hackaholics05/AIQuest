const AnswerModel = require('../models/AnswerModel');
const UserModel = require('../models/user');
const QuestionModel = require('../models/QuestionModel');

export const answerpost= async(req,res)=>{
    const questionid = req.params.questionid;
    const answercontent = req.body.answercontent;
    const author = req.body.userid;

    try{
        const answer = await AnswerModel.create({
            content:answercontent,
            author:author
        })
        const question = await QuestionModel.findById(questionid);
        question.answers.push(answer._id);
        await question.save();
        res.status(200).json({
            message:'answer added successfully',
            data:answer
        })
    }catch(err){
        res.status(500).json({
            message:'something went wrong',
            data:err
        })
    }
}

export const answerget= async(req,res)=>{
    const questionid = req.params.questionid;
    const answerid = req.params.answerid;
    try{
        const answer = await AnswerModel.findById(answerid);
        const question = await QuestionModel.findById(questionid);
        res.status(200).json({
            message:'answer fetched successfully',
            answer:answer,
            question:question
        })
    }catch(err){
        res.status(500).json({
            message:'something went wrong',
            data:err
        }).end();
    }
}

export const answerdelete= async(req,res)=>{
    const questionid = req.params.questionid;
    const answerid = req.params.answerid;
    try{
        const answer = await AnswerModel.findByIdAndDelete(answerid);
        const question = await QuestionModel.findById(questionid);
        question.answers.pull(answer._id);
        await question.save();
        res.status(200).json({
            message:'answer deleted successfully',
        })
       
    }catch(err){
        res.status(500).json({
            message:'something went wrong',
            data:err
        })
    }
}

export const answerupdate = async(req,res)=>{

const answerid = req.params.answerid;
const answercontent = req.body.answercontent;
try{
    const answer = await AnswerModel.findByIdAndUpdate(answerid,{
        content:answercontent,
        updatedat:Date.now()
    })
    res.status(200).json({
        message:'answer updated successfully',
        data:answer
    })
}catch(err){
    res.status(500).json({
        message:'something went wrong',
        data:err
    })
}
}
