# Startup React

Now that you have experience with using a web framework, it is time to convert your application to use React. This will require significant modifications to your frontend code. Make sure you reserve enough time to successfully complete this work.

You must use the same startup GitHub repository that you created in the earlier instruction. Update the `notes.md` file with things that you learn as you work on your startup. As you make changes to your application, commit those changes and push them to GitHub. You will need at least ten commits to get full credit, but in reality you should have many more than that.

Remember to use the the browser's debugger window to debug your CSS and JavaScript. You can also debug your service JavaScript running on Node.js using the built in VS Code Node.js debugger.

Once you have developed your application to where you want it, you need to release it to your production environment. **Replace** your previous startup deployment script with a copy of the `deployReact.sh` script from the [Simon React repository](https://github.com/webprogramming260/simon-react/blob/main/deployReact.sh) and use `startup` for the service parameter (`-s`).

```sh
./deployReact.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployReact.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## ☑ Assignment

1. Review and deploy Simon React
   1. Clone the Simon React repository to your development environment.
   1. Run `npm install` in both the root of the project and the `services` directory.
   1. Open the project in VS Code and examine the application's use of React.
   1. Create and configure the `service/dbConfig.json` file with your MongoDB credentials.
   1. Execute your backend code in your development environment by debugging the application using VS Code's Node.js debugger (press F5 while viewing `service/index.js`). Set breakpoints in VS Code and step through the backend JavaScript related to login interactions.
   1. Execute your frontend code in your development environment by running `npm start` from the console in the root of the project. This will automatically open your browser to https://localhost:3001. Use the browser's dev tools to step through the frontend JavaScript using the Source tab.
   1. Deploy to your production environment using the deployment script so that it is available with your domain's `simon` subdomain.
1. Convert your startup frontend to use React. This includes:
   1. Creating a template starting application using `vite` and cleaning up what it created.
   1. Creating a react router that displays stubbed components for the main pieces of your application.
   1. Converting your previous HTML files into the stubbed components.
1. Make sure your name is displayed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's `notes.md` file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- **Prerequisite**: Simon React deployed to your production environment
- **Prerequisite**: A link to your GitHub startup repository prominently displayed on your application's home page
- **Prerequisite**: Notes in your startup Git repository `README.md` file documenting what you modified and added with this deliverable. The TAs will only grade things that have been clearly described as being completed. Review the [voter app](https://github.com/webprogramming260/startup-example) as an example.
- **Prerequisite**: At least 10 git commits spread consistently throughout the assignment period.
- Application converted to use React
  - 10% Bundled using Vite
  - 30% Multiple functional react components
  - 30% React router
  - 30% React hooks

## Go celebrate

With the completion of your application you have become a Startup Founder. Way to go! Time to grab some friends, recruit them to market your soon-to-be-viral application, and celebrate by going out to lunch. I'm thinking tacos. 🌮
