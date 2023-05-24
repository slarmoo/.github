# Start with Simon-websocket

```
git clone https://github.com/webprogramming260/simon-websocket.git simon
```

- Copy `deployReact.sh` from simon-react repo.
- Add `/build` and `/dist` to `.gitignore`

# Setup service backend as a subdirectory

- create service dir
- move service code to new service dir (database.js, index.js, peerProxy.js, package.json, package-lock.json)
- `cd service && npm install`
- Copy or create `dbConfig.js` with the database credentials.
- start up service `node index.js` or F5 in VS Code.
- test with curl `curl localhost:3000/api/user/test`

# Install and configure Vite

- Create `package.json` settings for application
  ```json
  {
    "name": "simon-react",
    "version": "0.1.0",
    "private": true,
    "scripts": {
      "dev": "vite",
      "build": "vite build",
      "preview": "vite preview"
    }
  }
  ```
- Install Vite as a development dependency: `npm install vite@latest -D`

- Create the Vite configuration file (`vite.config.js`) so that when debugging Vite will proxy service HTTP and WebSocket requests.

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

# Move frontend files to the directories that Vite expects

- `mv public/* .`
- `rm -r public`
- Start up the Vite debug HTTP server: `npm run dev`
- Test the app. Make sure API and WebSocket requests work.

# Set up React

- `npm install react react-dom react-router-dom`
- Rename `index.html` to `login.html`
- Create an App placeholder components in a `src/app.jsx` directory
  ```jsx
  export function App() {
    return <div>Simon</div>;
  }
  ```
- Create the `index.html` React version of the homepage.

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

- Create the `index.jsx`

  ```jsx
  import React from 'react';
  import ReactDOM from 'react-dom/client';
  import App from './src/app';

  const root = ReactDOM.createRoot(document.getElementById('root'));
  root.render(<App />);
  ```

- Make a `src` directory to hold all of our react components.

- Create placeholders in the `src` directory for each of the major components. Make a subdirectory for each component and a JSX file. For each JSX file make a simple component that displays the components name. An example component is given below.

  ```txt
  \src
    app.jsx
    .\about
      about.jsx
    .\play
      play.jsx
    .\scores
      scores.jsx
    .\login
      login.jsx
  ```

  ```jsx
  import React from 'react';

  export function Login() {
    return <main className='container-fluid bg-secondary text-center'>Login</main>;
  }
  ```

- Create a placeholder `src/app.jsx` in `src` directory. This is loaded from `index.jsx`. Display each of of the view components to make sure they all load properly.

  ```jsx
  import React from 'react';
  import { Login } from './login/login';
  import { Play } from './play/play';
  import { Scores } from './scores/scores';
  import { About } from './about/about';

  export function App() {
    return (
      <div>
        <h1>Simon</h1>
        <Login />
        <Play />
        <Scores />
        <About />
      </div>
    );
  }
  ```

- Move the `assets` dir to `public`. Observe that the favicon shows up. When the bundler runs with will put all these files in the root of the dist directory. If you run `npm run build` you will see the resulting directory structure.
- Rename `sound1-4.mp3` to `button-bottom/top-left/right.mp3`
- Move favicon.ico to `public`
- View the result in the browser and make sure everything is displayed.

# Install bootstrap react components

We want to be able to use BootStrap both as a CSS library and as React components. This is done by installing the following packages.

- `npm install bootstrap react-bootstrap`

# Populate app.jsx with header and footer

- Copy main.css to src/app.css
  - `import './app.css';`
  - `import 'bootstrap/dist/css/bootstrap.min.css';`
- Copy body element with header and footer from play.html
  - rename body to div
  - add `body` class to the newly created top div. Modify the app.css to change `body` to select `.body` instead.
  - delete main code and replace with Placeholder text from previous changes to `app.jsx`
  - rename class to className so that JSX doesn't conflict with HTML keywords
  - change logo at top from `a` to just be a `div`

# Create the router

- `npm install react-router-dom`
- import needed components to `app.jsx`
  ```jsx
  import { BrowserRouter, NavLink, Route, Routes } from 'react-router-dom';
  ```
- Wrap the app component with `<BrowserRouter>`
- Rename links

  ```js
  <a className='nav-link' href='play.html'>
    Play
  </a>

  // to

  <NavLink className='nav-link' to='play'>Play</NavLink>
  ```

- Remove `active` class name from play link

- Add routes in place of the exiting main element
  ```jsx
  <Routes>
    <Route path='/' element={<Login />} exact />
    <Route path='/play' element={<Play />} />
    <Route path='/scores' element={<Scores />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
  ```
- add not found component

  ```js
  function NotFound() {
    return <main className='container-fluid bg-secondary text-center'>404: Return to sender. Address unknown.</main>;
  }
  ```

- test that links work

# Port Scores component

