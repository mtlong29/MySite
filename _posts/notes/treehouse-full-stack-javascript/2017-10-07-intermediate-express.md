---
layout: article

permalink: /notes/intermediate-express/

title: "Intermediate Express"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Routing is how users can access different parts of your application. These notes describe how to add a new route, how to use post(), json(), send(), cookie(), clearCookie(), use(), next(), and render() methods. These notes also go into detail what request response parameters mean with routing as well as their cycle. Middleware is also discussed. Middleware is an essential component of Express. In fact, just about everything written in Express is Middleware. Middleware is between the request response cycle. You can have as much pieces of Middleware you want before sending a response. Notes on a fourth parameter other than request, middleware, and response is discussed which is used for errors. Parameters, Query Strings, and Modularizing Routes are discussed. Lastly, notes on how to serve static files in Express."

categories: notes

date: 2017-10-07
---

{% include /globalSections/toc.html %}

**Routing is how users can access different parts of your application.** These notes describe *how to add a new route*, how to use *post()*, *json()*, *send()*, *cookie()*, *clearCookie()*, *use()*, *next()*, and *render()* methods. These notes also go into **detail what request response parameters** mean with routing as well as their cycle. Middleware is also discussed. **Middleware is an essential component of Express.** In fact, **just about everything written in Express is Middleware**. Middleware is between the request response cycle. You can have as much pieces of Middleware you want before sending a response. Lastly, notes on a **fourth parameter** other than request, middleware, and response is discussed which is **used for errors**. Parameters, Query Strings, and Modularizing Routes are discussed. Lastly, notes on how to serve static files in Express.

## POST Requests

>A GET request simply asks for data, but when a client sends data to the server it's called a POST request.

Below is a simple express application:

```javascript
const express = require('express');
const app = express();

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cards', (req, res) => {
  res.render('card', { 
    prompt: "Who is buried in Grant's tomb?"
  });
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

If you wanted to **add a new route** to the application you would use the `app.get()` method again:

```javascript
app.get('/hello', (req, res) => {
  res.render('hello');
});
```

The `hello` pug file (`hello.pug`) will be rendered. The hello pug file looks like the following:

```html
extends layout
block content
  h2 Welcome, student!
  form(action="/hello", method="POST")
    label Please enter your name:
      input(type="text", name="username")
    button(type="submit") Submit
```

As you can see the `hello.pug` file is an extension of the `layout.pug` file. It also specifies a `block` of content where it goes. The `layout.pug` file is as follows:

```html
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    include includes/header.pug
    block content
    include includes/footer.pug
```

The header and footer are basic. To submit the form we need to use the `app.post()` method:

```javascript
app.post('/hello', (req, res) => {
  res.render('hello');
});
```

Now when we submit the form the form will simply *rerender*.

## The Request Object

Notice that the `app.post()` methods callback function has two parameters `request` and `response`. We have been using `response`, but not `request`. See [the express documentation for request](https://expressjs.com/en/4x/api.html#req) for more information. There are a lot of properties that can be accessed on the request. The one we're most interested in is the body property. This is where the form response from before will end up. **To put the form responses into the body, we'll need what is called Middleware.**

#### Middleware

>Middleware is basically some code that fits in the middle of a request or a response. 

Middleware does something to the incoming data and hands the result of to the rest of your application. **The request object holds a ton of information.** Most of the time we won't need many of those properties. **In order to use the body we must first parse it. This can be done using `body-parser`.**

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cards', (req, res) => {
  res.render('card', { 
    prompt: "Who is buried in Grant's tomb?"
  });
});

app.post('/hello', (req, res) => {
  res.render('hello');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

Now the the form will be parsed and returned to the console. So far what we have done will not yet return to the client.

#### Quiz:

---

**Question**: The request object is a JavaScript bundle of data from the incoming:

**Answer**: HTTP Request

**Question**: What property on `req` contains form data once body-parser is installed?

**Answer**: body

**Question**: By default, the body property holds an object containing any form responses a client has submitted.

**Answer**: False

**Question**: To send data to the server, what kind of request should a client send?

**Answer**: POST

**Question**: What piece of middleware makes working with incoming form data easier?

**Answer**: `body-parser`

---

## The Response Object

**While the request object allows the application to look at the request that the client has made, the response object offers ways to shape the response back to the client.** Read more on the [response object on the express documentation](https://expressjs.com/en/4x/api.html#res). There are many methods that the response object can take. For example, there is the `res.send()` method. This method *sends a response string*. We've also used the render method. It merges the data with the templates to urf dynamic pages. **There's also a method commonly used to send back data to the client, JSON (`res.json()`).** Sometimes clients don't want all the presentation of HTML and CSS, they just want the data. That's what JSON is good for.

>Serving data is the primary use for Express for many developers.

#### Using the res.json() Method

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cards', (req, res) => {
  res.render('card', { 
    prompt: "Who is buried in Grant's tomb?"
  });
});

app.post('/hello', (req, res) => {
  res.json(req.body);
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

The above will give you a JSON string such as `{"username:""Matthew"}` if you enter "Matthew" into the form.mHowever, in our app we want HTML so revert these changes. In the hello template:

```html
extends layout
block content
  if name
    h2 Welcome, #{name}!
  else
    form(action="/hello", method="POST")
      label Please enter your name:
        input(type="text", name="username")
      button(type="submit") Submit
