# Simon JavaScript

![Simon](../simon.png)

This deliverable demonstrates the use of basic JavaScript for interactivity. This addition makes the application completely functional. The application has a login (home), game play, high scores, and about page. Each page contains a header that provides navigation between the pages, and a footer that references the source repository.

## Adding JavaScript

The major changes to the application include the introduction of `login.js`, `play.js`, and `scores.js`. When a user enters their login name, `login.js` puts that name in the browser's local storage so that it is available the next time they use the application. `play.js` controls all the game interactions and stores the resulting score in the browser's local storage. `scores.js` retrieves the high scores from local storage so that they can be displayed.

You can view this application running here: [Example Simon JavaScript](https://simon-javascript.cs260.click)

![Simon JavaScript](simonJavascript.gif)

### index.html and login.js

The first place we used JavaScript in Simon, allows the user to provide their name. We then store that name in the Browser's local storage cache. Once in the cache we can read the value from other html pages, or even later browser sessions on the same device.

Notice the inclusion of a `onclick` call to the `login` function found in the `login.js` file. We reference the `login.js` file by including an HTML `script` element.

```html
<script src="login.js"></script>

//...

<input type="text" id="name" placeholder="Your name here" />
<button class="btn btn-primary" onclick="login()">Login</button>
```

In the `login.js` file we handle a click on the login button by using the document object's querySelector function to get the input element's value and store it in local storage. We then redirect the browser to display the `play.html` page.

```js
function login() {
  const nameEl = document.querySelector('#name');
  localStorage.setItem('userName', nameEl.value);
  window.location.href = 'play.html';
}
```

### scores.js

The `scores.js` reads the current high scores out of local storage and injects the values into the DOM usinng `createElement` and `appendChild` calls.

### play.js

This is where all the game play interactions occur. There are two classes one for `Button` and one for `Game`. The Button class handles the playing of the button's audio file, along with the change in color, when a button is pressed.

The Game class manages the current sequence that a user is supposed to duplicate. This is done with the `reset` function to clear out the sequence and add a new random button, and the `playSequence` function that plays the sequence for the user to duplicate.

## Study this code

Get familiar with what the example code teaches.

- Clone the repository to your development environment.

  ```sh
  git clone https://github.com/webprogramming260/simon-javascript.git
  ```

- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it using the VS Code Live Server extension.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using a copy of the `deployFiles.sh` script found in the [example class application](https://github.com/webprogramming260/simon-javascript/blob/main/deployFiles.sh). Take some time to understand how it works.

  ```sh
  ./deployFiles.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployFiles.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

- Update your `startup` repository notes.md with what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
- Submit the URL to your production environment for grading using the Canvas assignment page.
