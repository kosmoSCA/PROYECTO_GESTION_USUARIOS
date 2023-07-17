const sql = require('mssql');

const database = require('../database');
import { User } from "../models/user.model";

exports.getUserList = async () => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`select * from USERS`);
        return {
            isError: false,
            data: result.recordset,
        }
    } catch (error: any) {
        return {
            isError: true,
            error: error.message,
        }
    }
};

exports.getUser = async (EMAIL: string) => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`select * from USERS where EMAIL = '${EMAIL}'`);
        return {
            isError: false,
            data: result.recordset,
        }
    } catch (error: any) {
        return {
            isError: true,
            error: error.message,
        }
    }
};

exports.newUser = async (user: User) => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`insert into USERS (NOMBRE, APELLIDO, FECHA_NACIMIENTO, EMAIL, ID_CARGO, PASSWORD) 
        values ('${user.NOMBRE}','${user.APELLIDO}','${user.FECHA_NACIMIENTO}','${user.EMAIL}','${user.ID_CARGO}','${user.PASSWORD}')`)
        return {
            isError: false,
            data: result.rowsAffected,
        }
    } catch (error: any) {
        return {
            isError: true,
            error: error.message,
        }
    }
};

exports.updateUser = async (user: User) => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`UPDATE USERS 
        set NOMBRE = '${user.NOMBRE}', APELLIDO = '${user.APELLIDO}', FECHA_NACIMIENTO = '${user.FECHA_NACIMIENTO}', 
        ID_CARGO = '${user.ID_CARGO}', PASSWORD = '${user.PASSWORD}' where EMAIL = '${user.EMAIL}'`)
        return {
            isError: false,
            data: result.rowsAffected,
        }
    } catch (error: any) {
        console.log(error)
        return {
            isError: true,
            error: error.message,
        }
    }
}

exports.deleteUser = async (EMAIL: string) => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`delete from USERS where EMAIL = '${EMAIL}'`)
        return {
            isError: false,
            data: result.rowsAffected,
        }
    } catch (error: any) {
        return {
            isError: true,
            error: error.message,
        }
    }
}