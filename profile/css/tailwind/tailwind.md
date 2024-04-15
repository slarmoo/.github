# Tailwind

This vanilla CSS you create a selector and apply styles. Often times that selects on an element's class attribute. For example, we can create a `div` element with a `class` attribute with the value of `callout` and then use the following CSS to style the element.

```css
.callout {
  text-align: center;
  margin: 24px;
  color: blue;
}
```

With Tailwind you use predefined class attribute values to accomplish the same thing.

```html
<div className="m-4 font-bold text-blue-500 text-center">App will display here</div>
```

The value proposition is that your styling is tightly coupled with a standard set of declarative values that are used consistently across your code, and that the styling is right in the HTML instead of having a reference that is lost in some other file.

Here are some of the benefits of Tailwind:

1. Directly tied to CSS declarations making it easy to learn if you already know CSS
1. Resulting CSS is much smaller
1. Keeps the styling right next to where it is used
1. Consistent styling across the entire application

## Using Tailwind

to use Tailwind in your Vite based project you need to install the NPM package. In order for Tailwind to compile the class directives we use use `postcss` and `autoprefixer`. When Vite bundles it will automatically compile the CSS.

```sh
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init
```

Modify `tailwind.config.js`

```js
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['index.html', './src/**/*.{html,js,jsx}'],
  theme: {
    extend: {},
  },
  plugins: [],
};
```

Create a `main.css` and add the basic Tailwind directives.

```css
@tailwind base;
@tailwind components;
@tailwind utilities;
```

Modify `index.html` to include tailwind output.css.

```html
<head>
  ...
  <link href="./main.css" rel="stylesheet" />
</head>
```
