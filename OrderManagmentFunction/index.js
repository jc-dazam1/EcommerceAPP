const { createOrderTable } = require('./dynamodb');
const { handler } = require('./orderHandler');

// Llama a la función createOrderTable para crear la tabla DynamoDB
createOrderTable()
  .then(() => {
    console.log('Tabla DynamoDB creada exitosamente');
    // Llama a la función handler con un objeto de evento simulado
    return handler({ 
      body: JSON.stringify({ 
        productId: 1,
        quantity: 2
      })
    });
  })
  .catch((error) => {
    console.error('Error al crear la tabla DynamoDB:', error);
    // Maneja el error de acuerdo a tus necesidades
  });
