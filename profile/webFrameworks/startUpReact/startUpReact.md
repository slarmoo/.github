# Start up deliverable - Final

It is time to create the final version of your start up application. This deliverable converts your application to use the web application framework, React.

You must use the same start up GitHub repository that you created in the earlier instruction. Update the notes.md file with things that you learn as you work on your start up. As you make changes to your application, commit those changes and push them to GitHub. You will need at least four commits to get full credit, but in reality you should have many more than that.

Remember to use the the browser's debugger window to debug your CSS and JavaScript. You can also debug your service JavaScript running on Node.js using the built in VS Code debugger.

Once you have developed your application to where you want it, you need to release it to your production environment. **Replace** your previous start up deployment script with a copy of the `deployReact.sh` script from the [Simon React repository](https://github.com/webprogramming260/simon-react/blob/main/deployReact.sh) and use `startup` for the service parameter (`-s`).

```sh
./deployReact.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployReact.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your start up available from `https://startup.yourdomainname`.

## ☑ Assignment

1. Convert your start up application to use React.
1. Make sure all authors of the code are attributed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your start up repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your start up application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your start up application to the Canvas assignment.

## Grading Rubric

- Convert your application to use React
  - 30% Multiple react components
  - 20% React router
  - 20% React hooks
  - 10% Bundled using Babel
- 10% - Multiple Git commits with meaningful comments.
- 10% - Notes in your start up Git repository README.md file documenting what you modified and added with this deliverable. Also add notes in your notes.md file describing what you have learned using React.

## Go celebrate

With the completion of your application you have become a Start Up Founder. Way to go! Time to grab some friends, recruit them to market your soon to be viral application, and celebrate by going out to lunch. I'm thinking tacos. 🌮
