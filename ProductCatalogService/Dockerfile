# Etapa de construcción
FROM mcr.microsoft.com/dotnet/sdk:latest AS build
WORKDIR /src

# Copiar el archivo del proyecto y restaurar las dependencias
COPY ["ProductCatalogService.csproj", "."]
RUN dotnet restore "ProductCatalogService.csproj"

# Copiar todo el código fuente
COPY . .

# Compilar la aplicación
RUN dotnet build "ProductCatalogService.csproj" -c Release -o /app/build

# Etapa de publicación
FROM mcr.microsoft.com/dotnet/aspnet:latest AS publish
WORKDIR /app
COPY --from=build /app/build .

# Definir el punto de entrada de la aplicación
ENTRYPOINT ["dotnet", "ProductCatalogService.dll"]

