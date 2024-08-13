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
