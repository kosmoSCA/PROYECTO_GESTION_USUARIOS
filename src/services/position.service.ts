const sql = require('mssql');

const database = require('../database');

exports.getPositionList = async () => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`select * from POSITIONS`);
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

exports.getPosition = async (ID_CARGO: number) => {
    try {
        await sql.connect(database.sqlConfig);
        const result = await sql.query(`select * from POSITIONS where ID_CARGO = '${ID_CARGO}'`);
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