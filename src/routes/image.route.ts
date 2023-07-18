import { Router } from 'express';

const imageController = require('../controllers/image.controller');

export const imageRoutes = Router();

/**
 * @swagger
 * /getImageList:
 *   get:
 *     tags:
 *       - Images
 *     description:  GET Endpoint for images.
 *     responses:
 *       '200':
 *        description: Retrieved images successfully
 *       '500':
 *        description: Could not retrieve images
 */
imageRoutes.get('/getImageList', imageController.getImageList);

/**
 * @swagger
 * /newImage:
 *   post:
 *     tags:
 *       - Images
 *     description:  POST Endpoint for images.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: formData
 *         name: ARCHIVO
 *         type: file
 *         description: The image to upload.
 *     responses:
 *       '200':
 *        description: Saved image successfully
 *       '400': 
 *        description: Uploaded image has wrong format, must be jpg, jpeg or png
 *       '500':
 *        description: Could not save image
 */
imageRoutes.post('/newImage', imageController.newImage);

/**
 * @swagger
 * /deleteImage:
 *   delete:
 *     tags:
 *       - Images
 *     description:  DELETE Endpoint for one image.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: image
 *         description: The image to be deleted.
 *         schema:
 *          type: object
 *          required:
 *              - ID_IMAGEN
 *          properties:
 *              ID_IMAGEN:
 *                  type: string
 *                  example: 3e79e5ce-2f92-4477-a2f4-32de4015df92
 *     responses:
 *       '201':
 *        description: Deleted image with id succesfully
 *       '400':
 *        description: Id needed to delete image
 *       '404':
 *        description: Image with id does not exist
 *       '500':
 *        description: Could not delete image with id
 */
imageRoutes.delete('/deleteImage', imageController.deleteImage);