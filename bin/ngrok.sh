#!/bin/bash

source ./.env

echo $SERVICE_ID

ngrok config add-authtoken $NGROK_AUTHTOKEN

ngrok http 3000
