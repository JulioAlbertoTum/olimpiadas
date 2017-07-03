# Olimpiadas
Una single web app para evaluacion  de  olimpiadas cientificas

#Componentes del grupo: 
	+Gregorio Quintela Vargas
	+Rafael Yerko Rojas Altamirano
	+Julio Alberto Tumiri Llanque

#Funcionalidad:
	+Autentificacion y Autorizacion para tres tipos de roles estudiante, administrador, evaluador.
	+Creacion, Edicion,Eliminacion de Areas y Subareas.
	+Creacion, Edicion,Eliminacion de Temario.
	+Creacion, Edicion,Eliminacion de Temas.
	+Creacion, Edicion,Eliminacion de Preguntas de tipo normal y opcion multiple.

Funcionalidad para el examen final
+ creacion edicion eliminacion de evaluaciones - rol evaluador 

No existen usuarios, todos los usuarios con sus respectivos roles se pueden crear desde el registro.

#Instalacion

Los requerimientos son:
+[Mongodb 3.2](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-ubuntu/")
+[Nodejs](https://nodejs.org/es/download/)
+[npm](https://www.npmjs.com/package/npm)
+[nodemon](https://www.npmjs.com/package/nodemon)

verificar y/o iniciar el servicio de mongodb:  service mongod start

una vez instalado los requerimientos descargar el  codigo fuente ingresar a la carpeta y ejecutar:
+ npm install

A continuacion ejecutar las siguientes instrucciones
 + nodejs server.js  (para linux)
 + npm run start     (windows)


