# Startup WebSocket

Now that you have learned how to use WebSocket network connections, it is time to add it to your startup application. The main things you should focus on in this deliverable include listening for a connection on your backend, making a connection from your frontend, sending messages between the two, and displaying the result in your application.

You must use the same startup GitHub repository that you created in the earlier instruction. Update the notes.md file with things that you learn as you work on your startup. As you make changes to your HTML, CSS, and JavaScript commit those changes and push them to GitHub. You will need at least four commits to get full credit, but in reality you should have many more than that.

Remember to use the browser's debugger window to debug your frontend HTML, CSS and JavaScript. You can also debug your backend service JavaScript running on Node.js using the built in VS Code Node.js debugger.

Once you have developed your application to where you want it, you need to release it to your production environment. Usethe `deployService.sh` script from the [Simon WebSocket repository](https://github.com/webprogramming260/simon-websocket/blob/main/deployService.sh) and use `startup` for the service parameter (`-s`).

```sh
./deployService.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## ☑ Assignment

1. Listen for WebSocket requests on your backend.
1. Connect the WebSocket from your frontend.
1. Send messages over your WebSocket connection.
1. Connect your WebSocket functionality to your application interface.
1. Make sure your name is displayed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- (Required) Simon WebSocket deployed to your production environment
- 20% - Backend listens for WebSocket connection
- 20% - Frontend makes WebSocket connection
- 20% - Data sent over WebSocket connection
- 20% - WebSocket data displayed in the application interface
- 10% - Multiple Git commits with meaningful comments.
- 10% - Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. Also add notes in your notes.md file describing what you have learned.

## Go celebrate

You did it! This is a significant milestone. Time to grab some friends, show them what you did, and celebrate by eating some cheese 🧀.
