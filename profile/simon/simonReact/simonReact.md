# Simon React

🎥 **Instruction video**: [Simon React](https://youtu.be/wO20-h3qNXE)

![Simon](../simon.png)

This deliverable demonstrates using [React](https://reactjs.org/) as a web framework and Vite as your frontend tooling. This helps with tasks such as building modular components, providing reactive UI elements, supporting sessions, lazy loading, and reducing (minifying) the size of your application.

As part of the move to React, we convert Simon from a **multi-page application** to a **single-page application**. In a single-page application, the browser only loads a single HTML file (index.html), and then we use JavaScript to interactively change the rendered content and components. This is a significant architectural shift to the application and will require you to reorganize your code to fit the single-page, component driven, model.

# Steps to convert Simon to React

The following section discusses the general steps taken to convert the Simon application from a simple HTML/CSS/JavaScript application to a React application. You will need to take similar steps for your startup project, and so it is important to understand what is happening at each step of the conversion process. You don't necessarily have to go through this process with the Simon demonstration application, but it is a safe place to try since you have both the starting version (simon-websocket) and the ending version (simon-react) to reference.

We begin by introducing `vite`, our frontend tooling. The HTML, CSS, and JavaScript is then reworked into React components. The React components are then reworked to take advantage of functionality that React provides. This includes function style components, modularization, reactive interactions, and a React representation of Bootstrap.

Here is a complete list of all the steps involved to convert Simon to a React application. When you port your startup to React you will want to commit your changes as you complete each step in the process.

1. Clone the `simon-websocket` repository
1. Reorganize the code
1. Install and configure Vite
1. Convert to React Bootstrap
1. Enable React
1. Create app component
1. Create view components
1. Create the router
1. Convert scores component
1. Convert other components

To give you a picture of where we will end up after porting to React, the final Simon project structure looks like the following.

```sh
├─ vite.config.js              # Config for Vite dev debugging
├─ deployReact.sh              # React specific deployment
├─ index.html                  # Single HTML file for the App
├─ index.jsx                   # Loads the top level component
├─ package.json                # Defines dependent modules
├─ public                      # Static assets used in the app
│   ├─ button-bottom-left.mp3
│   ├─ button-bottom-right.mp3
│   ├─ button-top-left.mp3
│   ├─ button-top-right.mp3
│   ├─ error.mp3
│   └─ favicon.ico
├─ service                     # Backend service code
│   ├─ database.js
│   ├─ dbConfig.json
│   ├─ index.js
│   ├─ package-lock.json
│   ├─ package.json
│   └─ peerProxy.js
└─ src                         # Frontend React code
    ├─ app.jsx                 # Top level component
    ├─ app.css
    ├─ about                   # About component
    │   ├─ about.css
    │   └─ about.jsx
    ├─ login                   # Login component
    │   ├─ login.jsx           # Renders auth sub-components
    │   ├─ authState.js        # Enum for auth state
    │   ├─ unauthenticated.jsx # Renders if unauthenticated
    │   ├─ authenticated.jsx   # Renders if authenticated
    │   ├─ authenticated.css
    │   └─ messageDialog.jsx
    ├─ play                    # Game play component
    │   ├─ delay.js
    │   ├─ gameNotifier.js
    │   ├─ play.jsx
    │   ├─ players.css
    │   ├─ players.jsx
    │   ├─ simonButton.jsx
    │   ├─ simonGame.css
    │   └─ simonGame.jsx
    └─ scores                 # Scores component
        ├─ scores.css
        └─ scores.jsx
```

## Reorganize the code

Because we are hosting both the Simon React application and the Simon service web service in the same project, we need to put them each in separate directories. We want the service code in a `service` directory and the React code in the `src` directory. To accomplish this, first delete the `node_modules` directory from the `simon` directory. Then move the service code (`package.json`, `package-lock.json`, `index.js`, `database.js`, `peerProxy.js`, and `dbConfig.json`) into a subdirectory named `service`. Then run `npm install` in the `service` directory in order to get the NPM packages for the service.

Once you move the service to the `service` directory, you can test that the service is still working by running `node index.js` from a console window in the `service` directory, or by pressing `F5` in VS Code. Try it out and make sure you can hit the service endpoints using `curl`.

```sh
➜  curl 'localhost:3000/api/user/joe'

{"msg":"Unknown"}
```

Next, we want to move the existing UI code to a location where Vite expects to find it. To do this we move all of the files out of `public` into the project root directory. This will allow us to run our existing code under Vite to make sure everything is working. Once we start porting over to React, we will convert each of these files to React components located in a directory called `src`. From the root project directory run:

```sh
mv public/* .
rm -r public
```

## Install and configure Vite

Install Vite as a development dependency by running:

```sh
 npm install vite@latest -D
```

Then insert/replace the `scripts` found in `package.json` to include the commands for running Vite.

```json
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "preview": "vite preview"
  }
```

### Configuring Vite for debugging

When running in production, the Simon web service running under Node.js on port 3000 serves up the Simon React application code when the browser requests `index.html`. This is the same as we did with previous Simon deliverables. The service pulls those files from the application's static HTML, CSS, and JavaScript files located in the `public` directory that we set up when we build the production distribution package.

![Setting up React ports](simonProduction.jpg)

However, when the application is running in debug mode in your development environment, we actually need two HTTP servers running: one for the Node.js backend HTTP server, and one for the Vite frontend HTTP server. This allows us to develop and debug both our backend and our frontend while viewing the results in the browser.

By default, Vite uses port 5173 when running in development mode. Vite starts up the debugging HTTP server when we run `npm run dev`. That means the browser is going to send network requests to port 5173. We can configure the Vite HTTP server to proxy service HTTP and WebSocket requests to the Node.js HTTP server by providing a configuration file named `vite.config.js` with the following contents.

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});
```

When running in this configuration, the network requests now flow as shown below. Without this you will not be able to debug your React application in your development environment.

![Setting up React ports](simonDevelopmentDebugging.jpg)

With our server running, and our files in the place where Vite expects them, we can test that everything still works. You can start Vite in dev mode with the command `npm run dev`, followed by pressing the `o` key to open the application in the browser. When you reach this point with your startup, make sure that you commit your changes.

## Convert to React Bootstrap

There is an NPM package called [React Bootstrap](https://react-bootstrap.github.io/) that wraps the Bootstrap CSS framework in React components. This allows you to treat the Bootstrap widgets, such as Button and Modal, as a React component instead of just imported CSS and JavaScript.

To use the React version of Bootstrap, import the NPM package.

```sh
npm install bootstrap react-bootstrap
```

Now, in the components where you want to refer to the Bootstrap styles, you can import the Bootstrap style sheet from the
imported NPM package just like you would other CSS files.

```jsx
import 'bootstrap/dist/css/bootstrap.min.css';
```

To use a React Bootstrap component, you would import and reference the specific component you want to use. Here is an example of using the `Button` component.

```jsx
import Button from 'react-bootstrap/Button';

