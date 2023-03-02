#!/bin/bash

source ./.env

# First argument: pocketsign service id
# Second argument： ngrok url
echo -n "https://p8n.jp/in_app?service_id=$SERVICE_ID&url=${1}" | npx qrcode -o QRCODE.png