```

If you refresh the browser the welcome message will still be there. To make sure you're getting A GET request hit enter in the browser.

#### Quiz:

---

**Question**: What is the response object for?

**Answer**: Packaging a response to be sent back to the client

**Question**: The response object's ____ method is used to turn the templates into HTML.

**Answer**: render

**Question**: The response object's `send()` method can be used to send a string or JSON.

**Answer**: True

**Question**: The response object gives us access to data the client has sent to the server, such as values of fields from a form submission.

**Answer**: False (The request object gives us that ability. The response object is focused on what data the app wants to send back, not what data the app has received.)

**Question**: What is a good way to send only data to the client?

**Answer**: JSON

---

## Statelessness, Setting and Reading Cookies

>HTTP is a stateless protocol.

Form submissions often change the url upon submission. The *information you enter is the state of the form*. As you know if you hit the refresh button or revisit a form it will reset. This is because forms dont retain the state by default. A client must return complete data to a server. Sometimes applications need to remember things. For example, if you put something into a shopping cart and visit a new page the cart needs to retain its state or it will be difficult to add more things to the cart. **One of the earliest and still most common ways to save the state is with a cookie.** 

>A cookie is a piece of data that the service stores on the client, for example, in your web browser.

**After receiving the cookie information from the server, when the client makes another request of the server, the client sends the cookie information too.** It will even send other cookies that have been previously set perhaps by other web pages on that site. The client can remind the server of any information it should hand back in its response. So for example, when a user puts some item into the cart, the server writes an item into a cookie and hands it back to the client in the response. THe next time the client sends a request, it includes the cookie. This way the server can continue to include the item in the cart. One note about cookies. They are stored in your browser by domain. This means that one domain cannot access another domains cookies. This means that Netflix cant see cookies set by Amazon or vice versa.

**You can use cookies with the `res.cookie()` method.** The cookie method takes a name and a value as well as an options parameter. Learn more [here](https://expressjs.com/en/4x/api.html#res.cookie). **To read the cookie from the request we need to add the cookie property we must use `cookie-parser`.** *This is similar to how we read the body before.* Make sure not to forget to *install* `cookie-parser` using `npm`.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  res.render('index');
});

app.get('/cards', (req, res) => {
  res.render('card', { 
    prompt: "Who is buried in Grant's tomb?"
  });
});

app.get('/hello', (req, res) => {
  res.render('hello', {
    name: req.cookies.username
  });
});

app.post('/hello', (req, res) => {
  res.cookie('username', res.body.username);
  res.json(req.body);
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

You can go to your application tab in the browsers developers tools to see cookies that have been set. There is also a button there where you can clear the cookie.

>Note that it is best to not store sensitive data in a cookie.

#### Quiz:

---

**Question**: What is true of "stateless" interactions between servers and clients?

**Answer**: Servers dont remember what client made requests and what was requested.

**Question**: What do cookies?

**Answer**: Cookies store data on the client.

**Question**: How can express set a cookie on the client?

**Answer**: `res.cookie()`

**Question**: Domains other than the one that set a cookie can access that data freely.

**Answer**: False

**Question**: Express can read cookies from requests with no configuration.

**Answer**: False

---

## Redirects

**Generally, when you submit a form it redirects to a new page.** Another example is when you visit a protected page it will redirect you to a login page. Once logged in it will redirect you to the protected page. After users enter their name, the following will redirect them to the flash cards page.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  cont name = 'req.cookies.username'
  res.render('index', { name });
});

app.get('/cards', (req, res) => {
  res.render('card', { 
    prompt: "Who is buried in Grant's tomb?"
  });
});

app.get('/hello', (req, res) => {
  res.render('hello', { name: req.cookies.username });
});

app.post('/hello', (req, res) => {
  res.cookie('username', res.body.username);
  res.redirect('hello', { '/' });
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

You can now remove the conditional statement from the `hello.pug` page. And you can add the personalized `#{name}` value instead of the general student text.

