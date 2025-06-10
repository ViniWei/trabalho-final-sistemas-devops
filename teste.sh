#!/bin/bash

# Configurações
HOST_AUTH="http://localhost:8000"
HOST_SENDRECEIVE="http://localhost:3000"
HOST_RECORD="http://localhost:5000"

EMAIL="user@example.com"
PASSWORD="123456"

echo "Registrando usuário na Auth-API..."
curl -s -X POST "$HOST_AUTH/user" -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}"
echo -e "\n"

echo "Logando para obter token..."
RESPONSE=$(curl -s -X POST "$HOST_AUTH/token" -H "Content-Type: application/json" \
  -d "{\"email\":\"$EMAIL\", \"password\":\"$PASSWORD\"}")
TOKEN=$(echo $RESPONSE | jq -r '.token')

if [ "$TOKEN" = "false" ] || [ -z "$TOKEN" ]; then
  echo "Falha no login. Verifique as credenciais ou se o usuário já existe."
  exit 1
fi

echo "Token obtido: $TOKEN"
echo ""

# IDs para teste
SENDER_ID=1
RECEIVER_ID=2

echo "Enviando mensagem via SendReceive-API..."
curl -s -X POST "$HOST_SENDRECEIVE/message" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"userIdSend\": $SENDER_ID, \"userIdReceive\": $RECEIVER_ID, \"message\": \"Olá do script!\"}"
echo -e "\n"

echo "Processando mensagens com /message/worker..."
curl -s -X POST "$HOST_SENDRECEIVE/message/worker" \
  -H "Content-Type: application/json" \
  -H "Authorization: Bearer $TOKEN" \
  -d "{\"userIdSend\": $SENDER_ID, \"userIdReceive\": $RECEIVER_ID}"
echo -e "\n"

echo "Buscando mensagens do usuário via GET /message?userId=1..."
curl -s -X GET "$HOST_SENDRECEIVE/message?userId=$SENDER_ID" \
  -H "Authorization: Bearer $TOKEN"
echo -e "\n"

echo "Testes concluídos."
