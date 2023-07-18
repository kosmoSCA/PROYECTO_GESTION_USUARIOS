const sql = require('mssql');

const database = require('../database');
import { Image } from "../models/image.model";

exports.getImageList = async () => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`select * from IMAGES`);
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

exports.getImage = async (ID_IMAGEN: string) => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`select * from IMAGES where ID_IMAGEN = '${ID_IMAGEN}'`);
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

exports.newImage = async (image: Image) => {
    try {
        const date: string = image.FECHA.getFullYear() + "-" + (image.FECHA.getMonth() + 1) + "-" + image.FECHA.getDate();
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`insert into IMAGES (ID_IMAGEN, ENLACE, FECHA) 
        values ('${image.ID_IMAGEN}', '${image.ENLACE}', '${date}')`)
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

exports.deleteImage = async (ID_IMAGEN: string) => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`delete from IMAGES where ID_IMAGEN = '${ID_IMAGEN}'`)
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