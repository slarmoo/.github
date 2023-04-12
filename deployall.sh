#!/bin/bash

while getopts k:h: flag
do
    case "${flag}" in
        k) key=${OPTARG};;
        h) hostname=${OPTARG};;
    esac
done

if [[ -z "$key" || -z "$hostname" ]]; then
    printf "\nMissing required parameter.\n"
    printf "  syntax: deployall.sh -k <pem key file> -h <hostname>\n\n"
    exit 1
fi

printf "\n-------------------------------\nDeploying all services to with $key\n-------------------------------\n"

# The file based deployments don't work because they use the student's deployment which goes to the services directory

# You must edit the deployFiles.sh and alter step #1 and #2 so that it goes to public_html rather than services
# # Step 1
# printf "\n----> Clear out the previous distribution on the target.\n"
# ssh -i "$key" ubuntu@$hostname << ENDSSH
# rm -rf public_html/${service}
# mkdir -p public_html/${service}
# ENDSSH

# # Step 2
# printf "\n----> Copy the distribution package to the target.\n"
# scp -r -i "$key" * ubuntu@$hostname:public_html/$service

# Alternatively we should modify the html, css, and javascript to have a basic node service for
# hosting the files just like it is configured on the student AMI.


# cd ../simon-html && ./deployFiles.sh -k ${key} -h ${hostname} -s simon-html
# cd ../simon-css && ./deployFiles.sh -k ${key} -h ${hostname} -s simon-css
# cd ../simon-javascript && ./deployFiles.sh -k ${key} -h ${hostname} -s simon-javascript
cd ../simon-service && ./deployService.sh -k ${key} -h ${hostname} -s simon-service -p 3001
cd ../simon-db && ./deployService.sh -k ${key} -h ${hostname} -s simon-db -p 3002
cd ../simon-login && ./deployService.sh -k ${key} -h ${hostname} -s simon-login -p 3004
cd ../simon-websocket && ./deployService.sh -k ${key} -h ${hostname} -s simon-websocket -p 3005
cd ../simon-react && ./deployReact.sh -k ${key} -h ${hostname} -s simon-react -p 3003
cd ../simon-pwa && ./deployReact.sh -k ${key} -h ${hostname} -s simon-pwa -p 3006

# Deploy the lastest to simon.{hostname} on port 3000
cd ../simon-pwa && ./deployReact.sh -k ${key} -h ${hostname} -s simon -p 3000

echo cd ../webprogramming260
