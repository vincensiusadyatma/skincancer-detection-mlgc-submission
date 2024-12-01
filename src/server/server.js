const Hapi = require('@hapi/hapi');
const routes = require('./routes');
require('dotenv').config();

const loadModel = require('../services/loadModel');

const init = async function () {
    const server = Hapi.Server({
        port: 3000,
        host: '0.0.0.0',
        routes: {
            cors: {
                origin: ['*'],
            },
        },
    });

    server.route(routes);

    server.ext('onPreResponse', function (request, h) {
        const response = request.response;

       
        if (response.isBoom) {
            console.log(response.output.statusCode); 
            
            if (response.output.statusCode === 404) {
                const newResponse = h.response({
                    status: 'fail',
                    message: 'Not Found',
                }).code(404);
                return newResponse;
            }

                   
            if (response.output.statusCode === 413) {
                const newResponse = h.response({
                    status: 'fail',
                    message: "Payload content length greater than maximum allowed: 1000000", 
                }).code(413);

                return newResponse;
            }

            const newResponse = h.response({
                status: 'fail',
                message: response.message,
            }).code(response.output.statusCode);

            return newResponse;
        }

    
        return h.continue;
    });

    const model = await loadModel();
    server.app.model = model;

    await server.start();
    console.log(`Server berjalan pada ${server.info.uri}`);
};

init();
