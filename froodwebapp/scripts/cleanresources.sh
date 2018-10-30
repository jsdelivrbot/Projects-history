#!/bin/bash
pm2 stop prodServer.js

sudo rm -rf ~/apps/froodwebapp
sudo mkdir -vp ~/apps/froodwebapp