export function NavButton({ text, url }) {
  const navigate = useNavigate();
  return (
    <Button variant='primary' onClick={() => navigate({ url })}>
      {text}
    </Button>
  );
}
```

For Simon we converted the modal dialog and button implementations to use the React Bootstrap components.

## Enabling React

We now have everything set up to start using React for the application. To make this happen, we need to install the React components for the basic functionality, DOM manipulation, and request routing to display individual components. React is installed by running the following console command:

```sh
npm install react react-dom react-router-dom
```

### `index.html` and `index.jsx`

With React we have a single HTML file that dynamically loads all of the other application components into its DOM using JavaScript. We replace the existing `index.html` file with the following React version.

**`index.html`**

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="/favicon.ico" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <title>Simon React</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
  </body>
</html>
```

Notice that the div with an ID of `root` is where all the content will be injected. The script reference for `index.jsx` causes the injection of the top level component named `App`. To hook the `index.html` to our top level `App` component, we create the following `index.jsx` file.

**`index.jsx`**

```jsx
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './src/app';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

## Create App component

To begin the transformation to using React components in our application, we create a top-level component, stored in `src/app.jsx`, and add some placeholder content that will get replaced later. In order for the styling to show up, we include Bootstrap, move the `main.css` content into a file named `src/app.css`, and import the CSS file into the `app.jsx` file. Because we don't have a `body` element in our `App` component, we modify the `app.css` so that the selector for the `body` element is changed to a class selector `.body`.

**app.jsx**

```jsx
import React from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import './app.css';

