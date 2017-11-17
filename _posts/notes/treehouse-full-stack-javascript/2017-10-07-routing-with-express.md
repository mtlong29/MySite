---
layout: article

permalink: /notes/routing-with-express/

title: "Routing with Express"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Routing is how users can access different parts of your application."

categories: notes

modified: 2017-10-07
---

{% include /globalSections/toc.html %}

Routing is how users can access different parts of your application.

## POST Requests

A GET request simply asks for data, but when a client sends data to the server it's called a POST request.

Below is a simple express applicatinon:

{% highlight javascript linenos %}
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
{% endhighlight %}

If you wanted to add a new route to the application you would use the `app.get()` method again:

{% highlight javascript linenos %}
app.get('/hello', (req, res) => {
  res.render('hello');
});
{% endhighlight %}

The `hello` pug file (`hello.pug`) will be rendered. The hello pug file looks like the following:

{% highlight html linenos %}
extends layout
block content
  h2 Welcome, student!
  form(action="/hello", method="POST")
    label Please enter your name:
      input(type="text", name="username")
    button(type="submit") Submit
{% endhighlight %}

As you can see the `hello.pug` file is an extension of the `layout.pug` file. It also specifies a `block` of content where it goes. The `layout.pug` file is as follows:

{% highlight html linenos %}
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    include includes/header.pug
    block content
    include includes/footer.pug
{% endhighlight %}

The header and footer are basic.

To submit the form we need to use the `app.post()` method:

{% highlight javascript linenos %}
app.post('/hello', (req, res) => {
  res.render('hello');
});
{% endhighlight %}

Now when we submit the form the form will simply rerender.

## The Request Object

Notice that the `app.post()` methods callback function has two parameters `request` and `response`. We have been using `response`, but not `request`. See <a href="https://expressjs.com/en/4x/api.html#req">the express documentation for request</a> for more information.

There are a lot of properties that can be accessed on the request. The one we're most interested in is the body property. This is where the form response from before will end up. 

To put the form responses into the body, we'll need what is called Middleware.

### Middleware

Middleware is basically some code that fits in the middle of a request or a response. Middleware does something to the incoming data and hands the result of to the rest of your application.

The request object holds a ton of information. Most of the time we won't need many of those properties.

In order to use the body we must first parse it. This can be done using `body-parser`.

{% highlight javascript linenos %}
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
{% endhighlight %}

Now the the form will be parsed and returned to the console. So far what we have done will not yet return to the client.

### Quiz

Question: The request object is a JavaScript bundle of data from the incoming:

Answer: HTTP Request

Question: What property on `req` contins form data once body-parser is installed?

Answer: body

Question: By default, the body property holds an object containing any form responses a client has submitted.

Answer: False

Question: To send data to the server, what kind of request should a client send?

Answer: POST

Question: What piece of middleware makes working with incoming form data easier?

Answer: body-parser

## The Response Object

While the request object allows the application to look at the request that the client has made, the response object offers ways to shape the response back to the client. Read more on the <a href="https://expressjs.com/en/4x/api.html#res">response object on the express documentation</a>. There are many methods that the response object can take. For example,  there is the `res.send()` method. This method sends a response string. We've also used the render method. It merges the data with the templates to urf dynamic pages. There's also a method commonly used to send back data to the client, JSON (`res.json()`). Sometimes clients don't want all the presentation of HTML and CSS, they just want the data. That's what JSON is good for.

Serving data is the primary use for Express for many developers.

### Using the res.json() Method

{% highlight javascript linenos %}
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
{% endhighlight %}

The above will give you a JSON string such as `{"username:""Matthew"}` if you enter "Matthew" into the form.

However, in our app we want HTML so revert these changes.

In the hello template:

{% highlight html linenos %}
extends layout
block content
  if name
    h2 Welcome, #{name}!
  else
    form(action="/hello", method="POST")
      label Please enter your name:
        input(type="text", name="username")
      button(type="submit") Submit
{% endhighlight %}

If you refresh the browser the welcome message will still be there. To make sure you're getting A GET request hit enter in the browser.

