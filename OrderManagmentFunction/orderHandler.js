
const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const { DynamoDBClient } = require('@aws-sdk/client-dynamodb');
const { ScanCommand } = require('@aws-sdk/client-dynamodb');

const http = require('http');

const dynamoDB = new DynamoDB({ region: process.env.AWS_DEFAULT_REGION, endpoint: process.env.AWS_ENDPOINT_URL });
const dynamoDBClient = new DynamoDBClient({ 
    region: process.env.AWS_DEFAULT_REGION,
    endpoint: process.env.AWS_ENDPOINT_URL
});

exports.handler = async (event) => {
    if (event.httpMethod === 'POST' && event.path === '/order') {
        return await placeOrder(event);
    } else if (event.httpMethod === 'GET' && event.path === '/orders') {
        return await getOrders();
    } else {
        return {
            statusCode: 400,
            body: JSON.stringify({ message: 'Invalid request' }),
        };
    }
};

async function placeOrder(event) {
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
}

async function getOrders() {
    const params = {
        TableName: 'Orders',
    };

    try {
        const command = new ScanCommand(params);
        const data = await dynamoDBClient.send(command);
        return {
            statusCode: 200,
            body: JSON.stringify(data.Items),
        };
    } catch (error) {
        console.error("Error fetching orders:", error);
        return {
            statusCode: 500,
            body: JSON.stringify({ message: 'Error fetching orders' }),
        };
    }
}
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

/*
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
*/