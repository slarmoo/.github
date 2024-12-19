# WebSocket chat

With the understanding of what WebSockets are, the basics of using them from Node and the browser, and the ability to debug the communication, it is time to use WebSocket to build a simple chat application.

![WebSocket Peers](webServicesWebSocketPeers.jpg)

In this example we will create a React front end that uses WebSockets and displays the resulting chat.  The React code for the client will be organized similarly to Simon and your Startup.  A backend Express server will forward the WebSocket communication from the different clients.

## Front end React

The front end consists of an `index.html` file that provides an empty DOM into which React components will be injected:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <meta name="theme-color" content="#000000" />

    <title>Chat React</title>
  </head>
  <body style="background: #fff8d8;">  <!--don't love this style hack-->
    <noscript>You need to enable JavaScript to run this app.</noscript>
    <div id="root"></div>
    <script type="module" src="/index.jsx"></script>
  </body>
</html>
```

and an `index.jsx` file that injects the top-level `<App/>` component:

```jsx
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<App />);
```

The main component `app.jsx` simply injects the `chat.jsx` component and adds some simple styling.

```jsx
export default function App() {
  return <div className='body'><Chat /></div>;
}
```

The `chat.jsx` component introduces a state variable for the user's name and injects three sub-compenents.  Notice that the setter for the `name` variable is passed as a prop into the `<Name/>` component.  There are also three props passed into the `<Message/>` component.  The first checks to make sure that the name field is not blank; the second is the users name; and the third is a `Chatter` object that implements the frontend websocket connection.

```jsx
export function Chat() {
    const [name, setName] = React.useState('');

    return (
    <main>
        <Name updateName={setName}/>
        <Message disabled={name===''} name={name} client={Chatter}/>
        <Messages />
    </main>
  );
}
```

The `name.jsx` component implements a simple input element that uses the passed in setter function to update the name variable (in the calling component) whenever text is entered in the input field.

```jsx
export function Name({updateName}) {

  return (
    <main>
        <div className="name">
            <fieldset id="name-controls">
                <legend>My Name</legend>
                <input onChange={(e) => updateName(e.target.value)} id="my-name" type="text" />
            </fieldset>
        </div>
    </main>
  );
}
```

The `message.jsx` component provides an input element for chat text as well as a button for sending the message.  Notice that if the disabled prop is true, the chat box and button are disabled.  The `doneMessage` function provides alternative message sending capability when the `return` key is pressed.  Notice that the `sendMsg` function calls the `sendMessage` method on the 'client' object received as one of the props (we'll see how that works in a minute), passing it both the prop name and the text contained in the message input box.

```jsx
export function Message({disabled,name,client}) {

  function doneMessage(e) {
      if (e.key === 'Enter') {
        sendMsg();
      }
  }

  function sendMsg() {
    client.sendMessage(name,document.querySelector('#new-msg').value);
  }

  return (
    <main>
        {disabled && (<fieldset id="chat-controls" disabled>
            <legend>Chat</legend>
            <input id="new-msg" type="text" />
            <button>Send</button>
        </fieldset>)}
        {!disabled && (<fieldset id="chat-controls">
            <legend>Chat</legend>
            <input onKeyUp={(e)=>doneMessage(e)} id="new-msg" type="text" />
            <button onClick={sendMsg}>Send</button>
        </fieldset>)}
    </main>
  );
}
```

Finally, the `messages.jsx` component provides a place for chat messages to be displayed.

```jsx
export function Messages() {

  return (
    <main>
        <div id="chat-text"></div>
    </main>
  );
}
```

## Front end chat client

The JavaScript for the application provides the interaction with the DOM for creating and displaying messages, and manages the WebSockets in order to connect, send, and receive messages.

### DOM interaction

We do not want to be able to send messages if the user has not specified a name. So we add an event listener on the name input and disable the chat controls if the name ever is empty.

```js
const chatControls = document.querySelector('#chat-controls');
const myName = document.querySelector('#my-name');
myName.addEventListener('keyup', (e) => {
  chatControls.disabled = myName.value === '';
});
```

We then create a function that will update the displayed messages by selecting the element with the `chat-text` ID and appending the new message to its HTML. Security-minded developers will realize that manipulating the DOM in this way will allow any chat user to execute code in the context of the application. After you get everything working, if you are interested, see if you can exploit this weakness.

```js
function appendMsg(cls, from, msg) {
  const chatText = document.querySelector('#chat-text');
  chatText.innerHTML = `<div><span class="${cls}">${from}</span>: ${msg}</div>` + chatText.innerHTML;
}
```

When a user presses the enter key in the message input we want to send the message over the socket. We do this by selecting the DOM element with the `new-msg` ID and adding a listener that watches for the `Enter` keystroke.

```js
const input = document.querySelector('#new-msg');
input.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});
```

When Enter is pressed the sendMessage function is called. This selects the text out of the `new-msg` element and the name out of the `my-name` element and sends that over the WebSocket. The value of the message element is then cleared so that it is ready for the next message.

```js
function sendMessage() {
  const msgEl = document.querySelector('#new-msg');
  const msg = msgEl.value;
  if (!!msg) {
    appendMsg('me', 'me', msg);
    const name = document.querySelector('#my-name').value;
    socket.send(`{"name":"${name}", "msg":"${msg}"}`);
    msgEl.value = '';
  }
}
```

### WebSocket connection

Now we can set up our WebSocket. We want to be able to support both secure and non-secure WebSocket connections. To do this we look at the protocol that is currently being used as represented by the `window.location.protocol` variable. If it is non-secure HTTP then we set our WebSocket protocol to be non-secure WebSocket (`ws`). Otherwise we use secure WebSocket (`wss`). We use that to then connect the WebSocket to the same location that we loaded the HTML from by referencing the `window.location.host` variable.

We can notify the user that chat is ready to go by listening to the `onopen` event and appending some text to the display using the `appendMsg` function we created earlier.

```js
// Adjust the webSocket protocol to what is being used for HTTP
const protocol = window.location.protocol === 'http:' ? 'ws' : 'wss';
const socket = new WebSocket(`${protocol}://${window.location.host}/ws`);

