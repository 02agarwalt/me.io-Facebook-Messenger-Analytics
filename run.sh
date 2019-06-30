#!bin/bash

sudo docker pull tagarwa2/oose
sudo docker run -ti -p 8080:8080 -p 5000:5000 tagarwa2/oose $1
