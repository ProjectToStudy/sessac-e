const routes = require('../api');
const { swaggerUi, specs } = require('../api/swagger');
const { errorHandler } = require('../middleware/errorHandler');

module.exports = ({ app }) => {
    console.log('expressLoader');

    app.use('/api/docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.get('/status', (req, res) => {
        return res.status(200).end();
    });

    app.use(routes.router());

    // catch 404
    app.use((req, res, next) => {
        const err = new Error('Not Found');

        err['status'] = 404;
        next(err);
    });

    // error handlers
    app.use((err, req, res, next) => {
        if (err.name === 'UnauthorizedError') {
            return res
                .status(err.status)
                .json({
                    code: 401000,
                    message: err.message
                });
        }
        return next(err);
    });

    app.use((err, req, res, next) => {
        if (err.status === 500) {
            return res
                .status(err.status)
                .json({
                    code: 500000,
                    message: err.message
                });
        }
        return errorHandler(err, req, res);
    });
};
