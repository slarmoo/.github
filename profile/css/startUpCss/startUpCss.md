# Startup deliverable - CSS

Now that you have learned the basics of CSS, is time to style your startup application. The application doesn't have to do anything, but it should appear basically like what you expect your final application to look like. In the next deliverable you will add JavaScript to make your application functional.

You must use the same startup GitHub repository that you created for the previous deliverable. Update the notes.md file with things that you learn as you work on your startup. As you make changes to your CSS commit those changes and push them to GitHub. You will need at least four commits to get full credit, but in reality you should have many more than that.

Remember to use the `Live Server VS Code extension` to see what your code looks like in the browser. Also use the browser's debugger window to debug your CSS.

Once you have developed your application to where you want it, you need to release it to your production environment. **Copy** the `deployFiles.sh` script from the [Simon CSS repository](https://github.com/webprogramming260/simon-css/blob/main/deployFiles.sh) to your startup repository and use `startup` for the service parameter (`-s`)

```sh
./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s startup
```

For example,

```sh
./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s startup
```

Doing this will make this deliverable of your startup available from `https://startup.yourdomainname`.

## ☑ Assignment

1. Create the CSS deliverable of your startup application. Make sure all authors of the code are attributed in the application and that there is a link to your GitHub repository.
1. Periodically commit and push your code to GitHub.
1. Periodically update your startup repository's notes.md file to reflect what you have learned and want to remember.
1. Push your final version of your project to GitHub.
1. Deploy your startup application to your production environment (your server).
1. Make sure your application is available from your production environment.
1. Upload the URL to your startup application to the Canvas assignment.

## Grading Rubric

- (Required) Simon CSS deployed to your production environment
- Properly styled CSS
  - 20% Header, footer, and main content body
  - 20% Navigation elements
  - 10% Responsive to window resizing
  - 10% Application elements
  - 10% Application text content
  - 10% Application images
- 10% - Multiple Git commits with meaningful comments.
- 10% - Notes in your startup Git repository README.md file documenting what you modified and added with this deliverable. Also add notes in your notes.md file describing what you have learned using CSS.

## Go celebrate

You did it! This is a significant milestone. Time to grab some friends, show them what you did, and celebrate with cookies.
