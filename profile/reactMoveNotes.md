# Create JavaScript React version

1. created branch of simon-javascript.

   ```sh
   git checkout -b react
   git push -u origin react
   ```

1. Deleted `service` code. That will come in the next deliverable.
1. Deleted `vite.config.js` since we didn't need the proxy. That will come in the next deliverable.
1. Tweaked `deployReact.js` to not include service deployment.
1. Changed `scores.js` to only read the scores from local storage.
1. Changed `gameNotifier.js` to generate messages every five minutes.
1. Changed `simonGame.jsx` to remove writing scores to service.
1. Changed `about.jsx` to just use a placeholder.

Add all the Javascript code
Introduce react, vite, and react boostrap

# Create WebSocket React version

Simply copied over React version since this will be the last phase.

1. This introduces the websocket communication in `gameNotifier.js`.
2. This introduces the `peerProxy.js` in the service.

QUOATABLE appears to no longer exist.

# Create Login React version

1. Remove reference to `ws` in `vite.config.js`.
     ```js
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
1. Change `gameNotifier.js` to not do the websocket stuff.
      ```js
         constructor socket setup
      ```
      
      ```js
          this.socket.send(JSON.stringify(event));
      ```
3. Remove `service/peerProxy.js`
4. Remove reference in `index.js` to `peerProxy.js`
5. Remove `ws` from package.json `npm uninstall ws`


# Create Service react version

1. Add `vite.config.js` for api proxy.
