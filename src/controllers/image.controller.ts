import { Request, Response } from 'express';
import { Image } from '../models/image.model';
import { v4 as uuidv4 } from 'uuid';
import { unlink } from 'node:fs/promises';

const imageService = require('../services/image.service');

exports.getImageList = async (req: any, res: Response) => {
    const files = await imageService.getImageList();
    if(files.isError){
        return res.status(500).send({message: 'Could not retrieve images'});
    }
    const result: object = {
        data: files.data,
        message: 'Retrieved images successfully'
    }
    return res.status(200).send(result);
}

exports.newImage = async (req: any, res: Response) => {
    if (!req.files) {
        return res.status(400).send("No images were uploaded");
    }
    const requestedFile = req.files.ARCHIVO
    const fileName = requestedFile.name
    const validFormat = fileName.endsWith('.jpg') || fileName.endsWith('.jpeg') || fileName.endsWith('.png')
    if(!validFormat){
        return res.status(400).send("Uploaded image has wrong format, must be jpg, jpeg or png");
    }
    requestedFile.mv(__dirname+'/../../files/images/' + fileName)
    const image: Image = {
        ID_IMAGEN: uuidv4(),
        ENLACE: fileName,
        FECHA: new Date()
    }
    const fileResult = await imageService.newImage(image);
    if(fileResult.isError){
        return res.status(500).send({message: `Could not save image: ${fileName}`});
    }
    return res.status(200).send(`Saved image: ${fileName} successfully`);
}

exports.deleteImage = async (req: Request, res: Response) => {
    try {
        const {ID_IMAGEN} = req.body;
        if(!ID_IMAGEN) {
            throw new Error(`Id needed to delete image`);
        }
        const image = await imageService.getImage(ID_IMAGEN)
        if(!image.data[0]){
            return res.status(404).send(`Image with id: ${ID_IMAGEN} does not exist`)
        }
        const deletedImage = await imageService.deleteImage(ID_IMAGEN)
        if(deletedImage.isError){
            return res.status(500).send({ message: `Could not delete image with id: ${ID_IMAGEN}`});
        }
        await unlink(__dirname + '../../../files/images/' + image.data[0].ENLACE);
        return res.status(201).send({ message: `Deleted image with id: ${ID_IMAGEN} succesfully`});
    } catch (error: any) {
        return res.status(400).send({ message: `${error.message}`});
    }
}