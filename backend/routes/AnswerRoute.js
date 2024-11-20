const express = require('express');
const { answerpost, answerget, answerdelete, answerupdate } = require('../controllers/Answer');
const router= express.Router();


//REST operations for this router
router.get('/:questionid/:answerid',answerget);
router.post('/:questionid/',answerpost);
router.delete('/:questionid/:answerid',answerdelete);
router.put('/:questionid/:answerid',answerupdate);

module.exports = router;
