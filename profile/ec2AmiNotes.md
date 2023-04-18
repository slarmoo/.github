First we want to configure AWS and rent the server using AWS EC2. Using the AWS browser console do the following.

- Open the AWS EC2 Browser Console
- Create security group (one time action)
  - `cs260-webserver`
  - HTTP, HTTPS from everywhere
  - SSH from BYU `128.187.0.0/16`
  - Outbound to anywhere
  - Tag with Owner:cs260
- Create EC2 instance
  - Select Ubuntu
  - Named `cs260-webserver`
  - Tag with Owner:cs260
  - t3.micro
  - Create key pair (one time action) `cs260`
  - Select security group: `cs260-webserver`
  - Enabled Credit `specification:Unlimited` in advanced details
- Store key pair in development environment and restrict the rights
  - chmod 600 ~/keys/cs260/cs260.pem

Now we can install Caddy, NVM, Node, and PM2

- Shell into server
  - `ssh -i ~/keys/cs260/cs260.pem ubuntu@0.0.0.0` (substitute IP address)
- Install Caddy

  ```sh
  sudo apt install -y debian-keyring debian-archive-keyring apt-transport-https
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/gpg.key' | sudo gpg --dearmor -o /usr/share/keyrings/caddy-stable-archive-keyring.gpg
  curl -1sLf 'https://dl.cloudsmith.io/public/caddy/stable/debian.deb.txt' | sudo tee /etc/apt/sources.list.d/caddy-stable.list
  sudo apt update
  sudo apt install caddy
  ```

  - Test. `curl localhost` should display caddy HTML. You should also be able to hit if from your development environment in your browser using the instance's IP address
  - Allow the ubuntu user to modify the public_html static files and Caddyfile
    - `sudo chown -R ubuntu /usr/share/caddy`
    - `sudo chown -R ubuntu /etc/caddy/Caddyfile`
  - Create symlink for Caddyfile and Caddy static content directory
    - `ln -s /etc/caddy/Caddyfile Caddyfile`
    - `ln -s /usr/share/caddy public_html`

- Replace default Caddy static files with file found in the webprogramming260 repo
  - `scp -i ~/keys/cs260/cs260.pem webServerDefault.html ubuntu@0.0.0.0:public_html/index.html`
  - Hitting the server from the browser should now display the course default page.
- Install node.js
  - `curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.3/install.sh | bash`
  - close shell and reopen
  - `nvm install --lts` (this installed version 18.15.0)
  - Upgrade npm to the latest stable version
  - `npm install -g npm@latest` (this installed version 9.6.4)
- Set up PM2
  - npm install pm2 -g
- Add services for Simon and Startup
  - Create the services directories `mkdir -p ~/services/simon ~/services/startup`
  - On your development environment clone the `website-express` repo
    `https://github.com/webprogramming260/website-express.git`
  - Copy the repo files to a `~/services/simon` and `~/services/startup` directory on the production environment.
    - `scp -i ~/keys/cs260/cs260.pem -r public index.js package.json ubuntu@0.0.0.0:services/simon`
    - `scp -i ~/keys/cs260/cs260.pem -r public index.js package.json ubuntu@0.0.0.0:services/startup`
  - On your production environment install the dependent packages for each service.
    - `cd ~/services/simon && npm install`
    - `cd ~/services/startup && npm install`
  - Test that they work with `node` and `curl`
    - `cd ~/services/startup`
    - `node index.js 4000 startup`
    - `curl -v http://localhost:4000/config`
    - Stop the server
  - Register each service with PM2
    - `cd ~/services/simon && pm2 start index.js -n simon -- 3000 simon`
    - `cd ~/services/startup && pm2 start index.js -n startup -- 4000 startup`
    - `pm2 save`
    - `pm2 startup` will show you the command daemonize PM2. Run that command.
  - Test that they work
    - `curl http://localhost:3000/config`
    - `curl http://localhost:4000/config`
- Configure Caddy to run services
  - edit Caddyfile `sudo vi ~/Caddyfile`
  - replace the contents of the Caddyfile with `Caddyfile-base` found in webprogramming260 repo.
  - save and restart Caddy `sudo service caddy restart`

At this point you have a fully functioning web server. Now build an AMI.

- Open the AWS EC2 Browser Console and choose the create AMI option.
- After the AMI creates, select it and change it to be publicly available.
- Use a different AWS account and test that you can create and instance from the image.