### Quiz

Question: What is the response object for?

Answer: Packaging a response to be sent back to the client

Question: The response object's ____ method is used to turn the templates into HTML.

Answer: render

Question: The response object's `send` method can be used to send a string or JSON.

Answer: True

Question: The response object gives us access to data the client has sent to the server, such as values of fields from a form submission.

Answer: False (The request object gives us that ability. The response object is focused on what data the app wants to send back, not what data the app has received.)

Question: What is a good way to send only data to the client?

Answer: JSON

## Statelessness, Setting and Reading Cookies

HTTP is a stateless protocol.

Form submissions often change the url upon submission. The information you enter is the state of the form. As you know if you hit the refresh button or revisit a form it will reset. This is because forms dont retain the state by default. A client must return complete data to a server.

Sometimes applications need to remember things. For example, if you put something into a shopping cart and visit a new page the cart needs to retain its state or it will be difficult to add more things to the cart.

One of the earliest and still most common ways to save the state is with a cookie. A cookie is a piece of data that the service stores on the client, for example, in your web browser.

After receiving the cookie information from the server, when the client makes another request of the server, the client sends the cookie information too. It will even send other cookies that have been previously set perhaps by other web pages on that site.

The client can remind the server of any information it should hand back in its response. So for example, when a user puts some item into the cart, the server writes an item into a cookie and hands it back to the client in the response. THe next time the client sends a request, it inclues the cookie. This way the server can continue to incluge the item in the cart.

One note about cookies. They are stored in your browser by domain. This means that one domain cannot access another domains cookies. This means that Netflic cant see cookies set by Amazon or vice versa.

You can use cookies with the `res.cookie()` method. The cookie method takes a name and a value as well as an options parameter. Learn more <a href="https://expressjs.com/en/4x/api.html#res.cookie">here</a>.

To read the cookie from the request we need to add the cookie property we must use `cookie-parser`. This is similar to how we read the body before. Make sure not to forget to install `cookie-parser` using `npm`.

{% highlight javascript linenos %}
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
{% endhighlight %}

You can go to your application tab in the browsers developers tools to see cookies that have been set. There is also a button there where you can clear the cookie.

Note that it is best to not store sensitive data in a cookie.

### Quiz

Question: What is true of "stateless" interactions between servers and clients?

Answer: Servers dont remember what client made requests and what was requested.

Question: What do cookies?

Answer: Cookies store data on the client.

Question: How can express set a cookie on the client?

Answer: `res.cookie()`

Question: Domains other than the one that set a cookie can access that data freely.

Answer: False

Question: Express can read cookies from requests with no configuation.

Answer: False

## Redirects

Generally, when you submit a form it redirects to a new page. Another example is when you visit a protected page it will redirect you to a login page. Once logged in it will redirect you to the protected page.

After users enter their name, the following will redirect them to the flash cards page.

{% highlight javascript linenos %}
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
{% endhighlight %}

You can now remove the conditional statement from the `hello.pug` page. And you can add the personalized `#{name}` value instead of the general student text.

## Clearing Cookies and Redirecting

Clearing a cookie in express can be done with <a href="https://expressjs.com/en/api.html#res.clearCookie">res.clearCookie() method</a>.

### app.js

{% highlight javascript linenos %}
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
{% endhighlight %}

### index.pug 

{% highlight html linenos %}
extends layout.pug

block content
  section#content
    h2 Welcome, #{name}!
    form(action='/goodbye', method='post')
      button(type='submit') Goodbye
{% endhighlight %}

Note that the previous code example is the correct one. If there are any discrepencies between this and other snippets use this one.

### Quiz

Question: Redirects usually require action from the user to follow the new URL being redirected to.

Answer: False

Question: What is one reason for redirecting after a form submission?

Answer: It prevents forms from being submitted more than once in quick succession.

Question: What is an excellent way to see whether a site has set a cookie?

Answer: By using your browser's developer tools

Question: When do clients normally send cookies to a server?

Answer: Clients send cookies when sending requests to the server.

Question: Redirects require a browser or client to make a second request.

Answer: True