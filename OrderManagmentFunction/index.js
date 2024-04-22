const { createOrderTable } = require('./dynamodb');
const { handler } = require('./orderHandler');

// Llama a la función createOrderTable para crear la tabla DynamoDB
createOrderTable()
    .then(() => {
        console.log('Tabla DynamoDB creada exitosamente');
        // Llama a la función handler con un objeto de evento simulado para realizar una solicitud GET
        return handler({
            httpMethod: 'GET',
            path: '/orders'
        });
    })
    .catch((error) => {
        console.error('Error al crear la tabla DynamoDB:', error);
        // Maneja el error de acuerdo a tus necesidades
    });
