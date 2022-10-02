const routes = require('../api');
const { swaggerUi, specs } = require('../api/swagger');

module.exports = ({ app }) => {
    console.log('expressLoader');

    app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(specs));

    app.get('/status', (req, res) => {
        res.status(200).end();
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
                .send({ message: err.message })
                .end();
        }
        return next(err);
    });

    app.use((err, req, res, next) => {
        res.status(err.status || 500);
        res.json({
            errors: {
                message: err.message,
            }
        });
    });
};
