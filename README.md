# EL proyecto esta conformado por 2 componentes backend y frontend
# Componente BACKEND:
Creado con spring framework, carpeta /prueba-backend
* Imagen docker:
1) docker pull nbaez001/prueba-backend
2) docker run --rm -it -p 8081:8081 --name=prueba-backend --net=prueba-net nbaez001/prueba-backend:latest

# Componente FRONTEND:
Creado con framework Angular 9, carpeta /prueba-frontend
* Imagen docker:
1) docker pull nbaez001/prueba-frontend
2) docker run --rm -it -p 8080:80 --name=prueba-frontend --net=prueba-net nbaez001/prueba-frontend:latest

# Caracteristicas SCRIPT:
Scripts para base de datos Oracle 11g, carpeta /prueba-sql
1) docker volume create prueba-oracle-data
2) sudo docker run --rm -d -p 1521:1521 --name prueba-oracle --net prueba-net -v prueba-oracle-data:/u01/app/oracle -e DBCA_TOTAL_MEMORY=1024 wnameless/oracle-xe-11g-r2
3) sudo docker exec -it prueba-oracle bash

Usuario/contraseña Oracle: system/oracle

