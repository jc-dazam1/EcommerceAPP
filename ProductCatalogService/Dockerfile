# Usa una imagen base adecuada, como ASP.NET Core
FROM mcr.microsoft.com/dotnet/core/sdk:latest AS build

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos necesarios al contenedor
COPY . .

# Restaura las dependencias del proyecto
RUN dotnet restore

# Publica la aplicación
RUN dotnet publish -c Release -o out

# Define la imagen base para la aplicación
FROM mcr.microsoft.com/dotnet/core/aspnet:latest AS runtime

# Establece el directorio de trabajo dentro del contenedor
WORKDIR /app

# Copia los archivos publicados de la fase de compilación al contenedor
COPY --from=build /app/out .

# Expone el puerto en el que la aplicación se ejecutará
EXPOSE 80

# Comando para iniciar la aplicación cuando el contenedor se ejecute
CMD ["dotnet", "ProductCatalogService.dll"]
