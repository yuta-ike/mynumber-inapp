#!/bin/bash

source ./.env

echo $NEXT_PUBLIC_POCKET_SIGN_SERVICE_ID

ngrok config add-authtoken $NGROK_AUTHTOKEN

ngrok http 3000
