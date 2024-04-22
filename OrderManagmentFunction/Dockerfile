# Utiliza una imagen de Node.js como base
FROM node:16

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia el código fuente de la función Lambda al contenedor
COPY . .

# Instala las dependencias de la función Lambda
RUN npm install --save-dev @types/node

# Instala el SDK de AWS para JavaScript
RUN npm install aws-sdk

# Instala el cliente DynamoDB del SDK de AWS
RUN npm install @aws-sdk/client-dynamodb

# Define el comando de inicio para ejecutar la función Lambda
CMD ["npm", "start"]

