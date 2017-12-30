---
layout: article

permalink: /notes/first-steps-in-react/

title: "React Basics - 1. First Steps in React"

subtitle: "Treehouse - Learn React"

excerpt: "Introductory notes on React. React is a powerful tool for building and maintaining your application’s user interface. It differs from many other tool sets in that it focuses on building components and structure in JavaScript, and not in HTML pages or templates. In this stage we’ll learn where React comes from, what problems it solves, and how to get up and running."

categories: notes

date: 2017-10-20
---

{% include /globalSections/toc.html %}

**React is a powerful tool for building and maintaining your application’s user interface.** It differs from many other tool sets in that it focuses on building components and structure in JavaScript, and not in HTML pages or templates. In this stage we’ll learn where React comes from, what problems it solves, and how to get up and running.

## Why React

React introduces a new way of thinking about and building our interfaces. There are two huge benefits to help us build, organize, and maintain our UI code: It is declarative and component based.

>React is declarative and component based.

#### Components

When we build applications with HTML and JavaScript, we compose the UI by combining DOM elements like `<div>`'s, `<span>`'s, `<input>`'s, and others. **Oftentimes we have sections of our UIs that we want to reuse over and over again.** Think about a star rating widget on Netflix or a comment section on Facebook. While they're built with simple HTML elements like `<div>`'s and `<span>`'s, when we design, we tend to think of them as *self-contained components*.

>React provides tools for us to build our own components from basic building blocks and use them just like built-in HTML elements.

This means we can design, build, and test a component once, and then we can *easily reuse* it as needed in our application.

#### Declarative

>Declarative means that our program describes the result we're trying to achieve as opposed to being imperative. And imperative means that we describe the process and steps we need to get to our result.

For example most of the JavaScript we would write would be imperative. We take one step at a time, modifying variables and calling functions. HTML, on the other hand, is declarative. We use a markup language to describe the layout of our page.

## State and the Virtual DOM

React provides us with a declarative way to build our UIs. That is to say we write a description of the markup we want but we don't have to assemble the pieces or update them ourselves. We describe our application entirely within our JavaScript files. This includes our application *logic*, our *data* and even our *markup*. Well, **not literally our HTML markup, but a representation of our HTML**. A react component will create a representation of its markup in JavaScript using basic JavaScript data types like objects, arrays, and strings. This JavaScript representation of the DOM is called the virtual DOM in react.

These virtual DOM objects are cheap and fast to use. When react renders our code to the real DOM, it will translate our virtual DOM elements into real DOM elements on the page.

React takes on the full responsibility of rendering our real DOM elements from the virtual DOM representation that we define.


#### Quiz:

---

**Question**: What do we call the style of programming where er describe the final result, and not the steps?

**Answer**: Declarative

**Question**: React encourages your to manipulate the DOM directly.

**Answer**: False

**Question**: Updating the page's DOM is a slow operation.

**Answer**: True

**Question**: What do we call the style of programming where we write out step by step what to do?

**Answer**: Imperative

**Question**: What is react?

**Answer**: A library for creating user interfaces

---

## Understanding JSX

Describing a DOM element in the virtual DOM can be done using the `React.createElement` function.

```javascript
var myLink = React.createElement('a', {
  href: "https://teamtreehouse.com"
}, "Treehouse");
```

**While it is possible to create an entire applications layout using the `React.createElement` function over and over again it would be very inefficient.** This is where JSX comes in.

>JSX is an extension to the JavaScript language that allows us to use an XML style syntax to build our `React.createElement` call that the browser can execute.

```javascript
var myLink = (
  <a href="https://teamtreehouse.com">
    Treehouse
  </a>
);
```

In development this tool can run in our browser while we run our code which simplifies things but it's not recommended in production.

>The compiler weaves to translate JSX code to JavaScript is called Babel. 

It will also do a lot more than just translate our JSX syntax. **It can also translate features from later versions of JavaScript into a syntax compatible with older JavaScript engines.** Keep in mind that **JSX is not HTML**. It really is just another syntax for calling functions in JavaScript. Also, a component is composed of layout code and behavioral code. Traditionally this is split between HTML files and JavaScript files respectively and it has been a common practice to keep them split. However, there really is no separating the two. You usually end up needing to reach into your HTML templates from your JavaScript in some way, and then the separation breaks down.

## Our First Application

The basic HTML needed can be seen below. It has a few JavaScript files included as well. First, the `react.js` library file. Secondly, the the `react-dom.js` file is included. The logic for *how to turn a virtual DOM into a real DOM* is contained in the `react-dom.js` file. Then the `babel-browser.js` file is included. This is the Babel compiler which enables the use of JSX without a build step.

In production, we would compile our JSX files into JavaScript and include them directly, omitting this Babel browser file. Lastly, there is the `app.jsx` file. This is where the code will be written. Note that this includes `type="text/babel"` which signals to our Babel compiler that this should be compiled before being executed. Again, **in production we would not use this type as our code would be pre-compiled.**

```html
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <title>Scoreboard</title>
    <link rel="stylesheet" href="./app.css" />
  </head>
  <body>
    <div id="container">Loading...</div>
    <script src="./vendor/react.js"></script>
    <script src="./vendor/react-dom.js"></script>
    <script src="./vendor/babel-browser.min.js"></script>
    <script type="text/babel" src="./app.jsx"></script>
  </body>
</html>
```

In order to render some code to our page, we're going to use a function called `ReactDOM.render`. `ReactDOM.render` takes two arguments. The first is a virtual DOM element. The second is a real DOM element where we want to place our virtual DOM.

```javascript
ReactDOM.render(<h1>Hello</h1>, document.getElementById('container'));
```

>We wouldn't want to keep adding more and more to the DOM elements directly to the render call. Instead we wanna create a component that will represent our app.

We will call our component `Application` with a capital `A`. Components that we create in React.js start with a capital letter. This differentiates our custom components from those built in DOM components like `<h1>`, `<div>`, `<span>`, etc.  **Inside our component all we need to do is return some virtual DOM elements.**

```javascript
function Application() {
  return (
    <div>
      <h1>Hello from React</h1>
      <p> I was rendered from the Application component!</p>
    </div>
  );
}
ReactDOM.render(<Application />, document.getElementById('container'));
```

## React Developer Tools

Developing in React is made much easier by using the React DevTools extension. In order to use DevTools like you do with a normal project you must install the [react devtools extension](https://addons.mozilla.org/en-US/firefox/addon/react-devtools/).

#### Quiz

---

**Question**: Which of these is NOT valid JSX?

**Answer**: `<Application>`

**Question**: How would we create an instance of an Application component in JSX?

**Answer**: `<Application />`

**Question**: A React component must return only a single virtual DOM element.

**Answer**: True

**Question**: JSX syntax is the same as HTML in JavaScript files/

**Answer**: False

**Question**: What tool do we use to translate JSX files into standard JavaScript?

**Answer**: Babel

---