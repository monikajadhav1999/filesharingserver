import File from '../models/file.js';
import bcrypt from 'bcrypt';
import dotenv from 'dotenv';

dotenv.config();

export const uploadImage = async (request, response) => {
    const fileObj = {
        path: request.file.path,
        name: request.file.originalname,
    }
    
    try {
        const file = await File.create(fileObj);
        response.status(200).json({ path: `https://filesharing-api.onrender.com/file/${file._id}`});   ///path find path send
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ error: error.message });
    }
}

export const getImage = async (request, response) => {    //image dowload
    try {   
        const file = await File.findById(request.params.fileId);  ///fileId is name of params
        
        file.downloadCount++;

        await file.save();

        response.download(file.path, file.name);  //path dowload
    } catch (error) {
        console.error(error.message);
        response.status(500).json({ msg: error.message });
    }
}