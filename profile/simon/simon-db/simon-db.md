# Simon DB

![Simon](../simon.png)

This deliverable demonstrates using a database service, MongoDB, to persistently save data. Our web service will call the database service to save high scores. This creates a third layer in our Simon technology stack.

1. Client application - Simple HTML/CSS/JavaScript
1. Web service - Caddy, Node.js, Express
1. Database service - MongoDB

You can view this application running here: [Example Simon DB](https://simon-db.cs260.click). Although you won't be able to see any difference from the `simon-service` version, because the only difference is that when the `simon-db` service is restarted it doesn't lose its high score data because it is saved persistently in the database.

## Connecting to the database

We use a cloud service called MongoDB Atlas for our database service. Once we are connected to Atlas, we can make service calls to MongoDB from our web service. This involves specifying the database service endpoint and making services calls like the following.

```Javascript
const { MongoClient } = require('mongodb');

const url = `mongodb+srv://${userName}:${password}@${hostname}`;
const client = new MongoClient(url);
client.connect(err => {
  const collection = client.db("test").collection("devices");

  // ... perform actions on the DB collection

  client.close();
});

```

## Create a MongoDB Atlas cluster

Before you can start writing your own code you need to get a MongoDB Atlas account and create a database cluster that you can use as your database service. If you have not done that yet go back and review the instruction on data services.

## Handling credentials

Make sure you follow the instruction given previously about providing and protecting your MongoDB credentials in a file named `dbConfig.json`. This file will get deployed to production with the `deployService.sh` script.

## Working with the database

The `database.js` file contains the functions for getting and adding high scores. The database functions are called from the `getScores` and `submitScores` endpoints found in `index.js`.

## Study this code

Get familiar with what this code teaches.

- Clone the repository to your development environment.
  ```sh
  git clone https://github.com/webprogramming260/simon-db.git
  ```
- Set up your Atlas credentials in a file named `dbConfig.json` that is in the same directory as `database.js`.
- Add `dbConfig.json` to your `.gitignore` file so that it doesn't put your credentials into GitHub accidentally.
- Review the code and get comfortable with everything it represents.
- View the code in your browser by hosting it from a VS Code debug session. ⚠ Do not use the `live server` extension since your front end code will now be served up by the Node.js server you created in `index.js`. Set breakpoints in your back end code inside of Visual Studio.
- See how data is populated in the database by viewing the contents of the database using the MongoDB Atlas console.
- Make modifications to the code as desired. Experiment and see what happens.

## Deploy to production

- Deploy to your production environment using a copy of the `deployService.sh` script found in the [example class application](https://github.com/webprogramming260/simon-db/blob/main/deployService.sh). Take some time to understand how it works.

  ```sh
  ./deployService.sh -k <yourpemkey> -h <yourdomain> -s simon
  ```

  For example,

  ```sh
  ./deployService.sh -k ~/keys/production.pem -h yourdomain.click -s simon
  ```

- Update your `startup` repository README.md to record, what you modified and added with this deliverable. Also update your notes.md to record what you learned.
- Make sure your project is visible from your production environment (e.g. https://simon.yourdomain.click).
- Submit the URL to your production environment for grading using the Canvas assignment page.

## Grading Rubric

- 25% - Simon DB deployed to your production environment
- 25% - Your Atlas DB credentials properly stored in your production environment
- 50% - Notes in your start up repository README.md about what you have learned
