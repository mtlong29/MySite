---
layout: article

permalink: /notes/react-router-4-basics/

title: "React Router v4 Basics"

subtitle: "Treehouse - Learn React"

excerpt: "Notes on how to use React Router v4, a declarative routing solution for React, to manage navigation and rendering of components in your applications."

categories: notes

date: 2017-10-26
---

{% include /globalSections/toc.html %}

**React doesn't natively have built in routing features.** Many people choose to use [React Router](https://github.com/ReactTraining/react-router), an external library designed specifically for React.

## What is Routing?

>As a reminder, routing is the process of matching a URL to a view, or the set of component being rendered. In single-page apps (or SPAs), routing dynamically loads components and changes what's displayed in the browser, as users navigate the app. All without reloading the page.

In single-page apps the JS, CSS, and HTML is only loaded once but changes dynamically depending on how the user interacts with the app. JavaScript frameworks like, Angular and Ember, come with built-in routing features. But as you've learned, **React is not a framework. It's only a library concerned with rendering your UI.**

#### Quiz:

---

**Question**: What is a single-page-app (SPA)?

**Answer**: A Web application that displays on a single web page. The HTML, JavaScript, and CSS are loaded once by the browser and the content changes dynamically as users interact with the app.

**Question**: React Router does not let you change route programmatically. For example, you are not able to create a route in response to a form submission.

**Answer**: False

**Question**: A good routing solution should keep track of browser history and seamlessly link users to specific sections of your app.

**Answer**: True. Users should navigate a single-page-app using the browser's back and forward buttons, and a URL should always direct the user to the correct location.

**Question**: React includes built-in features.

**Answer**: False. React is a library concerned with just rendering your UI. You'll install additional libraries and add-ons for certain features; React Router is the official routing library.

**Question**: In web development, routing:

**Answer**: Matches a URL to the set of components being rendered

---

## Installing Reach Router

>Installing React Router is simple. Type `npm install --save react-router-dom` in the terminal.

## Declaring Routes

In order to declare a route using React Router you must import `BrowserRouter` and `Route` from `react-router-dom`. Next you must import the components you wish to use in your routes. You must wrap your App in opening and closing `<BrowserRouter>` tags. Inside this you can render components and declare a route using `<Route path="" component={}>`:

```javascript
import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

// App components
import Header from './Header';
import Home from './Home';
import About from './About';
import Teachers from './Teachers';
import Courses from './Courses';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/about" component={About} />
      <Route path="/teachers" component={Teachers} />
      <Route path="/courses" component={Courses} />
    </div>
  </BrowserRouter>
);

export default App;
```

**Note that you can use the `exact` attribute if you only want to render a component when the URL matches exactly.** For example, a parent component `/` will show on its child `/about` without the `exact` attribute.

## Inline Rendering with <Route>

**Using `component={}` in a `<Route>` tag is fine unless you need to pass it a property.** This is when you need inline rendering. To start using inline rendering you must first make sure your component has `props` being passed to it. Next, you can use `render={ () => <Component property="" /> }`:

```javascript
import React from 'react';
import {
  BrowserRouter,
  Route
} from 'react-router-dom';

// App components
import Header from './Header';
import Home from './Home';
import About from './About';
import Teachers from './Teachers';
import Courses from './Courses';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Route exact path="/" component={Home} />
      <Route path="/about" render={ () => <About title="About" />} />
      <Route path="/teachers" component={Teachers} />
      <Route path="/courses" component={Courses} />
    </div>
  </BrowserRouter>
);

export default App;
```

#### Quiz:

---

**Question**:Given this: `<Route exact path="/signup" component={SignupForm} />`. Which of the following is true about Route?

**Answer**: It renders the `SignupForm` component only when the URL path is exactly `/signup`.

**Question**: Which `<Route>` prop accepts an inline function that gets called when the URL and path match?

**Answer**: `render`

**Question**: Which component is one of the core components of React Router and keeps your UI in sync with the URL?

**Answer**: `<BrowserRouter>`

**Question**: Which `<Route>` prop renders a component only when the path matches the URL exactly?

**Answer**: `exact`

**Question**: React Router uses JSX syntax to declare routes.

**Answer**: True. React Router is a set of components, and the declarative syntax of JSX makes it easier to visualize how routes are structured.

**Question**: Which React Router component is responsible for rendering UI (or other components)?

**Answer**: `<Route>`

---

## Navigating Between Routes

>**When linking to different routes you don't use an `<a>` tag. You use either `<Link>` or `<NavLink>`.**

 `<Link>` provides declarative, accessible navigation around your application. `<NavLink>`is a special version of the `<Link>` that will add styling attributes to the rendered element when it matched the current URL. This is like the `active` attribute. You can also use the attributes `activeClassName` and `activeStyle`.

Also, note that you have to use the `exact` attribute in order to prevent the `/` route from being active for all of its child routes such as `/about`.

```javascript
import React from 'react';
import { NavLink } from 'react-router-dom';

const Header = () => (
  <header>
    <span className="icn-logo"><i className="material-icons">code</i></span>
    <ul className="main-nav">
      <li><NavLink to="/" exact>Home</NavLink></li>
      <li><NavLink to="/about" activeClassName="actyMcActiveFace">About</NavLink></li>
      <li><NavLink to="/teachers">Teachers</NavLink></li>
      <li><NavLink to="/courses">Courses</NavLink></li>
    </ul>    
  </header>
);

export default Header;
```

