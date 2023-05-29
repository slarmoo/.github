# LocalStorage

**Deeper dive reading**: [MDN LocalStorage](https://developer.mozilla.org/en-US/docs/Web/API/Window/localStorage)

## What is localStorage and when do I use it?

LocalStoarge allows you to store and retrieve user generated data (i.e. scores, usernames, etc.,) within the browser itself. The main advantage of using localstorage is that it acts as a mini database the user and the website can access even if the website cannot connect to an external database the website may be linked to. LocalStorage also allows user generated data to be easily accessed across different pages within the website.

## How to use LocalStorage

There are four main functions that can be used with localstorage.

| Function                   | Meaning                                                                                  |
| -------------------------- | ---------------------------------------------------------------------------------------- |
| `.setItem( 'KEY', value )` | Sets an item into local stoarge. Requires both a key and a value                         |
| `.getItem( 'KEY' )`        | Gets an item from local storage based on the given key and saves the value to a variable |
| `.removeItem( 'KEY' )`     | Removes an item from local storage based on the given key                                |
| `.clear()`                 | Clears everything currently set inside of local storage                                  |

### Storing a javascript object or array inside localStorage:

Unlike data types such as strings, integers, and boolean values, localstorage cannot directly store javascript objects and arrays. Instead,
to set an array or object into localstorage, you will need to first convert the array or object into a string using `JSON.stringify()`. To retrieve the object or array from localstorage, you will need to convert the string into JSON using `JSON.parse()`.

### Example

```js
let user = 'Alice';

let myObject = {
  name: 'Bob',
  info: {
    favoriteClass: 'CS 260',
    likesCS: true,
  },
};

let myArray = [1, 'One', true];

localStorage.setItem('user', user);
localStorage.setItem('object', JSON.stringify(myObject));
localStorage.setItem('array', JSON.stringify(myArray));

let retrievedUser = localStorage.getItem('user');
let retrievedObject = JSON.parse(localStorage.getItem('object'));
let retrievedArray = JSON.parse(localStorage.getItem('array'));
```
