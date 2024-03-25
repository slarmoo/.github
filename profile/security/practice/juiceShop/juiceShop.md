# Juice Shop

This provides a walk through of how to get started with Juice Shop.

## Install

```sh
git clone https://github.com/juice-shop/juice-shop.git --depth 1

cd juice-shop

npm install

npm start

http://localhost:3000
```

## Create an incognito tab

We do this so we can mess around and then throw away our state.

Notice that there is some help that tells you to look for a scoreboard as your first challenge. There is a hint to look in the clientside js.

## The startup tutorial

At the beginning the tutorial tells you to look for a score board. If you grab `main.js` and look at the code there are all sorts of goodies in there. All the tutorial text is there. There is also a section that tells you about all the view paths for that application.

```json
{
    path: "score-board",
    component: tp
},
{
    path: "score-board-legacy",
    component: Er
}
```

These are super valuable since you can't always get to every menu from the UI.

http://localhost:3000/#/score-board

1/168 challenges solved.
After you successfully get the score-board to show up, it is displayed in the hamburger menu from then on.

## Demos

I searched for easy challenges that are good for demos.

- DOM XSS - Easy and tutorial
- Privacy Policy
- Confidential Document

### DOM XSS

Basically you just need to put `<iframe src="javascript:alert(`xss`)">` in the search box. This really isn't much of a hack since it only changes your own browser, but if it saved and displayed searches from other users then it would be XSS.

## Privacy Policy

This is strange. You just read the privacy policy. Hummm.

## Password Strength

Admin email is in the Apple Juice review. `admin@juice-sh.op`. Try to login with a brute force attack. I discovered `admin123`. I changed it to `admin1234`.

## Admin Section

Now that I can auth as an admin I can access `/administration` view. This shows mea ll the registered users along with their feedback.

## Error Handling

I went to `/order-completion/../xxx` this triggered a `/rest/` request that generated a 500 response. The error also has the stack in it.

```json
{
  "error": {
    "message": "Unexpected path: /rest/",
    "stack": "Error: Unexpected path: /rest/\n    at /Users/lee/Desktop/demo/juice-shop/build/routes/angular.js:38:18\n    at Layer.handle [as handle_request] (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:328:13)\n    at /Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:286:9\n    at Function.process_params (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:346:12)\n    at next (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:280:10)\n    at /Users/lee/Desktop/demo/juice-shop/build/routes/verify.js:168:5\n    at Layer.handle [as handle_request] (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:328:13)\n    at /Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:286:9\n    at Function.process_params (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:346:12)\n    at next (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:280:10)\n    at /Users/lee/Desktop/demo/juice-shop/build/routes/verify.js:105:5\n    at Layer.handle [as handle_request] (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:328:13)\n    at /Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:286:9\n    at Function.process_params (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:346:12)\n    at next (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:280:10)\n    at logger (/Users/lee/Desktop/demo/juice-shop/node_modules/morgan/index.js:144:5)\n    at Layer.handle [as handle_request] (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/layer.js:95:5)\n    at trim_prefix (/Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:328:13)\n    at /Users/lee/Desktop/demo/juice-shop/node_modules/express/lib/router/index.js:286:9"
  }
}
```

The endpoint `http://localhost:3000/#/403` does something very strange. It displays a big red box that says 403. Not sure what this is for.

## Confidential document

Apparently there is an ftp endpoint that will list the file we are looking for. I'm not sure how I was supposed to know that was there.

http://localhost:3000/ftp/acquisitions.md

I was able to find a reference to the ftp endpoint when I tried to download my order invoice.

http://localhost:3000/ftp/order_5267-c03562a8ec9e97be.pdf

There is a reference to this endpoint in the `main.js`.

There are other endpoints that are also interesting.

http://localhost:3000/encryptionkeys

http://localhost:3000/support/logs

http://localhost:3000/api-docs

## Password strength

This is a really good one as the fix does good instruction.

## Explore

1. Explore the app
   1. make a map of the website and understand every feature
   1. Know features that require login and ones that don't
   1. Note features that take input
   1. Note features that display user input data
   1. Note features that deal with money
1. Open dev tools
   1. Open Application/localstorage. Nothing here yet
   1. Open Applicaiton/cookies. Nothing here yet
   1. Open Network
      1. api/Quantitys
      1. rest/products/search?q
      1. api/Challenges/?name=Score%20Board
      1. rest/languages
      1. rest/admin/application-configuration
      1. Socket.io used for WebSocket. Pushing simple `2` and `3` back and forth. It also looks like there is some sort of polling going on.
   1. Sources
      1. main.js reveals a lot of views and endpoints we can call.

## Create an account

user: juice@shop.com pw: juice

1. When I log in the token is sent in the response, cookie, and localstorage. Cookie has no restrictions on its access or usage. I should be able to send the token to a different website if I can do a XSS attack.