// Display that we have opened the webSocket
socket.onopen = (event) => {
  appendMsg('system', 'websocket', 'connected');
};
```

When the WebSocket receives a message from a peer it displays it using the `appendMsg` function.

```js
socket.onmessage = async (event) => {
  const text = await event.data.text();
  const chat = JSON.parse(text);
  appendMsg('friend', chat.name, chat.msg);
};
```

And if the WebSocket closes for any reason we also display that to the user and disable the controls.

```js
socket.onclose = (event) => {
  appendMsg('system', 'websocket', 'disconnected');
  document.querySelector('#name-controls').disabled = true;
  document.querySelector('#chat-controls').disabled = true;
};
```

## Chat server

The chat server runs the web service, serves up the client code, manages the WebSocket connections, and forwards messages from the peers.

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

When we create our WebSocket we do things a little differently than we did with the simple connection example. Instead of letting the WebSocketServer control both the HTTP connection and the upgrading to WebSocket, we want to use the HTTP connection that Express is providing and handle the upgrade to WebSocket ourselves. This is done by specifying the `noServer` option when creating the WebSocketServer and then handling the `upgrade` notification that occurs when a client requests the upgrade of the protocol from HTTP to WebSocket.

```js
// Create a websocket object
const wss = new WebSocketServer({ noServer: true });

// Handle the protocol upgrade from HTTP to WebSocket
server.on('upgrade', (request, socket, head) => {
  wss.handleUpgrade(request, socket, head, function done(ws) {
    wss.emit('connection', ws, request);
  });
});
```

### Forwarding messages

With the WebSocket server we can use the `connection`, `message`, and `close` events to forward messages between peers. On connection we insert an object representing the connection into a list of all connections from the chat peers. Then when a message is received we loop through the peer connections and forward it on to everyone except the peer who initiated the request. Finally we remove a connection from the peer connection list when it is closed.

```js
// Keep track of all the connections so we can forward messages
let connections = [];

wss.on('connection', (ws) => {
  const connection = { id: connections.length + 1, alive: true, ws: ws };
  connections.push(connection);

  // Forward messages to everyone except the sender
  ws.on('message', function message(data) {
    connections.forEach((c) => {
      if (c.id !== connection.id) {
        c.ws.send(data);
      }
    });
  });

  // Remove the closed connection so we don't try to forward anymore
  ws.on('close', () => {
    connections.findIndex((o, i) => {
      if (o.id === connection.id) {
        connections.splice(i, 1);
        return true;
      }
    });
  });
});
```

### Keeping connections alive

A WebSocket connection will eventually close automatically if no data is sent across it. In order to prevent that from happening the WebSocket protocol supports the ability to send a `ping` message to see if the peer is still there and receive `pong` responses to indicate the affirmative.

To make this work, we use `setInterval` to send out a ping every 10 seconds to each of our peer connections and clean up any connections that did not respond to our previous ping.

```js
setInterval(() => {
  connections.forEach((c) => {
    // Kill any connection that didn't respond to the ping last time
    if (!c.alive) {
      c.ws.terminate();
    } else {
      c.alive = false;
      c.ws.ping();
    }
  });
}, 10000);
```

In our `connection` handler we listen for the `pong` response and mark the connection as alive.

```js
// Respond to pong messages by marking the connection alive
ws.on('pong', () => {
  connection.alive = true;
});
```

Any connection that did not respond will remain in the not alive state and get cleaned up on the next pass.

# Experiment

You can find the complete example described above in this [GitHub repository](https://github.com/webprogramming260/websocket-chat).

1. Clone the repository.
1. Run `npm install` from a console window in the example directory.
1. Open up the code in VS Code and review what it is doing.
1. Run and debug the example by pressing `F5`. You may need to select node.js as the debugger the first time you run.
1. Open multiple browser windows and point them to http://localhost:3000 and start chatting.
1. Use the browser's debugger to view the WebSocket communication.
