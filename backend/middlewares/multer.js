const multer = require('multer');
const cloudinary = require('./cloudinarySetup'); 
const QuestionModel = require("../models/index") 


const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

const fileUploadMiddleware = upload.single('file');  
const uploadFileAndSaveUrl = async (req, res, next) => {

  fileUploadMiddleware(req, res, async (err) => {
    const questionid = req.params.id;

    const question = await QuestionModel.findById(questionid);

    if (!question) {
      return res.status(404).json({ message: 'Question not found' });
    }

    if (err) {
      return res.status(400).json({ message: 'File upload error', error: err });
    }

    if (!req.file) {
      return res.status(400).json({ message: 'No file provided' });
    }

    try {
      
      const cloudinaryResponse = await cloudinary.uploader.upload_stream(
        { resource_type: 'auto' },  
        async (error, result) => {
          if (error) {
            return res.status(500).json({ message: 'Cloudinary upload failed', error });
          }

          const fileUrl = result.secure_url;  

          question.image = fileUrl;

          await question.save();

          req.fileUrl = fileUrl;

          
          next();
        }
      );
      
      req.pipe(cloudinaryResponse);
    } catch (error) {
      return res.status(500).json({ message: 'Server error', error });
    }
  });
};

module.exports = uploadFileAndSaveUrl;