## Redirecting with React

**You can redirect using React Router easily using the `<Redirect />` tag.** Don't forget to import Redirect. Using `Redirect` in the following way allows you to maintain that active state with the `NavLink` tag even when clicking different routes within the courses page:

```javascript
<Route path="/courses" exact render={ () => <Redirect to="/courses/html" /> } />
```

>The `exact` property makes it so that when you refresh you remain on the same url.

## Using the Match Object

The `match` object contains information about how a route is matching the URL. We can access this data from inside components being rendered by `<Route>`. The match property contains information bout how a route is matching the URL. For example, the path property lets us know that courses uses the `/courses` path and the URL property tells us that it's matching the courses portion of the URL. We can access this data from inside components being rendered by routes. First, pass the object `{match}`. Then you can use template literal expressions to access the `url`'s and `path`'s respectively.

```javascript
import React from 'react';
import {
  Route,
  NavLink,
  Redirect
} from 'react-router-dom';

import HTML from './courses/HTML';
import CSS from './courses/CSS';
import JavaScript from './courses/JavaScript';

const Courses = ({match}) => (
  <div className="main-content courses">
    <div className="course-header group">
      <h2>Courses</h2> 
      <ul className="course-nav">
        <li><NavLink to={`${match.url}/html`}>HTML</NavLink></li>
        <li><NavLink to={`${match.url}/css`}>CSS</NavLink></li>
        <li><NavLink to={`${match.url}/javascript`}>JavaScript</NavLink></li>
      </ul>
    </div>

    <Route path={match.path} exact render={ () => <Redirect to={`${match.path}/html`} /> } />
    <Route path={`${match.path}/html`} component={HTML} />
    <Route path={`${match.path}/css`} component={CSS} />
    <Route path={`${match.path}/javascript`} component={JavaScript} />

  </div>
);

export default Courses;
```

#### Quiz:

---

**Question**: Which component can redirect from one route to another route?

**Answer**: `<Redirect>`

**Question**: Which React Router component allows users to navigate between routes?

**Answer**: `<Link>`

**Question**: The ____ prop assigns a custom CSS class to `NavLink` when it's active.

**Answer**: `activeClassName`

**Question**: Which component lets you add styling to a link when it matches the current URL?

**Answer**: `<NavLink>`

**Question**: Given this route: `<Route path='/products' render={() => <Redirect to='/products/books' />} />`

**Answer**: The route renders a redirect to `/products/books` when the URL path is `/products`.

---

## Displaying 404 Error Routes using Switch

**By Creating a `<Route>` but leaving off the `path` it will be used when nothing else matches.** Therefore, this can be used to display 404 error pages. This causes issues because it will be rendered on every page. In order to prevent this behavior you can wrap your routes in a `<Switch>`. This makes it so that only the first matching `<Route>` will be used. Therefore, put your "404" Route last.

```javascript
import React from 'react';
import {
  BrowserRouter,
  Route,
  Switch
} from 'react-router-dom';

// App components
import Header from './Header';
import Home from './Home';
import About from './About';
import Teachers from './Teachers';
import Courses from './Courses';
import NotFound from './NotFound';

const App = () => (
  <BrowserRouter>
    <div className="container">
      <Header />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/about" render={ () => <About title="About" />} />
        <Route path="/teachers" component={Teachers} />
        <Route path="/courses" component={Courses} />
        <Route component={NotFound} />
      </Switch>
    </div>
  </BrowserRouter>
);

export default App;
```

## Using URL Parameters

You can use URL Parameters inside your routes by creating a route with a path such as this: `<Route path="/teachers/:topic/:fname-:lname" component={Featured} />`. An example URL that would "match" this is `/teachers/JavaScript/Matthew-Long`. **In order to use these parameters you must pass `match` into your function.** You can then access the information passed into an URL like `{match.params.fname}`.

```javascript
import React from 'react';

const Featured = ({match}) => {
  let name = `${match.params.fname} ${match.params.lname}`;
  let topic = match.params.topic;
  return (
    <div className="main-content">
      <h2>{name} </h2>
      <p>Introducing <strong>{name}</strong>, a teacher who loves teaching courses about <strong>{topic}</strong>!</p>
    </div>
  );
}

export default Featured;

```

## Navigating Routes Programmatically

Most of your navigation will be handled with `<Link>` and/or `<NavLink>`. However, **it's possible to programmatically access data that's entered in a form for example, using `ref={}` attributes.**

#### Quiz:

---

**Questions**: Is this a valid route declaration? `<Route componenet={Footer} />`?

**Answer**: Yes. This renders the Footer component no matter which URL path is active.

**Questions**: You can give a URL parameter any name, as long as you include a ____ in front of it.

**Answer**: `:`

**Questions**: Given this route: `<Route path="dogs/:breed" component={Dogs} />`. How do you access the value of the codes `breed` parameter in a component?

**Answer**: `match.params.breed`

**Questions**: The ____ object can be used to programmatically change the URL.

**Answer**: `history`

**Questions**: Which component renders only the first `<Route>` that matches the URL and helps create 404-like routes?

**Answer**: `<Switch>`

---