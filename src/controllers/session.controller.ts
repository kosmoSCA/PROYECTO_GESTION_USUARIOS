import { Request, Response } from 'express';
const bcrypt = require('bcrypt');

const jwtUtil = require('../utils/jwt')
const userService = require('../services/user.service');

exports.login = async (req: Request, res: Response) => {
    const {EMAIL, PASSWORD} = req.body;
    if(!EMAIL || !PASSWORD) {
        return res.status(400).send({ message: 'EMAIL and PASSWORD needed to login'});
    }
    const user = await userService.getUser(EMAIL);
    if(user.isError){
        return res.status(500).send({message: 'Could not log user in'});
    }
    if(!user.data[0]){
        return res.status(400).send({message: 'EMAIL or PASSWORD are not correct'});
    }
    const isPassword = await bcrypt.compare(PASSWORD, user.data[0].PASSWORD)
    if(!isPassword){
        return res.status(400).send({message: 'EMAIL or PASSWORD are not correct'});
    }
    const token = jwtUtil.generateJwt(EMAIL);
    return res.cookie("access_token", token, {
        httpOnly: true,
        //secure: process.env.NODE_ENV === "production",
    }).status(201).send({message: `Logged in user with email: ${EMAIL} succesfully`});
}

exports.logout = async (req: Request, res: Response) => {

    res.clearCookie("access_token").status(201).send({message: `Logged user out succesfully`});

}