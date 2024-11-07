# Simon Service

![Simon](../simon.png)

This deliverable demonstrates adding a backend web service that serves up the frontend, handles HTTP endpoint requests, and stores information in memory on the server. The web service provides endpoints for getting and updating the scores. The application also uses a couple third party endpoints to display inspirational quotes on the about page and show a random header image.

We will use Node.js and Express to create our HTTP service.

You can view this application running here: [Example Simon Service](https://simon-service.cs260.click)

![Simon Service](simonService.jpg)

## Service endpoint definitions

Here is our design, documented using `curl` commands, for the endpoints that the Simon web service provides. Note that the auth endpoints are using authorization tokens in the HTTP body. During the Login deliverable we will change this over to use HTTP cookies.

**CreateAuth** - Create a new user.

```sh
curl -X POST $host/api/auth/create -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}'

# Response 200
{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}
```

**GetAuth** - Login an existing user.

```sh
curl -X POST $host/api/auth/login -H 'Content-Type: application/json' -d '{"email":"s@byu.edu", "password":"byu"}'

# Response 200
{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}
```

**DeleteAuth** - Logout a user

```sh
curl -v -X DELETE $host/api/auth/logout -
H 'Content-Type: application/json' -d '{"token":"6b2ab581-05ca-4df0-8897-5671e7febdd8"}'

# Response 204
```

**GetScores** - Get the latest high scores.

```sh
curl $host/api/scores

# Response
{ "scores":[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]}
```

**SubmitScore** - Submit a score for consideration in the list of high scores.

```sh
curl -X POST $host/api/score  -H 'Content-Type: application/json' -d '{"name":"Harvey", "score":"337", "date":"2022/11/20"}'

# Response
[
  {"name":"Harvey", "score":"337", "date":"2022/11/20"},
  {"name":"도윤 이", "score":"95", "date":"2019/05/20"}
]
```

## Steps to add the backend service

We create our service with a new directory in the root of the project named `service`. To initialize the service code we open up a command console window and setup the NPM project and install **Express**.

```sh
mkdir service && cd service
npm init -y
npm install express
```

In that directory create a file named `index.js` in the root of the project. This is the entry point that **node.js** will call when you run your web service.

Add the basic Express JavaScript code needed to make a service.

```js
const express = require('express');
const app = express();

const port = process.argv.length > 2 ? process.argv[2] : 3000;

app.get('*', (_req, res) => {
  res.send({ msg: 'Simon service' });
});

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
```

Now we can run the application with `node index.js` and hit the service with Curl.

```sh
node index.js &
curl localhost:3000

{"msg":"Simon service"}

# use fg to foreground and kill the process
```

### Add the endpoints

Now that we have the service up and running, we want to add the Simon backend service endpoints. To support our endpoints we do the following:

1. **Install UUID**. The service represents its tokens with a universally unique ID (UUID) and so we need to import that NPM package using `npm install uuid` and then import it into the code.

   ```js
   const uuid = require('uuid');
   ```

1. **Parse JSON**. All of our endpoints use JSON and so we want Express to automatically parse that for us.

   ```js
   app.use(express.json());
   ```

1. **Create the memory data structures**. Add data structures for both the users and the scores. That means whenever the service is restarted the users and scores will be lost. When we introduce the database in a later deliverable, the data will be persistent there.

   ```js
   let users = {};
   let scores = [];
   ```

1. **Set up a router path for the endpoints**. We want all of our endpoints to have a path prefix of `/api` so that we can distinguish them from requests to load the front end files. This is done with a `express.Router` call.

   ```js
   var apiRouter = express.Router();
   app.use(`/api`, apiRouter);
   ```

1. **Delete the placeholder endpoint**. Delete the placeholder endpoint `app.get('*' ...` that we created to demonstrate that the service was working.

1. **Add the service endpoints**. Add all of the code for the different Simon endpoints.

   ```js
   // CreateAuth a new user
   apiRouter.post('/auth/create', async (req, res) => {
     const user = users[req.body.email];
     if (user) {
       res.status(409).send({ msg: 'Existing user' });
     } else {
       const user = { email: req.body.email, password: req.body.password, token: uuid.v4() };
       users[user.email] = user;

       res.send({ token: user.token });
     }
   });

   // GetAuth login an existing user
   apiRouter.post('/auth/login', async (req, res) => {
     const user = users[req.body.email];
     if (user) {
       if (req.body.password === user.password) {
         user.token = uuid.v4();
         res.send({ token: user.token });
         return;
       }
     }
     res.status(401).send({ msg: 'Unauthorized' });
   });

   // DeleteAuth logout a user
   apiRouter.delete('/auth/logout', (req, res) => {
     const user = Object.values(users).find((u) => u.token === req.body.token);
     if (user) {
       delete user.token;
     }
     res.status(204).end();
   });

   // GetScores
   apiRouter.get('/scores', (_req, res) => {
     res.send(scores);
   });

   // SubmitScore
   apiRouter.post('/score', (req, res) => {
     scores = updateScores(req.body, scores);
     res.send(scores);
   });

   // updateScores considers a new score for inclusion in the high scores.
   function updateScores(newScore, scores) {
     let found = false;
     for (const [i, prevScore] of scores.entries()) {
       if (newScore.score > prevScore.score) {
         scores.splice(i, 0, newScore);
         found = true;
         break;
       }
     }

     if (!found) {
       scores.push(newScore);
     }

     if (scores.length > 10) {
       scores.length = 10;
     }

     return scores;
   }
   ```

Now we can start the service up by pressing `F5` inside of VS code and then open a command console window to execute some Curl commands.

```sh
host=http://localhost:3000

curl -X POST $host/api/score  -H 'Content-Type: application/json' -d '{"name":"Harvey", "score":"337", "date":"2022/11/20"}'

curl $host/api/scores
```

### Serving the frontend static file

In addition to serving up endpoints, we also the Simon service to serve the static files generated when we bundled the React frontend. Our endpoints will be service on the `/api` path and everything else will look in the `public` directory of the service. If it finds a match, for `index.html` for example, then that file is returned.

![Simon service](simonProduction.jpg)

To make this happen, we only need to add the Express middleware to serve static files from the the `public` directory.

```js
app.use(express.static('public'));
```

However, we don't have a `public` directory with the frontend files in it. This will happen when we deploy to our web server in AWS. For now, you can test that it is working by creating a simple index.html file in the `service/public` directory and then requesting it with curl. Once you have done this delete the test `service/public` directory so that we don't leave any cruft around.

### Configuring Vite for debugging

When running in production, the Simon web service running under Node.js on port 3000 serves up the bundled Simon React application code when the browser requests `index.html`. The service pulls those files from the application's static HTML, CSS, and JavaScript files located in the `public` directory as described above.

However, when the application is running in debug mode in your development environment, we actually need two HTTP servers running: one for the Node.js backend HTTP server, and one for the Vite frontend HTTP server. This allows us to develop and debug both our backend and our frontend while viewing the results in the browser.

By default, Vite uses port 5173 when running in development mode. Vite starts up the debugging HTTP server when we run `npm run dev`. That means the browser is going to send network requests to port 5173. We can configure the Vite HTTP server to proxy service HTTP and WebSocket requests to the Node.js HTTP server by creating a configuration file named `vite.config.js` in the root of the project with the following contents.

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/api': 'http://localhost:3000',
    },
  },
});
```

When running in this configuration, the network requests now flow as shown below. Without this you will not be able to debug your React application in your development environment.

![Setting up React ports](simonDevelopmentDebugging.jpg)

With the backend service running, and our files in the place where Vite expects them, we can test that everything still works. You can start Vite in dev mode with the command `npm run dev`, followed by pressing the `o` key to open the application in the browser. When you reach this point with your startup, make sure that you commit your changes.

## Frontend changes

Now that we have the service endpoints all set up we need to call them from the frontend code. This happens when we want to save and retrieve scores, as well as when we want to register or login a user.

### Saving scores

The `play/simonGame.jsx` file is modified to store scores by making a fetch request to the Simon service.

```jsx
async function saveScore(score) {
  const date = new Date().toLocaleDateString();
  const newScore = { name: userName, score: score, date: date };

  await fetch('/api/score', {
    method: 'POST',
    headers: { 'content-type': 'application/json' },
    body: JSON.stringify(newScore),
  });

  // Let other players know the game has concluded
  GameNotifier.broadcastEvent(userName, GameEvent.End, newScore);
}
```

The scores are loaded in `scores/scores.jxs` where we use a React useEffect hook to reactively display the scores once they are loaded from the service.

```jsx
React.useEffect(() => {
  fetch('/api/scores')
    .then((response) => response.json())
    .then((scores) => {
      setScores(scores);
    });
}, []);
```

Now you can shutdown the frontend and restart it without losing your scoring data.

### Registering and logging in users

We follow a similar process for handling users. This is done by altering `login/unauthenticated.jsx` to contain code that handles register and login requests.

```jsx
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
```

Likewise, `login/authenticated.jsx` is altered to handle the logout event.

```jsx
function logout() {
  fetch(`/api/auth/logout`, {
    method: 'delete',
  })
    .catch(() => {
      // Logout failed. Assuming offline
    })
    .finally(() => {
      localStorage.removeItem('userName');
      props.onLogout();
    });
}
```

### Remove localstorage usage

Since we now persist scores in the service we no longer need to persistent them in local storage. We can remove that code from both `simonGame.jsx` and `scores.jsx`.

## Third party endpoints

The `about.jsx` file contains code for making calls to third party endpoints using `fetch`. The requests are triggered by the React useEffect hook. We make one call to `picsum.photos` to get a random picture and another to `quote.cs260.click` to get a random quote. Once the endpoint asynchronously returns, the React state variables are updated. Here is an example of the quote endpoint call.

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

  fetch('https://quote.cs260.click')
    .then((response) => response.json())
    .then((data) => {
      setQuote(data.quote);
      setQuoteAuthor(data.author);
    })
    .catch();
}, []);
```

