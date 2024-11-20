const QuestionModel = require('../models/index');
const UserModel = require('../models/index');

export const getallquestions= async( req,res)=>{

    try{
        const questions = await QuestionModel.find().populate(UserModel).exec();

        if(!questions){
            return res.status(404).json({
                error:'No questions found'
            }).end();
        }

        res.status(200).json({
            questionlist: questions
        }).end();
    }catch(err){
        res.status(500).json({
            error:err.message
        }).end();
    }
}

export const postquestion = async(req,res)=>{
       const {title, content , tags, imageURL} = req.body;
       const user = req.userId;

    try{

        if(!title || !content){   
            throw new Error('Title and Content are required');
        }

        const question= new QuestionModel({
            title:title,
            content:content,
            tags:tags,
            image:imageURL,
            author:user
        })

        await question.save();
        
        res.status(201).json({
            message:'Question Created Successfully',
            question:question._id
        }).end();

    }catch(err){
        res.staus(500).json({
            error:err.message

        }).end();
    }
}

export const getquestionbyid = async(req,res)=>{
    const id = req.params.id;
    try{
        const question = await QuestionModel.findById(id).populate("User").exec();
        if(!question){
            return res.status(404).json({
                error:'Question not found'
            }).end();
        }

        res.status(200).json({
            question:question
        }).end();

    }catch(err){
         res.staus(500).json({
            error:err.message
         })
    }
}

export const modifyquestion = async(req,res)=>{
    const id = req.params.id;
    const {title, content, tags, imageURL} = req.body;
    const user = req.userId;

    try{
        if(!id){
            return res.status(400).json({
                error:'Question ID is missing'
            })
        }

        const question = await QuestionModel.findById(id).populate("User").exec();
        if(!question){
            res.status(404).json({
                error:'Question Not Found'
            })
        }

        question.title = title;
        question.content = content;
        question.tags = tags;
        question.image = imageURL;
        question.author = user;
        await question.save();

        res.status(200).json({
            message:'Question Modified Successfully'
        }).end();
    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}

export const deletequestion = async(req,res)=>{
    const id= req.params.id;
    try{
        const question = await QuestionModel.findById(id).populate("User").exec();
        if(!question){
            res.status(400).json({
                error:'Question not found'
            });
            return;
        }
        
       
        await question.remove();

        res.status(200).json({
            message:'Question Deleted Successfully'
        }).end();

       
    }catch(err){
        res.status(500).json({
            error:err.message
        })
    }
}