## Clearing Cookies and Redirecting

Clearing a cookie in express can be done with [`res.clearCookie()` method](https://expressjs.com/en/api.html#res.clearCookie).

#### app.js

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const app = express();

app.use(bodyParser.urlencoded({
  extended: false
}));

app.use(cookieParser());

app.set('view engine', 'pug');

app.get('/', (req, res) => {
  const name = 'req.cookies.username';
  res.render('index', { name });
});

app.get('/cards', (req, res) => {
  res.render('card', { 
    prompt: "Who is buried in Grant's tomb?"
  });
});

app.get('/hello', (req, res) => {
  const name = 'req.cookies.username';
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

#### index.pug 

```html
extends layout.pug

block content
  section#content
    h2 Welcome, #{name}!
    form(action='/goodbye', method='post')
      button(type='submit') Goodbye
```

*Note that the previous code example is the correct one. If there are any discrepancies between this and other snippets use this one.*

#### Quiz:

---

**Question**: Redirects usually require action from the user to follow the new URL being redirected to.

**Answer**: False

**Question**: What is one reason for redirecting after a form submission?

**Answer**: It prevents forms from being submitted more than once in quick succession.

**Question**: What is an excellent way to see whether a site has set a cookie?

**Answer**: By using your browser's developer tools

**Question**: When do clients normally send cookies to a server?

**Answer**: Clients send cookies when sending requests to the server.

**Question**: Redirects require a browser or client to make a second request.

**Answer**: True

---

Middleware is so integral to Express just about everything you write in Express is Middleware. Consider when someone asks you a question, you think about it, then you answer. Middleware is that with the request response cycle. There can be as many pieces of Middleware as you want to have before sending a response.

## Basic Middleware Structure

>The basic structure of middleware code is very simple. It's a function with three parameters, `request`, `response`, and `next`.

Inside the function, Middleware can read and modify the request and response objects.

```javascript
(req, res, next) => {}
```

>To run middleware in response to requests, pass it into `app.use()`:

```javascript
app.use((req, res, next) => {});
```

This will run the middleware function for every route. To only run it for a specific route, pass the router argument in before the middleware function:

```javascript
app.use('/users', (req, res, next) => {});
```

You can also limit the middleware to only use GET requests. This is done by using `get` instead of `use`:

```javascript
app.get('/users', (req, res, next) => {});
```

**This is very similar to using routes, the only difference is `next` has not been used yet.**

## Middleware Sequence and Routing

In the below example, you can create a message and send it to the `next()` function. Next, it can be logged to the console.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

app.use((req, res, next) => {
    req.message = 'This message made it!';
    next();
});

app.use((req, res, next) => {
    console.log(req.message);
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.render('index', { name });
    } else {
      res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
```

#### Quiz:

---

**Question**: How is middleware added to an Express application?

**Answer**: By passing a function to `app.use()`

**Question**: When is `next` called in express middleware?

**Answer**: When the middlewares work is done

**Question**: Express will only accept one middleware function per call to `app.use()`

**Answer**: False

**Question**: Middleware functions always execute in a specific sequence

**Answer**: True

**Question**: What objects does middleware have access to through its parameters?

**Answer**: The request and response objects

---

## The 'next()' function and a Closer Look at Middleware

`next()` is an important function in Express. 

>If middleware is not "closed out" with a `next()` the app will hang and not load. 

You can experience this by removing the first `next()` and logging out `hello`. You will see `hello` in the console (terminal), but the app won't load. However, if there is a response being sent to the client the middleware is ended and the app will load properly. You can use `send()`, `render()`, and `json()` for example. The main thing to remember is you end middleware by either saying `next()` or sending a response. Knowing this, the entire app is actually middleware.

#### Closures in JavaScript

An outer function that returns an inner function is a common occurrence in JavaScript, and it's also known as [closure](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures).

```javascript
function middleware() {
  return function(req, res, next) {
    // middeware logic
  }
}
middleware() // => function
```

## Handling Errors in an Express App

Handling errors is an important (and easy to overlook) topic any program should address.

>In Express, you can use the `next()` function to signal an error in your app. 

**By passing an object as a parameter to next, Express knows there is an error to handle.** Express will then immediately terminate and handle the error.

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

app.use((req, res, next) => {
    console.log("Hello");
    const err = new Error('Oh noes!');
    next(err);
});

app.use((req, res, next) => {
    console.log("world!");
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.render('index', { name });
    } else {
      res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
```

Running the above will give you the *Error: "Oh noes!"*. There will also be more information such as location of where the error occurred. The program is interrupted by the error so "world" will never get logged. More readable error messages will make things easier.

#### Quiz:

---

**Question**: How do you tell express about an error that needs to be handled?

**Answer**: Pass it into the `next()` function.

**Question**: What HTTP Status code correlates with a message of "Not Found"?

**Answer**: 404

**Question**: What is the behavior of an app where middleware calls neither `next()` nor `sends()` a response the the client?

**Answer**: The app appears to hang indefinitely

**Question**: What is one reason it's important to handle errors in an application?

**Answer**: It helps users understand how to interact with your app.

**Question**: The `next()` function must always be called to end a middleware function.

**Answer**: False

---

## Error Handling Middleware

While express middleware has three parameters, error middleware has four.

```javascript
// Middleware
(req, res, next) => {}

Error Middleware
(err, req, res, next) => {}
```

**Error middleware is normal middleware except with a fourth parameter.** This is where Express will pass the error object to itself. When an object is passed into the next call, Express jumps to the first middleware it can find, with four parameters. **If there isn't a middleware with four parameters Express will use its own.** In other words, Express invokes its own native handler inside its code base. We can overwrite that behavior by putting it in our own error handler, which will serve a custom template back to the client.

```javascript
app.use((req, res, next) => {
    console.log("Hello");
    const err = new Error('Oh noes!');
    err.status = 500;
    next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});
```

```html
extends layout

block content
  h1= error.message
  h2= error.status
  pre= error.stack
```

#### Handling 404 Errors

Adding a 404 status code error to your app.

```javascript
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
```

#### Current Express Application

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

app.use((req, res, next) => {
    console.log("Hello");
    const err = new Error('Oh noes!');
    err.status = 500;
    next(err);
});

app.use((req, res, next) => {
    console.log("world!");
    next();
});

app.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.render('index', { name });
    } else {
      res.redirect('/hello');
    }
});

app.get('/cards', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});

app.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

app.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

app.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
```

#### Quiz:

---

**Question**: Locals can be set directly on the response object, on the locals property.

**Answer**: True

**Question**: Where is the best place to put middleware that creates a 404 error?

**Answer**: After all the other routes have been declared

**Question**: How is error handling middleware differentiated from other middleware?

**Answer**: It has four parameters as opposed to three

**Question**: What does a 404 error mean?

**Answer**: Express couldn't match the requested route to any of it's route handlers.

**Question**: What happens if we don't implement our own error handler in an express app?

**Answer**: Express handles errors with default middleware

---

## Modular Routes

>Creating a modular app is easy. First, create a folder to hold your routes files. Call it `routes`. In the routes folder create `index.js`. At the top require express. With express, create a new route using the `router`. Next, replace `app` with `router`. Finally, export the file using `module.exports()`.

Next, in the `app.js` file import or require the routes file. Finally, use `app.use` to specify the routes. Create the `cards` route in the routes folder. You can cut the route from `index.js` and paste it into its own file. Don't forget to export and require it like the `routes/index.js` file.

#### routes/index.js

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    const name = req.cookies.username;
    if (name) {
      res.render('index', { name });
    } else {
      res.redirect('/hello');
    }
});

router.get('/hello', (req, res) => {
  const name = req.cookies.username;
  if (name) {
    res.redirect('/');
  } else {
    res.render('hello');
  }
});

router.post('/hello', (req, res) => {
  res.cookie('username', req.body.username);
  res.redirect('/');
});

router.post('/goodbye', (req, res) => {
  res.clearCookie('username');
  res.redirect('/hello');
});

module.exports = router;
```

#### routes/cards.js

```javascript
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});

module.exports = router;
```

#### app.js

```javascript
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

const app = express();

app.use(bodyParser.urlencoded({ extended: false}));
app.use(cookieParser());

app.set('view engine', 'pug');

const mainRoutes = require(./routes);
const cardRoutes = require(./routes/cards);

app.use(mainRoutes);
app.use('/cards', cardRoutes);

app.use((req, res, next) => {
    console.log("Hello");
    const err = new Error('Oh noes!');
    err.status = 500;
    next(err);
});

app.use((req, res, next) => {
    console.log("world!");
    next();
});

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.use((err, req, res, next) => {
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

app.listen(3000, () => {
    console.log('The application is running on localhost:3000!')
});
```

## Using Data and Route Parameters

**Web applications need data!** For a flashcard application, you will need questions and answers as data. If users need a login this will also be stored in data. To get started using data in an Express app start by creating a folder named `data`. In that folder create a file called `flashcardData.json`. This data may look like the following:

```javascript
{
  "data": {
    "title": "JavaScript Flashcards",
    "cards": [
      {
        "question": "What language are Express apps written in?",
        "hint": "It starts with a \"J\"",
        "answer": "JavaScript"
      },
      {
        "question": "What is one way a website can store data in a user's browser?",
        "hint": "They are delicious with milk",
        "answer": "Cookies"
      },
      {
        "question": "What is a common way to shorten the response object's name inside middleware?",
        "hint": "It has the same abbreviation as \"resolution\"",
        "answer": "res"
      },
      {
        "question": "How many different values can booleans have?",
        "hint": "Think: binary",
        "answer": "2"
      },
      {
        "question": "Which HTML element can contain JavaScript?",
        "hint": "It starts with an \"s\"",
        "answer": "<script>"
      }
    ]
  }
}
```

To use this data, you must require it. Require it in the `cards.js` file:

```javascript
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', (req, res) => {
    res.render('card', { 
      prompt: cards[0].question,
      hint: cards[0].hint 
    });
});

module.exports = router;
```

**Note the `const { data }` format.** This is equivalent to:

```javascript
const data  = require('../data/flashcardData.json').data;
const cards = data.cards;
```

To pull any card you want in the browser you will need a route parameter. **A route parameter is a variable that a user can put right into the URL to point to a particular resource.** For our current URL, we want to place a number at the end indicating which card to display. In express, we can indicate a route parameter right where we declared the URL. **Use a colon to tell Express to treat this part of the URL as a variable.** And if we put `:id` for example, Express will treat this portion of the URL as a variable or a route parameter named `id`. The value for the route parameter from the URL will be stored in the request object params property.

```javascript
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
    res.render('card', { 
      prompt: cards[req.params.id].question,
      hint: cards[req.params.id].hint 
    });
});

module.exports = router;
```

#### Quiz:

---

**Question**: Why is it a good idea to keep routes in files separate from the main app?

**Answer**: As the app grows, this will keep your code well organized.

**Question**: How do you create a router instance in a router file?

**Answer**: `express.Router();`

**Question**: `express.Router()` creates an object that behaves similar to the `app` object.

**Answer**: True

**Question**: How can an express app get access to a route parameter?

**Answer**: From the `req.params` object

---

## Query Strings

The problem now is how are we going to view the answer for the question. One possibility is new URLs for questions and answers such as `/cards/4/question` and `/cards/4/answer`. This would work. There's another option called a query string. This is what the `?` in the URL is. For example, `/cards/4?key=value`. You can separate additional values with an ampersand like: `/cards/4?key=value&key2=value2`. For our card application, we could use `/cards/4?side=question` and `/cards/4?side=answer`. Checking for a query string is similar to checking for route parameter or cookie. It will be under the `query` property of the `req` object: `req.query.side`.

#### cards.js

```javascript
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];
  const templateData = { text, hint };
  res.render('card', templateData);
});

module.exports = router;
```

#### card.pug

```html
extends layout.pug

block content
  section#content
    h2= text
    if hint
      p
        i Hint: #{hint}
```

This ensures the question or the answer will show up. Now you can type the URL `/cards/4?side=question` and `/cards/4?side=answer` to see the questions and answers.

#### Adding Links

If you want the hint to only show when the question side is open you will need to add a conditional statement around the hint and remove it from the templateData constant:

```javascript
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { text };

  if (side === 'question') {
    templateData.hint = hint;
  }

  res.render('card', templateData);
});

module.exports = router;
```

Note: **In Pug you can use JavaScript template literals. Template literals make it much easier to read JavaScript instead of string concatenation.**

```html
// Pug
h1 Hi #{animal}!
h1= `Hi ${animal}!`
h1(title='Hi ' + animal + '!') text
h1(title=`H1 ${animal}!`) text
// HTML
<h1>Hi, aardvark!</h1>
<h1>Hi, aardvark!</h1>
<h1 title="Hi aardvark!">text</h1>
<h1 title="Hi aardvark!">text</h1>
```

If you want to add a link to go from the `question` to the `answer` side of the cards you will need start by modifying the `card.pug` template:

```html
extends layout.pug

block content
  section#content
    h2= text
    if hint
      p
        i Hint: #{hint}
    a(href=`${id}?side=${sideToShow}`)= sideToShowDisplay
```

Next we need to pass in the new values into the `card.js` and add and else if clause:

```javascript
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text };

  if ( side === 'question' ) {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if ( side === 'answer' ) {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData);
});

module.exports = router;
```

#### Quiz:

---

**Question**: Pug templates support Javascript string interpolation.

**Answer**: True

**Question**: How do you get query information from a uRL?

**Answer**: `req.query`

**Question**: What symbol in a URL marks the beginning of a query string?

**Answer**: `?`

**Question**: Given the URL (http://example.com/resource?building=42&age=40&color=salmon), what is the value of "age" in the query string?

**Answer**: `40`

**Question**: What does a query string contain?

**Answer**: key value pairs

---

#### Randomize Cards

In the `cards.js` file you can use `Math.random()` to select a random card:

```javascript
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', ( req, res ) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/cards/${flashcardId}?side=question`)
});

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text };

  if ( side === 'question' ) {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if ( side === 'answer' ) {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData);
});

