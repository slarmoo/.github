# Startup AWS

This startup just requires you to create your AWS web server and set up a DNS Route53 domain for your server.
You need to follow the instructions with exactness.  
Typing in one wrong character can cause your server to not respond or to crash with an error.

When you are finished, your startup will be available from `https://startup.yourdomainname`.

## ☑ Assignment

1. [Set up your AWS acccount](../../essentials/awsAccount/awsAccount.md) using your byu.edu email address.
1. [Create a new EC2 instance](../../webServers/amazonWebServicesEc2/amazonWebServicesEc2.md) and access the server using `http://6.5.4.3` (where 6.5.4.3 is your IP address).
1. [Lease a domain](../../webServers/amazonWebServicesRoute53/amazonWebServicesRoute53.md) in Route53. Make sure you respond to the email that they will send you.
1. Make sure that you can access your server through HTTP through http://startup.yourdomain (where yourdomain is replaced with the domain you leased from Route53)
1. [Edit your Caddyfile](../../webServers/https/https.md) so that you can access your server through HTTPS.
1. Upload the URL to your startup application to the Canvas assignment. The URL should have the form https://startup.yourdomain
1. You should see the default web page displayed through HTTPS

![Web Browser Secure](../../webServers/https/webServerBrowserSecure.png)

## Grading Rubric

- 10% Your web page can be displayed using HTTP and an IP address like http://6.5.4.3 (where 6.5.4.3 is your IP address)(This will stop working once you modify your HTTPS for https)
- 40% Your web page can be displayed using HTTP and your domain name http://startup.yourdomain (where yourdomain is replaced with the domain you leased from Route53)
- 50% Your web page can be displayed using HTTPS and your domain name https://startup.yourdomain (where yourdomain is replaced with the domain you leased from Route53)

## Go celebrate

You did it! You now have a web server that can be seen by anyone in the world.
