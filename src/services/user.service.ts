const sql = require('mssql');

const database = require('../database');

exports.getUserList = async () => {
    try {
        await sql.connect(database.sqlConfig)
        const result = await sql.query(`select * from USERS`);
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