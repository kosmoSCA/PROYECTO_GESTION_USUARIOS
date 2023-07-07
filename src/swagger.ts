const swaggerJSDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

const options = {
    definition: {
        info: {
            title: 'PROYECTO GESTION USUARIOS',
            description: "Nodejs project with typescript to work as an API to CRUD USUARIOS",
            version: '1.0.0',
        }
    },
    apis: [
        `${__dirname}/routes/user.route.ts`,
        `${__dirname}/routes/session.route.ts`,
    ]
};

const swaggerSpec = swaggerJSDoc(options);

export const swaggerDocs = (app: any, port: any) => {
    app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));
    console.log(`API documentation available at http://localhost:${port}/docs`)
};