export default function App() {
  return <div className='body bg-dark text-light'>App will display here</div>;
}
```

You should be able to view the results of these changes by running `npm run dev` from the console and pressing the `o` key to open it in the browser. The result won't be very exciting, but this successfully demonstrates the first visible step towards moving to React. When you reach this point with your startup, make sure that you commit your changes.

![First React component](firstReactComponent.png)

To make `app.jsx` represent the actual Simon content, we enhance the `app.jsx` file to contain the header and footer HTML found in each of our previous HTML files, into the return value for the `App()` component function. Next, we rename the `class` attribute to be `className` so that it doesn't conflict with the JavaScript `class` keyword. The `className` keyword will get transpiled to valid HTML by our toolchain. When completed, the `App` component should look like this:

**app.jsx**

```jsx
export default function App() {
  return (
    <div className='body bg-dark text-light'>
      <header className='container-fluid'>
        <nav className='navbar fixed-top navbar-dark'>
          <div className='navbar-brand'>
            Simon<sup>&reg;</sup>
          </div>
          <menu className='navbar-nav'>
            <li className='nav-item'>
              <a className='nav-link' href='index.html'>
                Home
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='play.html'>
                Play
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='scores.html'>
                Scores
              </a>
            </li>
            <li className='nav-item'>
              <a className='nav-link' href='about.html'>
                About
              </a>
            </li>
          </menu>
        </nav>
      </header>

      <main>App components go here</main>

      <footer className='bg-dark text-white-50'>
        <div className='container-fluid'>
          <span className='text-reset'>Author Name(s)</span>
          <a className='text-reset' href='https://github.com/webprogramming260/simon-react'>
            Source
          </a>
        </div>
      </footer>
    </div>
  );
}
```

This will display the header, navigation elements, placeholder content, and the footer. When you reach this point with your startup, make sure that you commit your changes.

![App React component](appReactComponent.png)

## Create view components

We now create React component files `login.jsx`, `play.jsx`, `scores.jsx`, and `about.jsx` to represent each of the application views. To begin with, these are just stubs that we will populate as we move functionality from the old `js` files into the `jsx` components. We place each of the stubbed components in a separate directory (e.g. `src/login/login.jsx`) so that we can keep all of the component files together.

Here is the `login.jsx` stub before any code is converted over. The other components are similar.

```jsx
import React from 'react';

export function Login() {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>login displayed here</div>
    </main>
  );
}
```

## Create the router

With `app.jsx` containing the header and footer, and all the application view component stubs created, we can now create the router that will display each component as the navigation UI requests it. The router controls the whole application by determining what component to display based upon what navigation the user chooses. To implement the router, we import the router component into the `App` component, and wrap all of the `App` component's elements with the `BrowserRouter` component. We also import all of our view components.

```jsx
import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
import { Login } from './login/login';
import { Play } from './play/play';
import { Scores } from './scores/scores';
import { About } from './about/about';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <div className='body bg-dark text-light'><!-- sub-elements here --></div>
  </BrowserRouter>
);
```

### Navigating routes

We then we replace the `a` elements with the router's `NavLink` component. The anchor element's `href` attribute is replaced with the router's `to` attribute. The `NavLink` component prevents the browser's default navigation functionality and instead handles it by replacing the currently displayed component.

```jsx
<a className="nav-link" href="play.html">Play</a>

// to

<NavLink className='nav-link' to='play'>Play</NavLink>
```

The `nav` element's code now looks like the following.

```jsx
<nav className='navbar fixed-top navbar-dark'>
  <div className='navbar-brand'>
    Simon<sup>&reg;</sup>
  </div>
  <menu className='navbar-nav'>
    <li className='nav-item'>
      <NavLink className='nav-link' to=''>
        Login
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='play'>
        Play
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='scores'>
        Scores
      </NavLink>
    </li>
    <li className='nav-item'>
      <NavLink className='nav-link' to='about'>
        About
      </NavLink>
    </li>
  </menu>
</nav>
```
### Injecting the routed component

The router definitions are then inserted so that the router knows what component to display for a given path. The router changes the rendered component; it appears in the place of the `Routes` element. The `Routes` element replaces the `main` element in the component HTML.

```jsx
 <main>App components go here</main>

 // to

<Routes>
  <Route path='/' element={<Login />} exact />
  <Route path='/play' element={<Play />} />
  <Route path='/scores' element={<Scores />} />
  <Route path='/about' element={<About />} />
  <Route path='*' element={<NotFound />} />
