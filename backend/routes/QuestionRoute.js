const express = require('express');
const router = express.Router();

const QuestionModel = require('../models/index');
const { getallquestions, postquestion, getquestionbyid, modifyquestion, deletequestion } = require('../controllers/Question');

router.get('/',getallquestions);     //get all questions route
router.post('/',postquestion);     //post new question route
router.get('/:id',getquestionbyid);    //get question by id
router.put('/:id',modifyquestion);    //update question by id
router.delete('/:id',deletequestion);  //delete question by id

module.exports = router;