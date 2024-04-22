const { DynamoDB } = require('@aws-sdk/client-dynamodb');
const dynamoDB = new DynamoDB({ region: process.env.AWS_DEFAULT_REGION, endpoint: process.env.AWS_ENDPOINT_URL });

async function createOrderTable() {
    const tableName = 'Orders';
    const params = {
        TableName: tableName,
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
        // Verificar si la tabla ya existe
        await dynamoDB.describeTable({ TableName: tableName });

        console.log("La tabla", tableName, "ya existe.");
    } catch (error) {
        // Si la tabla no existe, crearla
        if (error.name === 'ResourceNotFoundException') {
            console.log("La tabla", tableName, "no existe. Creándola...");
            try {
                await dynamoDB.createTable(params);
                console.log("Tabla", tableName, "creada exitosamente.");
            } catch (error) {
                console.error("Error creating Orders table:", error);
                throw error;
            }
        } else {
            // Si ocurre otro tipo de error, lanzar la excepción
            console.error("Error describing Orders table:", error);
            throw error;
        }
    }
}

module.exports = {
    createOrderTable,
};