module.exports = router;
```

As you can see *a new route was created*. Then the total number of cards was determined using the `.length` property. A random number was generated using `Math.random()`. Finally, that number is plugged into the URL.

#### Linking Around the Application

Redirect users to show the question side of the card by default:

```javascript
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', ( req, res ) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/cards/${flashcardId}`)
});

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;

  if (!side) {
    return res.redirect('/cards/${id}?side=question');
  }

  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text };

  if ( side === 'question' ) {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if ( side === 'answer' ) {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData);
});

module.exports = router;
```

*As you can see you can also remove the query string from the random string to clean up the code a little.* However, now if you enter anything other than a valid card number it will direct you to something you dont want. You can place another link on the page that will move the user to another card:

```html
extends layout.pug

block content
  section#content
    h2= text
    if hint
      p
        i Hint: #{hint}
    a(href=`${id}?side=${sideToShow}`)= sideToShowDisplay
    br
    a(href='/cards') Next card
```

Giving the users a way to get from the homepage to the flashcards:

```html
extends layout.pug

block content
  section#content
    h2= Welcome, #{name}!
    form(action='/goodbye', method='post')
      button(type='submit') Goodbye
    p
      a(href='/cards') Begin!
```

Next, move the goodbye button to the layout template.

```html
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    include includes/header.pug
    h2= Welcome, #{name}!
    form(action='/goodbye', method='post')
      button(type='submit') Goodbye
    block content
    include includes/footer.pug
