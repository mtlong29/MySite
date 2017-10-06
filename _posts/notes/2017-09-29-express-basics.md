---
layout: article

permalink: /notes/express-basics/

title: "Express Basics"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Express.js is used to build dynamic websites on the Node.js platform. These are notes on the most basic aspects of Express.js such as setup, creating a server, and creating a route."

categories: notes

modified: 2017-09-29
---

{% include /globalSections/toc.html %}

Express.js is used to build dynamic websites on the Node.js platform. These are notes on the most basic aspects of Express.js such as setup, creating a server, and creating a route.

## What is Express?

Express is a web framework that has a set of software tools to create dynamic web applications.

### Web Framework Tools

<ul>
  <li>Templating</li>
  <li>URL Mapping / Routing</li>
  <li>User Input Processing</li>
</ul>

### Benefits of a Web Framework

Using a web framework allows you to build your application quicker. This is because you're not focusing on the mundane aspects of development. 

Using a web framework allows you to focus on what makes your application different than others which is often referred to as business logic.

Using a web framework allows you to undersand other codebases using the same framework.

The same can be said for when other developers are collaborating on your project. If they're already familiar with the framework they can get to that business logic quicker.

### Similar Web Frameworks

The principals learned from Express / Node.js are transferrable to other languages and frameworks:

<ul>
  <li>Express / Node.js</li>
  <li>Flask / Python</li>
  <li>Spark / Java</li>
  <li>Sinatra / Ruby</li>
</ul>

All of the above have similar conventions. If you know one of the frameworks you can get up and running with the other fairly fast.

## Installing Express

The first thing to do when starting a new Node.js project is to install its dependencies.

To initialize a Node.js application use `npm init -y`. The `-y` flag enables all the default settings.

To install express using npm type `npm install express@4.15.2 --save`. The `--save` adds this package to the package.json file.

To add express you most require the express module by typing `const express = require('express');`.

Question: To start a node project in a directory without a package.json file run the following command:

Answer: npm init

Question: Using a web framework gives you more control because it requires you to build all the low level services any application needs, increasing the control you ahve as a developer.

Answer: False

Question: What is a word for solutions to common problems in software?

Answer: Patterns

Question: In order to use node modules in a file, they need to be ____ using the ____ method.

Answer: required, require

Question: Which of the following is not one of the primary tools we will use in this course?

Answer: An IDE

## Creating a Server in Express

Express sets up a server on a local computer. It's job is to wait for HTTP requests from clients. When you're ready to make your application available to the public you'll need to deploy the project to a remote server.

To create an express application you can just call `express();`. You can make this a variable as well, by typing `const app = express();`. You would want to make it a cariable because it will be extended throughout the application.

The next thing is setting up the development server which is the listen method. The listen method has one parameter which is the port number. This looks like the following: `app.listen(3000)`.

You now have an express application. Start the app by running `node app.js` in the console. Now go to `localhose:3000` in the browser. You will get an error message, because express has not been told how to respond yet.

## Creating a Route with Express

Routes are essential to any web framework. Express handles requests through routes. Through a users perspective a route is just like a url. It's the path a user takes to access data on the server. A route, also called an endpoint, is a command to run a specific function. Which in turn sends a response back to the client. For example, `/about` tells the application to load the content for the about page.

To create a route use the `.get()` method on the app object. This will be the route to follow if the user just visits our site. The first parameter for the `.get()` method is the `'/'`, or root route. The second parameter is an anonymous callback function which also takes two parameters. These parameters will be the `request` and `repsonse`. This callback will run when the client requests this route.

For now, the example will use the send method.

{% highlight javascript linenos %}
const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.listen(3000);
{% endhighlight %}

There is a module called `nodemon` that can be used to monitor any changes in your source and automatically restart your server. Install nodemon by typing `npm install -g nodemon` in the console. To use it make sure the package.json has the apparopriate main entry file which will be app.js for this example. Now run this by typing `nodemon` in the console.

Question: The `app.listen` method can take a parameter, which will tell the server:

Answer: The port to serve the application on.

Question: In express, the convention for creating a new application, is to assign it to the variable ____: (e.g. const ____ = express();)

Answer: app

Question: The `get` method takes two parameters ____ and ____.

Answer: path, callback

Question: A route is where a server is set up to respond to a ____ from a client.

Answer: request

Question: The `get` method registers a route that will listen for HTTP ____ requests at a given route.

Answer: GET

## Adding Multiple Routes to the App

<a href="http://expressjs.com/en/api.html">Express</a> applications will have several (and often many) routes. 

Adding a second route is very simple. Simply copy and paste the root route and change the first parameter to the new route. For this example, it is `/hello`. You can see this page by going to `localhost:3000/hello`.

Also, note that the parameters in the callback function were changed to `req` and `res`, because these are used most often in examples across the internet.

Also, adding the `<h1>` tag now serves html to the page.

{% highlight javascript linenos %}
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
});

app.get('/hello', (req, res) => {
  res.send('<h1>Hello you!</h1>');
});

app.listen(3000, () => {
  console.log('The application is runnong on localhost:3000!');
});
{% endhighlight %}

Using the `send()` method is not the best way to serve html to the page. The best way is templating. See following pages for templating.