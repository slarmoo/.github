# Startup Service

Now that you have learned how to use and create services, it is time to add backend support to your startup application. The main things you should focus on in this deliverable include serving up your frontend code through Node.js, calling third party services, and providing your own service endpoints.

You must use the same startup GitHub repository that you created in the earlier instruction. Update the notes.md file with things that you learn as you work on your startup. As you make changes to your HTML, CSS, and JavaScript commit those changes and push them to GitHub. You will need at least four commits to get full credit, but in reality you should have many more than that.

Remember to use the browser's debugger window to debug your frontend HTML, CSS and JavaScript. You can also debug your backend service JavaScript running on Node.js using the built in VS Code Node.js debugger. You should no longer be using the VS Code Live Server extension to serve up your frontend code to the browser since your Node.js server code should now do that.

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

1. Convert your startup application into a web service using Node.js and Express.
1. Serve up your frontend code using the Express static middleware.
1. Provide endpoints form your service.
1. Call your endpoints from your frontend code.
1. Call third party endpoints from your frontend code. This can be as simple as displaying a quote like Simon does.
1. Debug your application using VS Code's Node debugger and the browser's dev tools, in your development environment to verify it is working correctly.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- (Required) Simon Service deployed to your production environment
- 30% - Create an HTTP service using Node.js and Express
- 10% - Frontend hosted using express static middleware
- 10% - Your frontend calls third party service endpoints
- 20% - Your backend provides service endpoints
- 10% - Your frontend calls your backend endpoints
- 10% - Multiple Git commits with meaningful comments.
- 10% - Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. Also add notes in your notes.md file describing what you have learned.

## Go celebrate

You did it! This is a significant milestone. Time to grab some friends, show them what you did, and celebrate by watching a movie with popcorn 🍿.