- Move the scores.css to `src/scores/scores.css`
- Copy over `main` element HTML to the component and delete the scores.html
- Rename class to className
- CSS `import './scores.css';`
- Copy over JavaScript to the component and delete scores.js
- useState to keep our scores: `const [scores, setScores] = React.useState([]);`
- This is then injected into the JSX
  ```js
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
- useEffect to get the scores from backend
  ```js
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
- loading of scores into variable `scores` for rendering

  ```js
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

  - Delete `login.html` and `login.js`.

## Port About component

- Move the about.css to `src/about/about.css`
- Copy over `main` element HTML to the component
- Rename class to className
- Add `import './about.css';` to the component.
- Test that it works

- Copy over JavaScript from `about.js` to the component
- Talk about how the old code had global functions that would load the data.
- Create state for each data object.

  ```jsx
  const [imageUrl, setImageUrl] = React.useState('');
  const [quote, setQuote] = React.useState('Loading...');
  const [quoteAuthor, setQuoteAuthor] = React.useState('unknown');
  ```

- Use `useEffect` to load the external resource data.

  ```js
  React.useEffect(() => {
    const random = Math.floor(Math.random() * 1000);
    fetch(`https://picsum.photos/v2/list?page=${random}&limit=1`)
      .then((response) => response.json())
      .then((data) => {
        const containerEl = document.querySelector('#picture');

        const width = containerEl.offsetWidth;
        const height = containerEl.offsetHeight;
        const apiUrl = `https://picsum.photos/id/${data[0].id}/${width}/${height}?grayscale`;
        setImageUrl(apiUrl);
      })
      .catch();

    fetch('https://api.quotable.io/random')
      .then((response) => response.json())
      .then((data) => {
        setQuote(data.content);
        setQuoteAuthor(data.author);
      })
      .catch();
  }, []);
  ```

- Create an image element that will be created if we have an image URL

  ```js
  let imgEl = '';

  if (imageUrl) {
    imgEl = <img src={imageUrl} alt='stock background' />;
  }
  ```

- Insert the stage variables in to the HTML

  ```jsx
  <main className='container-fluid bg-secondary text-center'>
    <div>
      <div id='picture' className='picture-box'>
        {imgEl}
      </div>

      <div className='quote-box bg-light text-dark'>
        <p className='quote'>{quote}</p>
        <p className='author'>{quoteAuthor}</p>
      </div>
    </div>
  </main>
  ```

  - Delete the `about.js` and `about.html` files
  - Test it works

# Port Login component

This creates components for the login functionality from the navigation code found in `index.html` and `login.js`. To start with we create a class that represents the user's current authentication state. We then create a Login component that renders a different child component based on if the user is authenticated or not.

- Create login/authState.js

  ```js
  export class AuthState {
    static Unknown = new AuthState('unknown');
    static Authenticated = new AuthState('authenticated');
    static Unauthenticated = new AuthState('unauthenticated');

    constructor(name) {
      this.name = name;
    }
  }
  ```

- Create `src/login/messageDialog.jsx`. This factors out the ability to show an error dialog for when things go wrong with authentication.

```js
import React from 'react';

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export function MessageDialog(props) {
  return (
    <Modal {...props} show={props.message} centered>
      <Modal.Body>{props.message}</Modal.Body>
      <Modal.Footer>
        <Button onClick={props.onHide}>Close</Button>
      </Modal.Footer>
    </Modal>
  );
}
```

- modify the App.jsx to load the state for auth and the user name
- `import { AuthState } from './login/authState'`;
- Set the authState with the localStorage value, and pass it into the components.

  ```js
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');
  const currentAuthState = userName ? AuthState.Authenticated : AuthState.Unauthenticated;
  const [authState, setAuthState] = React.useState(currentAuthState);
  ```

- add use of authState for enabling links

  ```jsx
  {
    authState === AuthState.Authenticated && (
      <li className='nav-item'>
        <NavLink className='nav-link' to='play'>
          Play
        </NavLink>
      </li>
    );
  }
  {
    authState === AuthState.Authenticated && (
      <li className='nav-item'>
        <NavLink className='nav-link' to='scores'>
          Scores
        </NavLink>
      </li>
    );
  }
  ```

- Add passing of auth params to routes.
- Also pass the userName to the play component while we are here.
  ```jsx
  <Routes>
    <Route
      path='/'
      element={
        <Login
          userName={userName}
          authState={authState}
          onAuthChange={(userName, authState) => {
            setAuthState(authState);
            setUserName(userName);
          }}
        />
      }
      exact
    />
    <Route path='/play' element={<Play userName={userName} />} />
    <Route path='/scores' element={<Scores />} />
    <Route path='/about' element={<About />} />
    <Route path='*' element={<NotFound />} />
  </Routes>
  ```

# Implement Login components

- Move `login.css` to `src/login/authenticated.css`

```css
.playerName {
  color: rgb(118, 190, 210);
  font-size: 1.5em;
  padding: 0.5em;
}
```

- Create `src/login/authenticated.jsx`. This factors out the code found in `login.js` to just be the navigation to play and the logout UI.

```js
import React from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/Button';

import './authenticated.css';

