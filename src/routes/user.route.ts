import { Router } from 'express';

const userController = require('../controllers/user.controller');

export const userRoutes = Router();

/**
 * @swagger
 * /getUserList:
 *   get:
 *     tags:
 *       - Users
 *     description:  GET Endpoint for users
 *     responses:
 *       '200':
 *        description: Retrieved users successfully
 *       '500':
 *        description: Could not retrieve users
 */
userRoutes.get('/getUserList', userController.getUserList);

/**
 * @swagger
 * /newUser:
 *   post:
 *     tags:
 *       - Users
 *     description:  POST Endpoint for one user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to be posted.
 *         schema:
 *          type: object
 *          required:
 *              - NOMBRE
 *              - APELLIDO
 *              - FECHA_NACIMIENTO
 *              - EMAIL
 *              - CARGO
 *              - PASSWORD
 *          properties:
 *              NOMBRE:
 *                  type: string
 *                  example: Santiago
 *              APELLIDO:
 *                  type: string
 *                  example: Castro
 *              FECHA_NACIMIENTO:
 *                  type: date
 *                  example: 2000-01-01
 *              EMAIL:
 *                  type: email
 *                  example: kosmo@gmail.com
 *              CARGO:
 *                  type: string
 *                  example: Employee
 *              PASSWORD:
 *                  type: string
 *                  example: password1234
 *     responses:
 *       '201':
 *        description: Posted user with name succesfully
 *       '400':
 *        description: User properties or types do not match the model
 *       '500':
 *        description: Could not post user with name
 */
userRoutes.post('/newUser', userController.newUser);

userRoutes.patch('/updateUser', userController.updateUser);

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     tags:
 *       - Users
 *     description:  DELETE Endpoint for one user
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to be deleted.
 *         schema:
 *          type: object
 *          required:
 *              - EMAIL
 *              - PASSWORD
 *          properties:
 *              EMAIL:
 *                  type: email
 *                  example: kosmo@gmail.com
 *              PASSWORD:
 *                  type: string
 *                  example: password1234
 *     responses:
 *       '201':
 *        description: Deleted user with email succesfully
 *       '400':
 *        description: Wrong parameters for user with email
 *       '404':
 *        description: User with email does not exist
 *       '500':
 *        description: Could not delete user with email
 */
userRoutes.delete('/deleteUser', userController.deleteUser);