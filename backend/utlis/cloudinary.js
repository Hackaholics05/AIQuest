import {v2 as cloudinary} from 'cloudinary';
import fs from 'fs';

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET
});


export const upLoadImage= async(file)=>{
   try{
    if(!file) return null;
    const image = await cloudinary.uploader.upload(file.path, {
        resource_type: 'image',
   })

   return image;
}catch(err){
   fs.unlinkSync(file.path);
}
}