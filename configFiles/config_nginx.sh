#!/bin/bash
sudo apt-get update
sudo apt-get install nginx
# git clone https://github.com/Joy57/4996wsu-Senior-Project.git
# cd 4996wsu-Senior-Project
cd configFiles
rm /etc/nginx/nginx.conf
rm /etc/nginx/sites-enabled/default
cp nginx.conf /etc/nginx/nginx.conf
cp default /etc/nginx/sites-enabled/default
sudo service nginx start
echo "completed all steps..."
echo "now you can run init.sh"