# Startup deliverable - Service

Now that you have learned how to use and create services, it is time to add significant functionality to your startup application. The main things you should focus on in this deliverable include calling third party services, providing your own service endpoints, persistently storing data using MongoDB as a data service, securely authenticating a user and storing their credentials, and enabling peer to peer communication using webSockets. This is a big upgrade to your previous deliverable and it will take a significant amount of time to provide all of this functionality.

You must use the same startup GitHub repository that you created in the earlier instruction. Update the notes.md file with things that you learn as you work on your startup. As you make changes to your HTML, CSS, and JavaScript commit those changes and push them to GitHub. You will need at least four commits to get full credit, but in reality you should have many more than that.

Remember to use the browser's debugger window to debug your front end HTML, CSS and JavaScript. You can also debug your back end service JavaScript running on Node.js using the built in VS Code debugger.

Once you have developed your application to where you want it, you need to release it to your production environment. **Replace** your previous startup deployment script with a copy of the `deployService.sh` script from the [Simon Service repository](https://github.com/webprogramming260/simon-service/blob/main/deployService.sh) and use `startup` for the service parameter (`-s`).

```sh
./deployService.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## ☑ Assignment

1. Convert your startup application into a web service.
1. Provide endpoints for your service.
1. Call third party endpoints from your service. This can be as simple as displaying a quote like Simon does.
1. Persist data in MongoDB. Data is updated and displayed by manipulating the DOM.
1. Authenticate and create users. Login data is stored in MongoDB.
1. Use WebSockets to receive data from your service and render it in the DOM.
1. Make sure all authors of the code are attributed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- (Required) Simon Service deployed to your production environment
- (Required) Simon DB deployed to your production environment
- (Required) Simon Login deployed to your production environment
- 10% - Calls third party service endpoints
- 20% - Provides service endpoints running under Node.js
- 20% - Stores data in MongoDB
- 20% - Provides authenticated login with securely stored credentials in MongoDB
- 10% - Peer communication using webSockets
- 10% - Multiple Git commits with meaningful comments.
- 10% - Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. Also add notes in your notes.md file describing what you have learned using services, node.js, mongodb, authentication, and webSockets.

## Go celebrate

You did it! This is a significant milestone. Time to grab some friends, show them what you did, and celebrate by watching a movie with popcorn 🍿.
