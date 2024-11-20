import multer from 'multer';

const storage= multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,'./uploads')
    },
    filename:function(req,file,cb){
        const uniqueSuffix = Date.now()+Math.round(Math.random()*1E6)
        cb(null,file.originalname +'-'+ uniqueSuffix )
    
    }
    }
)

const upload = multer({
    storage:storage,
    limits:{
        fileSize:1024*1024*10
    }
})

export default upload;