// POSTMAIL ENVIOS Y PEDIDOS

Este proyecto tiene como objetivo principal hacer un modulo web que nos permita a los ususarios y a los afiliados de POSTMAIL,
una serie de registros de sus envios que posteriormente se pueda hacer una recoleccion de datos de sus pedidos,
que en el sistema del cliente pueda registrar la direccion del envio y asignarle el paquete que desea enviar.

// INSTALACION

Primer punto: necesitariamos un comando para descargar una copia completa del repositorio en nuestra maquina.
COMANDO: git clone.

Segundo punto: El URL del repositorio:  https://github.com/ErnestVelasquez/POSTMAIL

Como ejecutar 
1- Abrir una terminal o una linea de comandos en nuestro sistema.
2- Naveguemos en nuestro directorio donde podamos guardar el proyecto (podemos utilizar cd NombreDelDirectorio).

Escribimos el comando completo ejemplo: git clone https://github.com/usuario/repo.git 
Y de ultimo presionamos enter y el git se descargara por completo. 

// INSTALACION DE LAS DEPENDENCIAS 

 Necesitaremos un comando para instalar las dependencias y ese codigo se mostrara a continuacion.
 (npm install) este comando descargara e instalara automaticamente las dependencias necesarias y asegurando que el proyecto funcione correctamente.

 // EJECUCION DEL PROYECTO

 Primer punto para la ejecucion: Es iniciar con el siguiente comando (node Server.js)
 Segundo punto: donde se pone el URL se cambia de metodo de get a post 
 3. colaca el URL: http://localhost:3000/crear-usuario 
 4. En body se elige el JSON
 5. se escribe el siguiente codigo {
  "nombre": "Arnulfo Cuevas",
  "creditos": 3
}

6. eso te devolvera un JSON como el siguiente: {
  "mensaje": "Usuario creado correctamente",
  "usuario": {
    "_id": "662fa51b4427279c2212123a",
    "nombre": "Carlos Mendoza",
    "creditos": 3,
    "__v": 0
  }
}

7. Copiar el _id por que se necesitara más tarde (muestra del id: 662fa51b4427279c2212123a )

8. En el mismo metodo post se coloca el siguiente URL: http://localhost:3000/envio

9. En body -> JSON se escribe el siguiente codigo
{
  "usuario_id": "6819643ff96964547f2d5799",
  "nombre": "Jorge Gimaz",
  "direccion": "Calle 123",
  "telefono": "123456789",
  "referencia": "Frente al parque",
  "descripcion": "Paquete pequeño",
  "peso": 4,
  "fecha_entrega": "2025-05-10"
}
Aqui se cambia el Usuario_id con el que copio anteriormente
Eso seria todo el proceso para ejecutar el proyecto.
