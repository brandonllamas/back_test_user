# Back_test_user
 


# RUN APP

1) Intala las dependencias
    npm i

2) Abra la carpeta config y cambie el archivo config.json con los valores correspondiente a la bd

3) Copia el archivo .env.example y pegalo,cambia el nombre a .env y dentro de este cambia el puerto de la aplicacion

4) Si no cuenta con una base de datos creada ,ejecute el comando 
    npx sequelize-cli db:create

5) Se migra bd con 
    npx sequelize-cli db:migrate

6) Se ejecutan los seeders con 
    npx sequelize-cli db:seed