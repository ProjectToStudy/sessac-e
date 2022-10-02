const path = require('path');
const swaggerUi = require('swagger-ui-express');
const swaggerJsdoc = require('swagger-jsdoc');

const options = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            title: 'Test API',
            version: '1.0.0',
            description: 'Test API with express',
        },
        host: 'localhost:8000',
        basePath: '/',
        servers: [
            {
                url: 'dev.sessac-e.site',
                description: '새싹이 개발중 api',
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
