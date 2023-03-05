const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'sessac-e API',
            version: '1.0.0',
            description: 'sessac-e API with express',
        },
        // host: 'localhost:8000',
        // basePath: '/',
        components: {
            securitySchemes: {
                authorization: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                }
            }
        },
        // security: [{
        //     authorization: []
        // }],
        servers: [
            {
                url: '/',
                description: 'sessac-e development API',
            }
        ]
    },
    apis: [path.join(__dirname, './routes/*.js'), path.join(__dirname, './swagger/*')]
};

const specs = swaggerJsdoc(options);

module.exports = {
    swaggerUi,
    specs
};
