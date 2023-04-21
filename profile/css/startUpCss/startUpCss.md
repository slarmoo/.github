# Startup CSS

Now that you have learned the basics of CSS, is time to style your startup application. The application doesn't have to do anything, but it should appear basically like what you expect your final application to look like. This includes styling of placeholder data that you expect to get from the user logging in, application data, and webSocket data. In the next deliverable you will add JavaScript to make your application functional.

You must use the same startup GitHub repository that you created for the previous deliverable. Update the notes.md file with things that you learn as you work on your startup. As you make changes to your CSS commit those changes and push them to GitHub. You will need at least four commits to get full credit, but in reality you should have many more than that.

Remember to use the `Live Server VS Code extension` to see what your code looks like in the browser. Also use the browser's debugger window to debug your CSS.

Once you have developed your application to where you want it, you need to release it to your production environment. Use the `deployFiles.sh` script from the [Simon CSS repository](https://github.com/webprogramming260/simon-css/blob/main/deployFiles.sh) to deploy your application. Make sure you specify `startup` for the service parameter (`-s`)

```sh
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## ☑ Assignment

1. Review and deploy Simon CSS
   1. Clone the Simon CSS repository to your development environment.
   1. Open the project in VS Code and examine the application's use of CSS.
   1. Execute in your development environment using the VS Code Live Server extension.
   1. Debug using the browser's dev tools to examine the styling of the CSS in the Elements tab.
   1. Deploy to your production environment using the deployment script so that it is available with your domain's `simon` subdomain.
1. Create the CSS deliverable of your startup application. Make sure your name is displayed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- (Required) Simon CSS deployed to your production environment
- (Required) A link to your GitHub startup repository prominently display on your home page
- (Required) Startup deployed to your production environment
- (Required) Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable.
- Properly styled CSS
  - 20% Header, footer, and main content body
  - 20% Navigation elements
  - 10% Responsive to window resizing
  - 20% Application elements
  - 10% Application text content
  - 10% Application images
- 10% - Multiple Git commits with meaningful comments.

## Go celebrate

You did it! This is a significant milestone. Time to grab some friends, show them what you did, and celebrate with cookies 🍪.
