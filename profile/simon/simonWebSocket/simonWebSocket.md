# Simon WebSocket

![Simon](../simon.png)

This deliverable demonstrates peer to peer communication using WebSocket. The functionality that Simon provides for peer communication is intentionally limited to display notifications between users. This was done so that the application would clearly demonstrate how WebSocket works rather than clutter the application with functionality that uses WebSockets.

You can view this application running here: [Example Simon WebSocket](https://simon-websocket.cs260.click)

## Handling WebSocket requests

After installing the `ws` NPM package the next step is to attach a WebSocket listener to the HTTP server that was created in an earlier deliverable. This work is all done in the PeerProxy class implemented in the `peerProxy.js` file. The PeerProxy class contains the protocol upgrade from HTTP to WebSocket, tracks new WebSocket connections, passes (or proxies) requests between connections, and implements ping/pong to keep connections alive.

## Displaying and generating WebSocket messages

The `public/play.js` file contains the functions for connecting, broadcasting, receiving, and displaying events using WebSocket.

![Simon WebSocket](simonWebSocket.jpg)

Leveraging the concepts demonstrated in this deliverable, you can implement addition functionality that uses peer to peer interactions. For example, you could make it so each connected peer has to complete one of the Simon patterns in turn.

## Study this code

Get familiar with what this code teaches.

- Clone the repository to your development environment.
  ```sh
  git clone https://github.com/webprogramming260/simon-websocket.git
  ```
- Set up your Atlas credentials in a file named `dbConfig.json` that is in the same directory as `database.js`.
- Add `dbConfig.json` to your `.gitignore` file so that it doesn't put your credentials into GitHub accidentally.
- Review the code and get comfortable with everything it represents.
- Debug the code in your browser by hosting it from a VS Code debug session. This [video on debugging a node.js based service](https://youtu.be/B0le_Z_2TQY) will step you through the process.

  ⚠ You will no longer use the `live server` extension to launch your frontend code in the browser since your frontend code will now be served up by the Node.js server you created in `index.js`. Set breakpoints in your backend code inside of Visual Studio.

- Use the browser's dev tools to set breakpoints in the code and step through it each line.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using a copy of the `deployService.sh` script found in the [example class application](https://github.com/webprogramming260/simon-websocket/blob/main/deployService.sh). Take some time to understand how it works.

  ```sh
  ./deployService.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

- Update your `startup` repository notes.md with what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
