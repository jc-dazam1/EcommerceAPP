# Test
## Ecommerce

## Descripción

Se debe diseñar e implementar parcialmente una plataforma de comercio electrónico simplificada con funcionalidades básicas. Esta plataforma constará de dos funcionalidades clave: gestión del catálogo de productos (Microservicio) y gestión de pedidos (funcion Lambda). Se ha pensado que la arquitectura más adecuada es con un enfoque híbrido segun las necesidades del proyecto.

## DIAGRAMA COMPONENTES

![Screenshot of a comment on a GitHub issue showing an image, added in the Markdown, of an Octocat smiling and raising a tentacle.](https://i.ibb.co/rcBFj0X/arquitectura-mixta.png)

## INSTRUCCIONES


 El repositorio consta de dos carpetas que contienen los dos principales proyectos Backend:
 - OrderManagmentFunction: Funcion Lambda, arquitectura serverless, lenguaje de progracion: javascript
 - ProductCatalogService: Microservicio, Base de datos Mysql (ya que RDS es un servicio de pago), lenguaje de programacion .Net Core
 
Para su respectiva ejecución se deben realizar los siguientes pasos:

- Tener instalado DockerDesktop
- Descargar cada uno de los proyectos.
- Primero se debe crear la imagen del servicio ProductCatalog por medio de este comando: docker build -t productcatalogservice .
- Ahora se debe crear la imagen de la función lambda por medio de este comando: docker build -t ordermanagmentfunction .
- Posterior a eso se debe ubicar por medio de cmd: CD el archivo docker-compose.yml y ejecutar docker-compose up
- Revisar si las imagenes estan en docker ejecutandose.
- Por medio de postman se pueden hacer pruebas de los servicios: 
        - Para probar microservicio se podria generar eventos POST desde el aplicativo apuntando a http://localhost:8000/products/  con este json : {
                                                            "Name": "Prueba Producto1",
                                                            "Price": 21.1,
                                                            "int": 10
                                                        }
        - Para probar la "function Lambda" se deje ejecutar sobre el mismo postman POST: http://localhost:3001/Order, con este json :{
    "productId":"1",
    "quantity":2
}  
