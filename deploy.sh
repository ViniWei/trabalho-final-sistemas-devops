#!/bin/bash

CONTAINER_NAME="trabalho-final-sistemas-devops-db-1"
MYSQL_ROOT_PASSWORD="senha"

echo "Subindo containers..."
docker-compose up -d --build

echo "Aguardando o MySQL ficar pronto..."
until docker exec "$CONTAINER_NAME" mysqladmin ping -h "localhost" -p"$MYSQL_ROOT_PASSWORD" --silent; do
  echo -n "."
  sleep 1
done
echo -e "\nMySQL está pronto!"

echo "Criando tabelas no banco MySQL..."
docker exec -i "$CONTAINER_NAME" mysql -u root -p"$MYSQL_ROOT_PASSWORD" < ./init.sql

echo "Deploy completo!"
