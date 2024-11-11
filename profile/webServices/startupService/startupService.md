# Startup Service

Now that you have learned how to use and create services, it is time to add backend support to your startup application. The main things you should focus on in this deliverable include serving up your frontend code through Node.js, calling third party services, and providing your own service endpoints.

You must use the same startup GitHub repository that you created in the earlier instruction. Update the `notes.md` file with things that you learn as you work on your startup. As you make changes to your HTML, CSS, and JavaScript, commit those changes and push them to GitHub. Make sure you have enough commits that you can demonstrate your ownership of the code and protect yourself from loss. Usually this will mean at least ten commits, but in reality you may have many more than that. Failing to fully document your work may result in the rejection of your submission.

Remember to use the browser's debugger window to debug your frontend HTML, CSS and JavaScript. You can also debug your backend service JavaScript running on Node.js using the built in VS Code Node.js debugger. You should no longer be using the VS Code Live Server extension to serve up your frontend code to the browser since Vite does that now.

## Third party APIs

You can find a list of free third party APIs on [FreePublicApis.com](https://www.freepublicapis.com/).

## Deployment

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

1. Review and deploy Simon Service
   1. Clone the Simon Service repository to your development environment.
   1. Run `npm install` in the root of the project.
   1. Open the project in VS Code and examine the application's use of Node.js, Express, and JavaScript to create service endpoints.
   1. Execute in your development environment by debugging the application using VS Code's Node.js debugger (press F5 while viewing `index.js`). Set breakpoints in VS Code and step through the backend JavaScript.
   1. Start your frontend code using Vite by running `npm run dev`.
   1. Open your browser to http://localhost:5173 and use the browser's dev tools to step through the frontend JavaScript using the Source tab.
   1. Deploy to your production environment using the deployment script so that it is available with your domain's `simon` subdomain.
1. Convert your startup application into a web service using Node.js and Express.
1. Make sure you can start your service on the port specified as a parameter to the application. Default to use port 4000.
   ```js
   const port = process.argv.length > 2 ? process.argv[2] : 4000;
   ```
1. Serve up your frontend code using the Express static middleware.
   ```js
   app.use(express.static('public'));
   ```
1. Provide endpoints for your service.
1. Call your endpoints from your frontend code.
1. Call third party endpoints from your frontend code. This can be as simple as displaying a quote like Simon does.
1. Debug your application using VS Code's Node debugger and the browser's dev tools, in your development environment, to verify it is working correctly.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.
2. This [video](https://youtu.be/lr6rmjUhOc0) may help you understand how to develop, debug and deploy your startup as a service.

## Grading Rubric

- **Prerequisite**: Simon Service deployed to your production environment
- **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- **Prerequisite**: Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- **Prerequisite**: Enough Git commits to fully prove your ownership of your code. This usually means dozens of commits spread accross multiple days of the deliverable development period. Failure to do this may result in the rejection of your submission.
- Backend web service support and interaction
  - 40% - Create an HTTP service using Node.js and Express
  - 10% - Frontend served up using Express static middleware
  - 10% - Your frontend calls third party service endpoints
  - 20% - Your backend provides service endpoints
  - 20% - Your frontend calls your service endpoints

## Go celebrate

You did it! This is a significant milestone. Time to grab some friends, show them what you did, and celebrate by watching a movie with popcorn 🍿.
