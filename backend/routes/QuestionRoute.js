const express = require('express');
const router = express.Router();
const { getallquestions, postquestion, getquestionbyid, modifyquestion, deletequestion } = require('../controllers/Question');
const { default: upload } = require('../middlewares/multer');

router.get('/',getallquestions);     //get all questions route
router.post('/',upload,postquestion);     //post new question route
router.get('/:id',getquestionbyid);    //get question by id
router.put('/:id',upload,modifyquestion);    //update question by id
router.delete('/:id',deletequestion);  //delete question by id

module.exports = router;