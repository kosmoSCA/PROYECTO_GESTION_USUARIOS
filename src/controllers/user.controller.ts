import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

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
    let {NOMBRE, APELLIDO, FECHA_NACIMIENTO, EMAIL, CARGO, PASSWORD} = req.body;
    const saltRounds = 10;
    const hashPassword = await bcrypt.hash(PASSWORD, saltRounds)
    const user: User = {
        NOMBRE: NOMBRE,
        APELLIDO: APELLIDO,
        FECHA_NACIMIENTO: FECHA_NACIMIENTO,
        EMAIL: EMAIL,
        CARGO: CARGO,
        PASSWORD: hashPassword
    }
    if(!user.NOMBRE || !user.APELLIDO || !user.FECHA_NACIMIENTO || !user.EMAIL || !user.CARGO || !user.PASSWORD) {
        return res.status(400).send({ message: 'User properties or types do not match the model'});
    }
    const postedUser = await userService.newUser(user)
    if(postedUser.isError){
        return res.status(500).send({ message: `Could not post user named: ${user.NOMBRE} ${user.APELLIDO}`});
    }
    return res.status(201).send({ message: `Posted user named: ${user.NOMBRE} ${user.APELLIDO} succesfully`});
}

exports.deleteUser = async (req: Request, res: Response) => {
    try {
        const {EMAIL, PASSWORD} = req.body;
        if(!EMAIL || !PASSWORD) {
            throw new Error(`Missing parameters for user with email: ${EMAIL}`);
        }
        const user = await userService.getUser(EMAIL)
        if(!user.data[0]){
            return res.status(404).send(`User with email: ${EMAIL} does not exist`)
        }
        const isUser = await bcrypt.compare(PASSWORD, user.data[0].PASSWORD)
        if(!isUser) {
            throw new Error(`Wrong parameters for user with email: ${EMAIL}`);
        }
        const deletedUser = await userService.deleteUser(EMAIL)
        if(deletedUser.isError){
            return res.status(500).send({ message: `Could not delete user with email: ${EMAIL}`});
        }
        return res.status(201).send({ message: `Deleted user with email: ${EMAIL} succesfully`});
    } catch (error: any) {
        return res.status(400).send({ message: `${error.message}`});
    }
}