# Router

🔑 **Required reading**: [React Router DOM Tutorial](https://blog.webdevsimplified.com/2022-07/react-router/)

A web framework router provides essential functionality for single-page applications that otherwise would have been handled by rendering multiple HTML pages. With a multiple-webpage application the headers, footers, navigation, and common components must be either duplicated in each HTML page, or injected before the server sends the page to the browser. With a single page application, the browser only loads one HTML page and then JavaScript is used to manipulate the DOM and give it the appearance of multiple pages. The router defines the routes a user can take through the application, and automatically manipulates the DOM to display the appropriate framework components. This has the advantage of being able to store state as the user interacts with the page and not having to continually go to the server to get new HTML pages.

React does not have a standard router package, and there are many that you can choose from. We will use [react-router-dom](https://www.npmjs.com/package/react-router-dom). The simplified routing functionality of React-router-dom derives from the project [react-router](https://www.npmjs.com/package/react-router) for its core functionality. Do not confuse the two when reading tutorials and documentation.

The following show how the router toggles between content as a user clicks on the header elements.

![React Router](routerExample.gif)

A basic implementation of the router consists of a `BrowserRouter` component that encapsulates the entire application and controls the routing action. The `Link`, or `NavLink`, component captures user navigation events and modifies what is rendered by the `Routes` component by matching up the `to` and `path` attributes.

```jsx
// Inject the router into the application root DOM element
const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // BrowserRouter component that controls what is rendered
  // NavLink component captures user navigation requests
  // Routes component defines what component is routed to
  <BrowserRouter>
    <div className='app'>
      <nav>
        <NavLink to='/'>Home</Link>
        <NavLink to='/about'>About</Link>
        <NavLink to='/users'>Users</Link>
      </nav>

      <main>
        <Routes>
          <Route path='/' element={<Home />} exact />
          <Route path='/about' element={<About />} />
          <Route path='/users' element={<Users />} />
          <Route path='*' element={<Navigate to='/' replace />} />
        </Routes>
      </main>
    </div>
  </BrowserRouter>
);
```

## ☑ Assignment

Create a fork of this [CodePen](https://codepen.io/leesjensen/pen/poKLKaX) and add another component for the path of `/scores`.

_If your section of this course requires that you submit assignments for grading_: Submit your CodePen URL to the Canvas assignment.

Don't forget to update your GitHub startup repository `notes.md` with all of the things you learned and want to remember.
