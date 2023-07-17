import { Request, Response } from 'express';

const positionService = require('../services/position.service');

exports.getPositionList = async (req: Request, res: Response) => {
    const positions = await positionService.getPositionList();
    if(positions.isError){
        return res.status(500).send({message: 'Could not retrieve positions'});
    }
    const result: object = {
        data: positions.data,
        message: 'Retrieved positions successfully'
    }
    return res.status(200).send(result);
}