export function Authenticated(props) {
  const navigate = useNavigate();

  function logout() {
    fetch(`/api/auth/logout`, {
      method: 'delete',
    }).then(() => props.onLogout());
  }

  return (
    <div>
      <div className='playerName'>{props.userName}</div>
      <Button variant='primary' onClick={() => navigate('/play')}>
        Play
      </Button>
      <Button variant='secondary' onClick={() => logout()}>
        Logout
      </Button>
    </div>
  );
}
```

- Create `src/login/unauthenticated.jsx`. This factors out the code found in `login.js` to just be the login and create user functionality.

```js
import React from 'react';
import { useState } from 'react';
import Button from 'react-bootstrap/Button';
import { MessageDialog } from './messageDialog';

export function Unauthenticated(props) {
  const [userName, setUserName] = useState(props.userName);
  const [password, setPassword] = useState('');
  const [displayError, setDisplayError] = useState(null);

  async function loginUser() {
    loginOrCreate(`/api/auth/login`);
  }

  async function createUser() {
    loginOrCreate(`/api/auth/create`);
  }

  async function loginOrCreate(endpoint) {
    const response = await fetch(endpoint, {
      method: 'post',
      body: JSON.stringify({ email: userName, password: password }),
      headers: {
        'Content-type': 'application/json; charset=UTF-8',
      },
    });
    if (response?.status === 200) {
      localStorage.setItem('userName', userName);
      props.onLogin(userName);
    } else {
      const body = await response.json();
      setDisplayError(`⚠ Error: ${body.msg}`);
    }
  }

  return (
    <>
      <div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>@</span>
          <input
            className='form-control'
            type='text'
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            placeholder='your@email.com'
          />
        </div>
        <div className='input-group mb-3'>
          <span className='input-group-text'>🔒</span>
          <input
            className='form-control'
            type='password'
            onChange={(e) => setPassword(e.target.value)}
            placeholder='password'
          />
        </div>
        <Button variant='primary' onClick={() => loginUser()}>
          Login
        </Button>
        <Button variant='secondary' onClick={() => createUser()}>
          Create
        </Button>
      </div>

      <MessageDialog message={displayError} onHide={() => setDisplayError(null)} />
    </>
  );
}
```

- Create `src/login/login.jsx`. This controls the login of whether we display the Authenticated or Unauthenticated components.

```js
import React from 'react';

import { Unauthenticated } from './unauthenticated';
import { Authenticated } from './authenticated';
import { AuthState } from './authState';

export function Login({ userName, authState, onAuthChange }) {
  return (
    <main className='container-fluid bg-secondary text-center'>
      <div>
        {authState !== AuthState.Unknown && <h1>Welcome to Simon</h1>}
        {authState === AuthState.Authenticated && (
          <Authenticated userName={userName} onLogout={() => onAuthChange(userName, AuthState.Unauthenticated)} />
        )}
        {authState === AuthState.Unauthenticated && (
          <Unauthenticated
            userName={userName}
            onLogin={(loginUserName) => {
              onAuthChange(loginUserName, AuthState.Authenticated);
            }}
          />
        )}
      </div>
    </main>
  );
}
```

# Port play component

The play components consists of a top level `Play` component that has `Players` and `SimonGame` child components.

- Create `play/play.jsx

  ```jsx
  import React from 'react';

  import { Players } from './players';
  import { SimonGame } from './simonGame';

  export function Play(props) {
    return (
      <main className='bg-secondary'>
        <Players userName={props.userName} />
        <SimonGame userName={props.userName} />
      </main>
    );
  }
  ```

- Break `play.css` up into a `src/play/players.css` and `src/play/simonGame.css`.
- Make sure `.count` goes in `simonGame.css` and then create these new selectors:

  ```css
  #count {
    color: rgb(246, 239, 158);
  }

  .game-button {
    filter: brightness(50%);
  }
  .light-on {
    filter: brightness(100%);
  }
  ```

- the game-name selectors are also different:

  ```css
  .game-name {
    font-size: 2em;
    font-weight: normal;
    margin-bottom: 0.5em;
  }

  .game-name sup {
    font-weight: 100;
  }
  ```

- players.css gets a bunch of new margin declarations.

  ```css
  .players {
    flex: 1;
    width: 100%;
    padding: 0.5em;
  }

  .player-name {
    color: rgb(118, 190, 210);
    margin: 0 0.25em;
  }

  #player-messages {
    padding-top: 0.25em;
    opacity: 0.7;
  }

  .event {
    color: rgb(69, 69, 69);
  }

  .player-event {
    color: rgb(165, 220, 235);
    margin: 0 0.25em;
  }

  .system-event {
    color: rgb(221, 148, 40);
    margin: 0 0.25em;
  }
  ```

- Delete `play.css`

- Move the WebSocket code from `play.js` into a file name `src/play/gameNotifier.js`.

- Break `play.html` and `play.jsx` into `src/play/players.jsx`, `src/play/simonGame.jsx`, `src/play/simonButton.jsx`, and `src/play/delay.js`.
- Delete `play.html` and `play.jsx`.
