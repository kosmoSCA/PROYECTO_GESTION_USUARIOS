import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

import { User } from '../models/user.model';
const userService = require('../services/user.service');

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
    if(!NOMBRE || !APELLIDO || !FECHA_NACIMIENTO || !EMAIL || !CARGO || !PASSWORD) {
        return res.status(400).send({ message: 'User properties or types do not match the model'});
    }
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
    let existingUser = await userService.getUser(EMAIL)
    if(existingUser.data[0]){
        return res.status(400).send(`User with email: ${EMAIL} already exists`)
    }

    const postedUser = await userService.newUser(user)
    if(postedUser.isError){
        return res.status(500).send({ message: `Could not post user named: ${user.NOMBRE} ${user.APELLIDO}`});
    }
    return res.status(201).send({ message: `Posted user named: ${user.NOMBRE} ${user.APELLIDO} succesfully`});
}

exports.updateUser = async (req: Request, res: Response) => {
    let {EMAIL, PASSWORD} = req.body;
    if(!EMAIL){
        return res.status(400).send(`Cannot update without a valid email`)
    }
    let user = await userService.getUser(EMAIL)
    if(!user.data[0]){
        return res.status(404).send(`User with email: ${EMAIL} does not exist`)
    }
    user = Object.assign(user.data[0], req.body);
    if(PASSWORD){
        let isPassword = await bcrypt.compare(PASSWORD, user.PASSWORD)
        if(!isPassword){
            const saltRounds = 10;
            user.PASSWORD = await bcrypt.hash(PASSWORD, saltRounds)
        }
    }
    const updatedUser = await userService.updateUser(user);
    if(updatedUser.isError){
        return res.status(500).send({ message: `Could not update user with email: ${EMAIL}`});
    }
    return res.status(201).send({ message: `Updated user with email: ${EMAIL} succesfully`});
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