```

Lastly, you need to add the name value that is stored in the cookie to the `cards.js` file. Don't forget to add the name to the `templateData` object.

```javascript
const express = require('express');
const router = express.Router();
const { data } = require('../data/flashcardData.json');
const { cards } = data;

router.get('/', ( req, res ) => {
  const numberOfCards = cards.length;
  const flashcardId = Math.floor(Math.random() * numberOfCards);
  res.redirect(`/cards/${flashcardId}`)
});

router.get('/:id', (req, res) => {
  const { side } = req.query;
  const { id } = req.params;

  if (!side) {
    return res.redirect('/cards/${id}?side=question');
  }
  const name = req.cookies.username;
  const text = cards[id][side];
  const { hint } = cards[id];

  const templateData = { id, text, name };

  if ( side === 'question' ) {
    templateData.hint = hint;
    templateData.sideToShow = 'answer';
    templateData.sideToShowDisplay = 'Answer';
  } else if ( side === 'answer' ) {
    templateData.sideToShow = 'question';
    templateData.sideToShowDisplay = 'Question';
  }

  res.render('card', templateData);
});

module.exports = router;
```

Now if you go to the goodbye the welcome and goodbye still appears. You can hide this with a conditional on the layout template.

```html
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    include includes/header.pug
    if name
      h2= Welcome, #{name}!
      form(action='/goodbye', method='post')
        button(type='submit') Goodbye
    block content
    include includes/footer.pug
