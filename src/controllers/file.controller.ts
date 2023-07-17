import { Request, Response } from 'express';
import { File } from '../models/file.model';

const fileService = require('../services/file.service');

exports.getFileList = async (req: any, res: Response) => {
    const files = await fileService.getFileList();
    if(files.isError){
        return res.status(500).send({message: 'Could not retrieve files'});
    }
    const result: object = {
        data: files.data,
        message: 'Retrieved files successfully'
    }
    return res.status(200).send(result);
}

exports.newFile = async (req: any, res: Response) => {
    const {ENLACE} = req.body
    if (!req.files || !ENLACE) {
        return res.status(400).send("No files were uploaded");
    }    
    const requestedFile = req.files.ARCHIVO
    requestedFile.mv(__dirname+'/../../files/' + ENLACE)
    const file: File = {
        ENLACE: ENLACE,
        FECHA: new Date()
    }
    const fileResult = await fileService.newFile(file);
    if(fileResult.isError){
        return res.status(500).send({message: `Could not save file: ${ENLACE}`});
    }
    return res.status(200).send(`Saved file: ${ENLACE} successfully`);
}