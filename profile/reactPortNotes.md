# CRA

- `npx create-react-app template-react`
- clean up template-react
  1.  `npm uninstall @testing-library/jest-dom @testing-library/react @testing-library/user-event web-vitals`
  1.  Delete the unnecessary create-react-app files (e.g. images)
  1.  Rename `js` JSX files have `jsx` extension
  1.  Replace the `favicon.ico` with the Simon icon
  1.  Update `manifest.json` to represent Simon
  1.  Clean up the `index.html` file to have the proper fields for Simon
- Test that it runs `npm start`

# Simon prep

```
git clone https://github.com/webprogramming260/simon-websocket.git simon
```

- create service dir
- move service code
- move public to old-public
- npm install
- test with curl `curl localhost:3000/api/user/test`

# Copy over React template

- Copy src, public, package.json
- npm install
- test: `npm start`

# Install bootstrap react components

- npm install bootstrap react-bootstrap

# Convert app

- paste app code with header and footer
  - pull from play.html
  - `import './App.css';`
  - `import 'bootstrap/dist/css/bootstrap.min.css';`
  - rename body to div
  - add .body class to top div
  - delete main code and replace with Placeholder text
  - rename class to className
  - change logo at top from `a` to just be a `div`

# Create a placeholder for components

- login.jsx, play.jsx, scores.jsx, and about.jsx

  ```js
  import React from 'react';

  export function Login() {
    return (
      <main className='container-fluid bg-secondary text-center'>
        <div>login displayed here</div>
      </main>
    );
  }
  ```

- import them into app.js

  ```js
  import { Login } from './login/login';
  import { Play } from './play/play';
  import { Scores } from './scores/scores';
  import { About } from './about/about';
  ```

- Use one of the components in place of the placeholder.

# Create the router

- `npm install react-router-dom `
- import needed components
  ```
  import { NavLink, Route, Routes } from 'react-router-dom';
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
- Test that links work

- Add routes
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

# Copy scores component

- Copy over HTML
- CSS `import './scores.css';`
- Copy over JavaScript
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
- useEffect to get the scores from Back end
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

# Debug in dev environment

- Stop react app
- Start service running on 3000

- Create ./env.local

```
PORT=3001
```

- Add service proxy to ./package.json

```
  "proxy": "http://localhost:3000"
```

## Implement About component

- Copy css from old-public into about/about.css
- Copy html into about component from old-public/about.html

  ```js
  <main class='container-fluid bg-secondary text-center'>
    <div>
      <div id='picture' class='picture-box'></div>

      <p>
        Simon is a repetitive memory game where you follow the demonstrated color sequence until you make a mistake. The
        longer the sequence you repeat, the greater your score.
      </p>

      <p>
        The name Simon is a registered trademark of Milton-Bradley. Our use of the name and the game is for non-profit
        educational use only. No part of this code or program should be used outside of that definition.
      </p>

      <div id='quote' class='quote-box bg-light text-dark'></div>
    </div>
  </main>
  ```

- Test that it works
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

  - Test it works

# Make menus reactive to the auth state

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

- modify the App.jsx to load the state for auth and the user name
- import { AuthState } from './login/authState';
- Create auth state by querying server

  ```js
  const [userName, setUserName] = React.useState(localStorage.getItem('userName') || '');

  const [authState, setAuthState] = React.useState(AuthState.Unknown);
  React.useEffect(() => {
    if (userName) {
      fetch(`/api/user/${userName}`)
        .then((response) => {
          if (response.status === 200) {
            return response.json();
          }
        })
        .then((user) => {
          const state = user?.authenticated ? AuthState.Authenticated : AuthState.Unauthenticated;
          setAuthState(state);
        });
    } else {
      setAuthState(AuthState.Unauthenticated);
    }
  }, [userName]);
  ```

- add use of authState

  ```jsx
  {
    authState === AuthState.Authenticated && (
      <li className='nav-item'>
        <a className='nav-link' href='play.html'>
          Play
        </a>
      </li>
    );
  }
  ```

- in App.jsx
- Add passing params to routes
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

- Create authenticated.jsx

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

- Create authenticated.css

```css
.playerName {
  color: rgb(118, 190, 210);
  font-size: 1.5em;
  padding: 0.5em;
}
```

- Create unauthenticated.jsx

```js
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

- Create messageDialog.jsx

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

- Create login.jsx

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

# Copy play component

- Note the websocket dev hack in gameNotifier.js

```js
let port = window.location.port;
if (process.env.NODE_ENV !== 'production') {
  port = 3000;
}
```

# Delete old-source directory