</Routes>
```

Notice that the `*` (default matcher) was added to handle the case where an unknown path is requested. We handle this by creating a component for a path that is not found. We place this component at the bottom of our `src/app.jsx` file.

```js
function NotFound() {
  return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
}
```

At this point the application should support navigating to the different components. When you reach this point with your startup, make sure that you commit your changes.

![Routing](routingComponents.gif)

## Converting to React components

The code for each of the HTML pages needs to now be converted to the different React components. Each of the components is a bit different, and so you want to review them to determine what they look like as a React component.

The basic steps for converting the component include the following.

- Copy the `main` element HTML over and put it in the return value of the component. Don't copy the header and footer HTML since they are now represented in `app.jsx`.
- Rename the `class` to `className` so that it doesn't conflict with the JavaScript keyword `class`.
- Copy the JavaScript over and turn the functions into inner functions of the React component.
- Move the CSS over to the component directory and use an `import` statement to bring it into the component's `jsx` file.
- Create React state variables for each of the stateful objects in the component.
- Replace DOM query selectors with React state variables.
- Move state up to parent components as necessary. For example, authentication state, or user name state.
- Create child components as necessary. For example, a `SimonGame` and `SimonButton` component.

In order for you to have a feel for how this is done we will demonstrate how this is done with the `Scores` component.

## Convert `Scores` component

The first step to implementing the `Scores` component is to create a state variable that will represent the scores that we read from the server. We will update the scores as a side effect when our `fetch` request to get the scores asynchronously completes. This is done with the following code:

```jsx
const [scores, setScores] = React.useState([]);

React.useEffect(() => {
  fetch('/api/scores')
    .then((response) => response.json())
    .then((scores) => {
      setScores(scores);
      localStorage.setItem('scores', JSON.stringify(scores));
    })
    .catch(() => {
      const scoresText = localStorage.getItem('scores');
      if (scoresText) {
        setScores(JSON.parse(scoresText));
      }
    });
}, []);
```

When we get the scores back from the backend server, we want to convert them to JSX. This is done by iterating through the scores and pushing them into a variable named `scoreRows` that represents an array of JSX elements for each high score.

```jsx
const scoreRows = [];
if (scores.length) {
  for (const [i, score] of scores.entries()) {
    scoreRows.push(
      <tr key={i}>
        <td>{i}</td>
        <td>{score.name.split('@')[0]}</td>
        <td>{score.score}</td>
        <td>{score.date}</td>
      </tr>
    );
  }
} else {
  scoreRows.push(
    <tr key='0'>
      <td colSpan='4'>Be the first to score</td>
    </tr>
  );
}
```

Now we can bring over the `main` element from the existing `scores.html` file to the `src/scores/scores.jsx` file and place it as the return value from the component function. Next, we insert a reference to the `scoreRows` variable that will display the score JSX. That should look like the following:

```jsx
return (
  <main className='container-fluid bg-secondary text-center'>
    <table className='table table-warning table-striped-columns'>
      <thead className='table-dark'>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Score</th>
          <th>Date</th>
        </tr>
      </thead>
      <tbody id='scores'>{scoreRows}</tbody>
    </table>
  </main>
);
```

That completes the conversion of the HTML and JavaScript files that represent the scores functionality. You can safely delete the original `scores.html` and `scores.js` files.

Now we just need to move `scores.css` to `src/scores/scores.css` and import the CSS into the `src/scores/scores.jsx`.

```jsx
import './scores.css';
```

With that all done, the scores should render nicely. You can follow a similar process to convert the other three application views to components.

![Scores component](scoresComponent.png)

## Test as you go

That was a lot of changes and it is easy to make a mistake during the process. When you do this with your startup application, you will find it easier if you make a small change, and test that it still works. If it does, commit that change to Git. That way you can recover when things get broken before it gets out of hand.

## Study this code

Get familiar with what the example code teaches.

- Clone the repository to your development environment.

  ```sh
  git clone https://github.com/webprogramming260/simon-react.git
  ```

- Set up your Atlas credentials in a file named `dbConfig.json` that is in the same directory as `database.js`.
- Add `dbConfig.json` to your `.gitignore` file so that it doesn't put your credentials into GitHub accidentally.
- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it from a VS Code debug session. ⚠ Do not use the `live server` extension since your frontend code will now be served up by the Node.js server you created in `index.js`. Set breakpoints in your backend code inside of Visual Studio.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using a copy of the `deployReact.sh` script found in the [example class application](https://github.com/webprogramming260/simon-react/blob/main/deployReact.sh). Take some time to understand how it works.

  ⚠ **NOTE** - The `deployReact.sh` deployment script is different from the previous scripts and depends upon the `vite` package to be installed so that it can execute the toolchain that bundles the React application into static files that the browser can render. The bundled files are then deployed to your production environment and served up using the Express static files middleware.

  ```sh
  ./deployReact.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployReact.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

- Update your `startup` repository `notes.md` with what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
