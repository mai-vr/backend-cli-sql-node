# USERS CRUD
Un sistema de gestión de usuarios desarrollada con NodeJs que utiliza una base de datos SQL para obtener, crear, actualizar y borrar datos.

----------------------
## Instalación
Para ejecutar el proyecto de forma local primero es necesario clonar el repositorio:
```
git clone https://github.com/mai-vr/backend-cli-sql-node.git
```

Cabe aclarar que es necesario que el motor de la base de datos esté en ejecución antes de correr el proyecto. En caso de utilizar XAMPP se debe abrir y activar las opciones de 'Apache' y 'MySQL'. 

Luego se debe abrir la terminal del editor de código, esto se puede hacer con  `CTRL + Ñ`.  

Una vez en la terminal se deben escribir los siguientes comandos seguidos de la operación que se quiera realizar: get, create, update o delete.
```
npm run dev
``` 


## Tecnologías utilizadas
- SQL - MySQL para almacenar y persistir los datos de los usuarios.
- NodeJS - Interactuar a través de la terminal con los datos de la base de datos. 


## Estructura del proyecto
El proyecto consta de los siguientes archivos:
``` bash
.
├─── configSql.js       # Configuración de la conexión a la base de datos MySQL.
├─── controllers.js     # Declaración de las funciones para obtener o modificar la base de datos.
├─── helpers.js         # Funciones auxiliares reutilizables para validaciones de datos ingresados.
├─── index.js           # Punto de entrada de la aplicación y donde se reciben los parámetros ingresados.
├─── package.json       # Configuración inicial del proyecto y scripts para interactuar con la terminal.
├─── package-lock.json  # Control de versiones de dependencias.
├─── README.md          # Documentación general del proyecto.
```