## Study this code

Get familiar with what the example code teaches.

- Clone the repository to your development environment.

  ```sh
  git clone https://github.com/webprogramming260/simon-service.git
  ```

- Review the code and get comfortable with everything it represents.
- Debug the backend code by launching it with a VS Code debug session.
- Debug the frontend code by launching it with Vite and using the browser debugger.

  ⚠ You will no longer use the `live server` extension to launch your frontend code in the browser. Instead you will start your backend code with node.js and your frontend code with `npm run dev`. Set breakpoints in your backend code inside of VS Code and inside the browser for your frontend.

- Use the browser's dev tools to set breakpoints in the frontend code and step through it each line.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using the `deployService.sh` script found in the [example class application](https://github.com/webprogramming260/simon-service/blob/main/deployService.sh). This script will bundle your React frontend application as well as build your backend application. Take some time to understand how it works.

  ⚠ **NOTE** - The `deployService.sh` deployment script is different from the previous scripts as it deploys and installs your service on your production server.

  ```sh
  ./deployService.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

  ⚠ **NOTE** - The deployment script for this project is different from previous deployment scripts, since it needs to set up the Node.js service for your backend code, and copy your frontend code to the `public` directory. You also want to make sure that your Node.js HTTP service code for Simon is configured to listen on port 3000. When you deploy your Startup you want to make sure that code is configured to listen on port 4000.

- Update your `startup` repository `notes.md` with what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
