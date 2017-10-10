---
layout: article

permalink: /notes/express-middleware/

title: "Express Middleware"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on another essential component of Express, middleware."

categories: notes

modified: 2017-10-08
---

{% include /globalSections/toc.html %}

Middleware is so integral to Express just about everything you write in Express is Middleware. Consider when someone asks you a question, you think about it, then you answer. Middleware is that with the request response cycle. There can be as many pieces of Middleware as you want to have before sending a response.

## Basic Structure

The basic structure of middleware code is very simple. It's a function with three parameters, `request`, `response`, and `next`.

Inside the function, Middleware can read and modify the request and response objects.

{% highlight javascript linenos %}
(req, res, next) => {}
{% endhighlight %}

To run middleware in response to requests, pass it into `app.use()`:

{% highlight javascript linenos %}
app.use((req, res, next) => {});
{% endhighlight %}

This will run the middleware function for ever route. To only run it for a specific route, pass the router argument in before the middleware function:

{% highlight javascript linenos %}
app.use('/users', (req, res, next) => {});
{% endhighlight %}

You can also limit the middleware to only use GET requests. This is done by using `get` instead of `use`:

{% highlight javascript linenos %}
app.get('/users', (req, res, next) => {});
{% endhighlight %}

This is very similar to using routes, the only difference is `next` has not been used yet.

## Middleware Sequence and Routing

In the below example, you can create a message and send it to the `next()` function. Next, it can be logged to the console.

{% highlight javascript linenos %}
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
{% endhighlight %}

### Quiz

Question: How is middleware added to an Express application?

Answer: By passing a function to `app.use()`

Question: When is `next` called in express middleware?

Answer: When the middlewares work is done

Question: Express will only accept one middleware function per call to `app.use()`

Answer: False

Question: Middleware functions always execute in a specific sequence

Answer: True

Question: What objects does middleware have access to through its parameters?

Answer: The request and response objects

## The 'next' function and a Closer Look at Middleware

`next` is an important function in Express. If middleware is not "closed out" with a `next` the app will hang and not load. You can experience this by removing the first `next()` and logging out `hello`. You will see `hello` in the console (terminal), but the app won't load.

However, if there is a response being sent to the client the middleware is ended and the app will load properly. You can use `send()`, `render()`, and `json()` for example.

The main thing to remember is you end middleware by either saying `next()` or sending a response. Knowing this, the entire app is actually middleware.

### Closures in JavaScript

An outer function that returns an inner function is a common ocurence in JavaScript, and it's also known as <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Closures"closure</a>.

{% highlight javascript linenos %}
function middleware() {
  return function(req, res, next) {
    // middeware logic
  }
}
middleware() // => function
{% endhighlight %}

## Handling Errors in an Express App

Handling errors is an important (and easy to overlook) topic any program should address.

In express, you can use the `next()` function to signal an error in your app. By passing an object as a parameter to next, Express knows there is an error to handle. Express will then immediately terminate and handle the error.

{% highlight javascript linenos %}
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
{% endhighlight %}

Running the above will give you the Error: "Oh noes!". There will also be more information such as location of where the error occured. The program is interrupted by the error so "world" will never get logged. More readable error messages will make things easier.

### Quiz

Question: How do you tell express about an error that needs to be handled?

Answer: Pass it into the `next` function.

Question: What HTTP Status code correlates with a message of "Not Found"?

Answer: 404

Question: What is the behavior of an app where middleware calls neither next nor sends a response the the client?

Answer: The app appears to hang indefinitely

Question: What is one reason it's important to handle errors in an application?

Answer: It helps users understand how to interact with your app.

Question: The `next` function must always be called to end a middleware function.

Answer: False

## Error Handling Middleware

While express middleware has three parameters, error middleware has four.

{% highlight javascript linenos %}
// Middleware
(req, res, next) => {}

Error Middleware
(err, req, res, next) => {}
{% endhighlight %}

Error middleware is normal middleware except with a fourth parameter. This is where Express will pass the error object to itself. When an object is passed into the next call, Express jumps to the first middleware it can find, with four parameters. If there isn't a middleware with four parameters express will use its own. In other words, Express invokes its own native handler inside its code base. We can overwrite that behavior by putting it in our own error handler, which will serve a custom temlate back to the client.

{% highlight javascript linenos %}
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
{% endhighlight %}

{% highlight html linenos %}
extends layout

block content
  h1= error.message
  h2= error.status
  pre= error.stack
{% endhighlight %}

## Handling 404 Errors

Adding a 404 status code error to your app.

{% highlight javascript linenos %}
app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});
{% endhighlight %}

## Current Express App

{% highlight javascript linenos %}
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
{% endhighlight %}

### Quiz

Question: Locals can be set directly on the response object, on the locals property.

Answer: True

Question: Where is the best place to put middleware that creates a 404 error?

Answer: After all the other routes have been declared

Question: How is error handling middleware differentiated from other middleware?

Answer: It has four parameters as opposed to three

Question: What does a 404 error mean?

Answer: Express couldn't match the requested route to any of it's route handlers.

Question: What happens if we don't implement our own error handler in an express app?

Answer: Express handles errors with default middleware