```

#### Quiz:

---

**Question**: Where are cookies stored?

**Answer**: On the client

**Question**: What is one of the benefits of template rendering?

**Answer**: It reduces repetition you would otherwise need to have in your HTML files

**Question**: What happens when an object is passed into the `next` function?

**Answer**: Execution is passed to the next error handling middleware function.

**Question**: How do you get cookies from a client's request? 

**Answer**: `req.cookies`

**Question**: What are two ways of putting data into a URL to be sent to the server?

**Answer**: query strings and url parameters

---

## Serving Static Files

>Web pages need CSS and other assets to look good. Express can supply those with what's called a static server.

#### What Are Static Assets?

**When a browser makes a git request it receives HTML. However, there's no file called `index.html`. This means the app has to assemble it.** Browsers use HTML, CSS, and JS files. Express doesn't need to build the HTML and CSS. **The JavaScript on the server and the JavaScript on the client are completely different. To send images, CSS, and other static files the Express app uses what is called a Static Server.** It sends these files straight to the client. In other words static apps consist of a series of HTML files, CSS, files, and images that represent a physical page of a website. Dynamic apps use server technologies (such as Express) to dynamically build an app right when a user visits the page. Using dynamic websites/apps allows easier design updates, more flexible data, and easier content updates. In the vast majority of app projects, dynamic sites pay off in the end.

#### Adding Static Assets to the App

To serve static assets look at the `express.static()` documentation [here](https://expressjs.com/en/4x/api.html#express.static). You can create a folder in the root directory called `public`. This is common terminology for static files being server. In the app.js file you will type `app.use(express.static('public'))`. Now the folder is available. You can type `/stylesheets/style.css` in the browser if that is where the route is. However, it would be safer if you could just type `/static/stylesheets/style.css`. To do this add `static` to the above: `app.use('static', express.static('public'))`. To actually use these styles you will need to link to it in your HTML:

```html
doctype html
html(lang="en")
  head
    title Flash Cards
    style(rel='stylesheet', href='static/styesheets/style.css')
  body
    include includes/header.pug
    if name
      h2 Welcome, #{name}!
      form(action='/goodbye', method='post')
        button(type='submit') Goodbye
    block content
    include includes/footer.pug
```

#### Merging the Design Files

You can google and find a Pug to HTML converter. The main objective of this will be to match the designers classes, id's, and pictures with your pug template.

#### Quiz:

---

**Question**: What overall problem do cookies attempt to solve?

**Answer**: How to store state

**Question**: What overall problem do query strings attempt to solve?

**Answer**: How to pass information to the server

**Question**: What overall problem does templating attempt to solve?

**Answer**: How to write and reuse HTML

**Question**: What overall problem do redirects attempt to solve?

**Answer**: How to move the client to a different URL

**Question**: Where are static assets executed?

**Answer**: The client executes them

**Question**: Express cannot read and execute client-side JavaScript

**Answer**: True

---