import { Request, Response } from 'express';

const userService = require('../services/user.service');
import { User } from '../models/user.model';

exports.getUserList = async (req: Request, res: Response) => {
    const users = await userService.getUserList();
    if(users.isError){
        return res.status(500).send({message: 'Could not retrieve users'});
    }
    const result: object = {
        data: users.data,
        message: 'Retrieved users successfully'
    }
    return res.status(200).send(result);
}

exports.newUser = async (req: Request, res: Response) => {
    const user = req.body;
    const isUser = (x: any): x is User => user.includes(x);
    if(!(isUser(user))) {
        return res.status(400).send({ message: 'User properties or types do not match the model'});
    }
    const postedProduct = await userService.postProduct(user)
    if(postedProduct.isError){
        return res.status(500).send({ message: `Could not post post user named: ${user.NOMBRE} ${user.APELLIDO}`});
    }
    return res.status(201).send({ message: `Posted user named: ${user.NOMBRE} ${user.APELLIDO} succesfully`});
}