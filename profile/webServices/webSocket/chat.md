# WebSocket chat

With the understanding of what the WebSocket protocol is, the basics of using it from Node and the browser, and the ability to debug the communication, it is time to use WebSocket to build a simple chat application.

![WebSocket Peers](webServicesWebSocketPeers.jpg)

In this example we will create a React frontend that uses WebSocket and displays the resulting chat. The React code for the client will be organized similarly to Simon and your Startup. A backend Express server will forward the WebSocket communication from the different clients.

## Configuring the project

Before we begin writing the code, we need to set up the React application project. We can follow the basic React setup that we discussed in the simple [Hello World React](../../webFrameworks/react/introduction/introduction.md#react-hello-world) app that we created in previous instruction. This includes:

1. Creating an NPM project, installing Vite, React, and the WebSocket package.
   ```sh
   npm init -y
   npm install vite@latest -D
   npm install react react-dom
   ```
1. Configuring Vite to proxy API requests through to the backend when debugging.
1. Creating a basic `index.html` file that loads your React application.
1. Creating your React application in `index.jsx`.

## Frontend React

The frontend consists of an `index.html` file that provides an empty DOM into which React components will be injected:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />
    <link rel="stylesheet" href="main.css" />

    <title>Chat React</title>
  </head>
  <body>
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
  </body>
</html>
```

and an `index.jsx` file that injects the top-level `<Chat/>` component:

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Chat />);
```

### Chat component

The Chat component introduces a state variable for the user's name and injects three sub-components, Name, Message, and Conversation. The `Name` component allows the user to specify what name they want to associate with their messages. The `Message` component allows the user to create and send a message. The `Conversation` component displays the chat messages.

```jsx
function Chat({ webSocket }) {
  const [name, setName] = React.useState('');

  return (
    <main>
      <Name updateName={setName} />
      <Message name={name} webSocket={webSocket} />
      <Conversation webSocket={webSocket} />
    </main>
  );
}
```

### Name component

The `Name` component implements a simple input element that uses the passed in setter function to update the name variable (in the calling component) whenever text is entered in the input field.

```jsx
function Name({ updateName }) {
  return (
    <main>
      <div className='name'>
        <fieldset id='name-controls'>
          <legend>My Name</legend>
          <input onChange={(e) => updateName(e.target.value)} id='my-name' type='text' />
        </fieldset>
      </div>
    </main>
  );
}
```

### Message component

The `Message` component provides an input element for chat text as well as a button for sending the message. Notice that if `disabled` evaluates to true, then the chat box and button are disabled. The `doneMessage` function provides alternative message sending capability when the `return` key is pressed. Notice that the `sendMsg` function calls the `sendMessage` method on the 'webSocket' object to send the message to other users, and calls the `setMessage` function to allow other components to process what the user has input.

```jsx
function Message({ name, webSocket }) {
  const [message, setMessage] = React.useState('');

  function doneMessage(e) {
    if (e.key === 'Enter') {
      sendMsg();
    }
  }

  function sendMsg() {
    webSocket.sendMessage(name, message);
    setMessage('');
  }

  const disabled = name === '' || !webSocket.connected;
  return (
    <main>
      <fieldset id='chat-controls'>
        <legend>Chat</legend>
        <input disabled={disabled} onKeyDown={(e) => doneMessage(e)} value={message} onChange={(e) => setMessage(e.target.value)} type='text' />
        <button disabled={disabled || !message} onClick={sendMsg}>
          Send
        </button>
      </fieldset>
    </main>
  );
}
```

### Conversation component

Finally, the `Conversation` component provides a place for chat messages to be displayed.

```jsx
function Conversation({ webSocket }) {
  const [chats, setChats] = React.useState([]);
  React.useEffect(() => {
    webSocket.addObserver((chat) => {
      setChats((prevMessages) => [...prevMessages, chat]);
    });
  }, [webSocket]);

  const chatEls = chats.map((chat, index) => (
    <div key={index}>
      <span className={chat.event}>{chat.from}</span> {chat.msg}
    </div>
  ));

  return (
    <main>
      <div id='chat-text'>{chatEls}</div>
    </main>
  );
}
```

## ChatClient

The `ChatClient` class manages the WebSocket in order to connect, send, and receive messages. The class is instantiated as a parameter to the Chat component.

```js
root.render(<Chat webSocket={new ChatClient()} />);
```

The class constructor sets up the WebSocket. First, we look at the protocol that is currently being used, as represented by the `window.location.protocol` variable. If it is non-secure HTTP then we set our WebSocket protocol to be non-secure WebSocket (`ws`). Otherwise we use secure WebSocket (`wss`). Next, we use that protocol to then connect the WebSocket to the same location that we loaded the HTML from by referencing the `window.location.host` variable.

```js
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);
```

We then register several listeners to the websocket for the `onopen`, `onmessage` and `onclose` events. The ChatClient interacts with the React components by allowing them to register as observers for when chat messages are received. Then when the WebSocket events are triggered the ChatClient can forward those events onto the registered observers.

Security-minded developers will realize that manipulating the DOM in this way will allow any chat user to execute code in the context of the application. After you get everything working, if you are interested, see if you can exploit this weakness.

```jsx
class ChatClient {
  observers = [];
  connected = false;

  constructor() {
    // Adjust the webSocket protocol to what is being used for HTTP
    const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
    this.socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

    // Display that we have opened the webSocket
    this.socket.onopen = (event) => {
      this.notifyObservers('system', 'websocket', 'connected');
      this.connected = true;
    };

    // Display messages we receive from our friends
    this.socket.onmessage = async (event) => {
      const text = await event.data.text();
      const chat = JSON.parse(text);
      this.notifyObservers('received', chat.name, chat.msg);
    };

    // If the webSocket is closed then disable the interface
    this.socket.onclose = (event) => {
      this.notifyObservers('system', 'websocket', 'disconnected');
      this.connected = false;
    };
  }

  // Send a message over the webSocket
  sendMessage(name, msg) {
    this.notifyObservers('sent', 'me', msg);
    this.socket.send(JSON.stringify({ name, msg }));
  }

  addObserver(observer) {
    this.observers.push(observer);
  }

  notifyObservers(event, from, msg) {
    this.observers.forEach((h) => h({ event, from, msg }));
  }
}
```

## Backend chat server

The chat server runs the web service, serves up the client code, manages the WebSocket connections, and forwards messages from the peers.

To get started we create a subdirectory named `service` and install the Express and WebSocket NPM packages.

```sh
mkdir service && cd service
npm install express ws
```

Then we create a file named `service.js` and add our service code.

### Web service

The web service is established using a simple Express application. Note that we serve up our client HTML, CSS, and JavaScript files using the `static` middleware.

```js
const { WebSocketServer } = require('ws');
const express = require('express');
const app = express();

// Serve up our webSocket client HTML
app.use(express.static('./public'));

const port = process.argv.length > 2 ? process.argv[2] : 3000;
server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});
```

### WebSocket server

When we create our WebSocket we simply provide our Express HTTP server object in the constructor. This allows the WebSocket code to intercept WebSocket upgrade requests and processing future WebSocket messages.

```js
server = app.listen(port, () => {
  console.log(`Listening on ${port}`);
});

// Create a websocket object
const socketServer = new WebSocketServer({ server });
```

### Forwarding messages

With the WebSocket server we can use the `connection`, `message`, and `pong` events to receive and send data between peers. We use the WebSocket object's built in connection list to determine who we forward messages to, and to decide if the connections are still open.

So that we can test if a connection has closed we use the ping/pong protocol that is built into WebSocket. At a given interval we send a ping message and then respond to the pong event to update that the socket is still alive. Any connection that did not respond, will remain in the not alive, and get terminated on the next pass.

```js
socketServer.on('connection', (socket) => {
  socket.isAlive = true;

  // Forward messages to everyone except the sender
  socket.on('message', function message(data) {
    socketServer.clients.forEach(function each(client) {
      if (client !== socket && client.readyState === WebSocket.OPEN) {
        client.send(data);
      }
    });
  });

  // Respond to pong messages by marking the connection alive
  socket.on('pong', () => {
    socket.isAlive = true;
  });
});

// Periodically send out a ping message to make sure clients are alive
setInterval(() => {
  socketServer.clients.forEach(function each(client) {
    if (client.isAlive === false) return client.terminate();

    client.isAlive = false;
    client.ping();
  });
}, 10000);
```

## Vite.config.js

The vite.config.js file in the example's root directory routes websocket traffic away from port 5137 (where vite is serving the frontend) to port 3000 (where the backend is listening for chat traffic). We have seen something similar before when we used vite to reroute our service endpoints while debugging in our development environment. Here, again, this file is only used for debugging during development and is not pushed to the production environment. Note that the file is routing traffic on the `/ws` path, which is why above, this path was included when we instantiated the `WebSocketServer` object in the frontend client code.

```js
import { defineConfig } from 'vite';

export default defineConfig({
  server: {
    proxy: {
      '/ws': {
        target: 'ws://localhost:3000',
        ws: true,
      },
    },
  },
});
```

## Experiment

You can find the complete example described above in this [GitHub repository](https://github.com/webprogramming260/websocket-chat).

1. Clone the repository.
1. Run `npm install` from a console window in the example root directory.
1. Run `npm install` from a console window in the example service subdirectory.
1. Open up the code in VS Code and review what it is doing.
1. Run and debug the example by pressing `F5` for the file `service/index.js`. You may need to select node.js as the debugger the first time you run.
1. Run `npm run dev` from a console window in the example root directory.
1. Open multiple browser windows and point them to http://localhost:5137 and start chatting.
1. Use the browser's debugger to view the WebSocket communication.

![WebSocket Chat](webSocketChat.png)
