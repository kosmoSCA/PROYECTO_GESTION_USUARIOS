import { Router } from 'express';

const userController = require('../controllers/user.controller');

export const userRoutes = Router();

/**
 * @swagger
 * /getUserList:
 *   get:
 *     tags:
 *       - Users
 *     description:  GET Endpoint for users.
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
 *     description:  POST Endpoint for one user.
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
 *              - ID_CARGO
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
 *              ID_CARGO:
 *                  type: integer
 *                  example: 2
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

/**
 * @swagger
 * /updateUser:
 *   patch:
 *     tags:
 *       - Users
 *     description:  PATCH Endpoint for one user.
 *     produces:
 *       - application/json
 *     parameters:
 *       - in: body
 *         name: user
 *         description: The user to be patched.
 *         schema:
 *          type: object
 *          required:
 *              - EMAIL
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
 *              ID_CARGO:
 *                  type: integer
 *                  example: 2
 *              PASSWORD:
 *                  type: string
 *                  example: password1234
 *     responses:
 *       '201':
 *        description: Updated user with email succesfully
 *       '400':
 *        description: Cannot update without a valid email
 *       '404':
 *        description: User with email does not exist
 *       '500':
 *        description: Could not update user with email
 */
userRoutes.patch('/updateUser', userController.updateUser);

/**
 * @swagger
 * /deleteUser:
 *   delete:
 *     tags:
 *       - Users
 *     description:  DELETE Endpoint for one user.
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
 *          properties:
 *              EMAIL:
 *                  type: email
 *                  example: kosmo@gmail.com
 *     responses:
 *       '201':
 *        description: Deleted user with email succesfully
 *       '400':
 *        description: Email needed to delete user
 *       '404':
 *        description: User with email does not exist
 *       '500':
 *        description: Could not delete user with email
 */
userRoutes.delete('/deleteUser', userController.deleteUser);