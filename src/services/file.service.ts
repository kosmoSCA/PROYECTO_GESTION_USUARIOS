const sql = require('mssql');

const database = require('../database');
import { File } from "../models/file.model";

exports.getFileList = async () => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`select * from FILES`);
        return {
            isError: false,
            data: result.recordset,
        }
    } catch (error: any) {
        console.log(error)
        return {
            isError: true,
            error: error.message,
        }
    }
};

exports.newFile = async (file: File) => {
    try {
        const date: string = file.FECHA.getFullYear() + "-" + (file.FECHA.getMonth() + 1) + "-" + file.FECHA.getDate();
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`insert into FILES (ENLACE, FECHA) 
        values ('${file.ENLACE}','${date}')`)
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