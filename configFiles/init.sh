#!/bin/bash
sudo apt-get update
sudo apt-get install apt-transport-https ca-certificates curl software-properties-common
curl -fsSL https://download.docker.com/linux/ubuntu/gpg | sudo apt-key add - 
sudo add-apt-repository "deb [arch=amd64] https://download.docker.com/linux/ubuntu $(lsb_release -cs) stable"
sudo apt-get update
sudo apt-get install docker-ce
echo "Verifying docker installation..."
sudo docker run hello-world

echo "Pulling the weather image and running it"
docker run --rm -p 8000:8000 joyabe18/test2:pi1

