import { Router } from 'express';

const fileController = require('../controllers/file.controller');

export const fileRoutes = Router();

/**
 * @swagger
 * /files/getFileList:
 *   get:
 *     tags:
 *       - Files
 *     description:  GET Endpoint for files.
 *     responses:
 *       '200':
 *        description: Retrieved files successfully
 *       '500':
 *        description: Could not retrieve files
 */
fileRoutes.get('/getFileList', fileController.getFileList);

/**
 * @swagger
 * /files/newFile:
 *   post:
 *     tags:
 *       - Files
 *     description:  POST Endpoint for files.
*     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: file
 *         description: The file to be posted.
 *         schema:
 *          type: object
 *          required:
 *              - ENLACE
 *          properties:
 *              ENLACE:
 *                  type: string
 *                  example: 'image.png'
 *     responses:
 *       '200':
 *        description: Saved file successfully
 *       '400': 
 *        description: No files were uploaded
 *       '500':
 *        description: Could not save file
 */
fileRoutes.post('/newFile', fileController.newFile);