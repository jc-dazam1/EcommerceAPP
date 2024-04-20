const {
    DynamoDBDocument,
} = require('@aws-sdk/lib-dynamodb');

const {
    DynamoDB,
} = require('@aws-sdk/client-dynamodb');

const http = require('http');

const dynamoDB = new DynamoDB({ region: process.env.AWS_DEFAULT_REGION, endpoint: process.env.AWS_ENDPOINT_URL });

exports.handler = async (event) => {
    // Obtener los datos del producto del evento
    const { productId, quantity } = JSON.parse(event.body);

    // Obtener información del producto del catálogo (simulado aquí)
    const productInfo = getProductInfo(productId);

    // Calcular el precio total de la orden
    const totalPrice = productInfo.price * quantity;

    // Guardar la orden en DynamoDB
    await saveOrderToDynamoDB(productId, quantity, totalPrice);

    // Retornar una respuesta exitosa
    return {
        statusCode: 200,
        body: JSON.stringify({ message: 'Order placed successfully!' }),
    };
};

function getProductInfo(productId) {
    // Aquí puedes simular la obtención de información del producto del catálogo (p. ej., llamada a otro servicio)
    return {
        price: 10, // Precio simulado
    };
}

async function saveOrderToDynamoDB(productId, quantity, totalPrice) {
    // Definir los parámetros para guardar la orden en DynamoDB
    const params = {
        TableName: 'Orders',
        Item: {
            productId: { S: productId },
            quantity: { N: quantity.toString() },
            totalPrice: { N: totalPrice.toString() },
            timestamp: { N: Date.now().toString() },
        },
    };

    // Guardar la orden en DynamoDB
    try {
        await dynamoDB.putItem(params);
        console.log("Order saved successfully");
    } catch (error) {
        console.error("Error saving order to DynamoDB:", error);
        throw error;
    }
}


const server = http.createServer((req, res) => {
    if (req.method === 'POST' && req.url === '/order') {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', async () => {
            const event = { body: body };
            const lambdaResponse = await exports.handler(event);
            res.end(lambdaResponse.body);
        });
    } else {
        res.end('Invalid request');
    }
});

server.listen(3001, () => {
    console.log('Server listening on port 3001');
});