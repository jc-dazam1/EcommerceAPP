// Configuración del cliente DynamoDB para LocalStack
const { DynamoDB } = require('@aws-sdk/client-dynamodb');

// Configuración del cliente DynamoDB para LocalStack
const dynamoDB = new DynamoDB({ 
    region: 'us-east-1', // Región
    endpoint: 'http://localstack:4566' // URL de LocalStack
});


async function createOrderTable() {
    const params = {
        TableName: 'Orders',
        KeySchema: [
            { AttributeName: 'productId', KeyType: 'HASH' },
        ],
        AttributeDefinitions: [
            { AttributeName: 'productId', AttributeType: 'S' },
        ],
        ProvisionedThroughput: {
            ReadCapacityUnits: 1,
            WriteCapacityUnits: 1,
        },
    };

    try {
        await dynamoDB.createTable(params);
        console.log("Orders table created successfully");
    } catch (error) {
        console.error("Error creating Orders table:", error);
    }
}

module.exports = {
    createOrderTable,
};
