const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const app = express();
const port = process.env.PORT || 5000;
const mongoose = require('mongoose');

dotenv.config();

app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cors());

app.use('/api/questions',require('./routes/QuestionRoute'));
app.use('/api/answers',require('./routes/AnswerRoute'));

mongoose.connect(process.env.MONGODB_URL,{
    useNewUrlParser:true,
    useUnifiedTopology:true
}).then(()=>{
    console.log('Connected to MongoDB');
}).catch((err)=>{
    console.log(err);
})

app.listen(port,()=>{
    console.log(`Server is running on port ${port}`);
})