---
layout: article

permalink: /notes/build-a-simple-dynamic-site-with-nodejs/

title: "Build a Simple Dynamic Site with Node.js"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Node.js is a versatile platform for building all sorts of applications. These notes are about the creation of a dynamic website that displays treehouse student profile information by creating a server that will dynamically generate content, handle URLs, read from files and build a simple template engine."

categories: notes

modified: 2017-09-19
---

{% include /globalSections/toc.html %}

Node.js is a versatile platform for building all sorts of applications. These notes are about the creation of a dynamic website that displays treehouse student profile information by creating a server that will dynamically generate content, handle URLs, read from files and build a simple template engine.

## HTTP Servers

A web browser is an application that is used to download and render HTML and CSS and execute any client side JavaScript. You type in a website address into a browser's address bar and hit enter, and it sends a request for information to a server or a computer on the internet that has that domain name assigned to it.

Part of the information that the server receives in the request is the address or the URL that the client has entered. A URL will have a path to a file like `index.html`.

The software running on the server like Apache or NGINX, will be configured to look for a certain directory on the server and look for the file, and in trun reads its contents and sends it back to the browser. 

### Protocol

The way the browsers and the web server agree to communicate is called a Protocol. The protocol that the browser and web servers use is Hypertext Transfer Protocol or HTTP.

You can refer to the software on the server as an HTTP Server and the browser as an HTTP Client.

### Dynamic Sites

Now, what happens when you want a dynamic site, for example, if I wanted a PHP script to run on my server?

The HTTP server would need to use a PHP Interpreter to run the code to generate dynamic content on the page and send it. So the question is, how does Node.js fit in?

### Node.js and Dynamic Sites

With Node.js you can actually create your own HTTP server programmatically. Handling URLs, and requests, and responding however you want. You can server static files or generate dynamic content. It's all up to you.

## Preparing and Planning

Use the <a href="https://nodejs.org/dist/latest-v6.x/docs/api/">Node.js API docs</a> when stuck.

Planning doesn't go into every single detail but it's enough to get going.

{% highlight javascript linenos %}
// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
// Solution: Use Node.js to perform the profile look ups and server our templates by HTTP

// 1. Create a webserver

// 2. Handle HTTP route GET / and POST / i.e. Home
  // if url == '/' && GET
    // show search field
  // if url == '/' && POST
    // redirect to /:username

// 3. Handle HTTP route GET /:username i.e. /matthewlong29
  // if url == '/....'
    // get json from Treehouse
      // on 'end'
        // show profile
      // on 'error'
        // show error

// 4. Function that handles the reading of files and merge in values 
  // read from file and get a string
    // merge values into a string
{% endhighlight %}

## Creating a Simple Server

{% highlight javascript linenos %}
// 1. Create a webserver
var http = require('http');
http.createServer(function(request, response) {
  response.writeHead(200, {'cContent-Type': 'text/plain'});
  response.end('Hello World\n');
}).listen(3000);
console.log('Server running!');
{% endhighlight %}

### Using response.write to Display Date Every Second

{% highlight javascript linenos %}
// 1. Create a webserver
var http = require('http');
http.createServer(function(request, response) {
  response.writeHead(200, {'cContent-Type': 'text/plain'});
  setInterval(function(){
    response.write(new Date() + '\n');
  }, 1000);
//    response.end('Hello World\n');
}).listen(3000);
console.log('Server running!');
{% endhighlight %}

## Home Route

Below handles the home route or the root path of the site.

{% highlight javascript linenos %}
// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
// Solution: Use Node.js to perform the profile look ups and server our templates by HTTP

// 1. Create a webserver

  var http = require('http');
  http.createServer(function(request, response) {
    homeRoute(request, response);
  }).listen(3000);
  console.log('Server running!');

// 2. Handle HTTP route GET / and POST / i.e. Home
function homeRoute(request, response) {
  // if url == '/' && GET
  if (request.url === '/') { 
    // show search field
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Header\n');
    response.write('Search\n');
    response.end('Footer\n');
  }
  // if url == '/' && POST
    // redirect to /:username
}
// 3. Handle HTTP route GET /:username i.e. /matthewlong29
  // if url == '/....'
    // get json from Treehouse
      // on 'end'
        // show profile
      // on 'error'
        // show error

// 4. Function that handles the reading of files and merge in values 
  // read from file and get a string
    // merge values into a string
{% endhighlight %}

## User Route

Handle the user route for the site. Also, break the two routes into its own JavaScript file called `router.js`.

### router.js

{% highlight javascript linenos %}
// Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  // if url == '/' && GET
  if (request.url === '/') { 
    // show search field
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Header\n');
    response.write('Search\n');
    response.end('Footer\n');
  }
  // if url == '/' && POST
    // redirect to /:username
}

// Handle HTTP route GET /:username i.e. /matthewlong29
function user(request, response) {
  // if url == '/....'
  var username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Header\n');
    response.write(username + '\n');
    response.end('Footer\n');
    // get json from Treehouse
      // on 'end'
        // show profile
      // on 'error'
        // show error
  }
}

module.exports.home = home;
module.exports.user = user;
{% endhighlight %}

### app.js

{% highlight javascript linenos %}
var router = require('./router.js');
// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
// Solution: Use Node.js to perform the profile look ups and server our templates by HTTP

// Create a webserver

  var http = require('http');
  http.createServer(function(request, response) {
    router.home(request, response);
    router.user(request, response);
  }).listen(3000);
  console.log('Server running!');

// Function that handles the reading of files and merge in values 
  // read from file and get a string
    // merge values into a string
{% endhighlight %}

## Populating User Information

We're now getting user data from the API and print it out to the user route.

### router.js

{% highlight javascript linenos %}
var Profile = require("./profile.js");

// Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  // if url == '/' && GET
  if (request.url === '/') { 
    // show search field
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Header\n');
    response.write('Search\n');
    response.end('Footer\n');
  }
  // if url == '/' && POST
    // redirect to /:username
}

// Handle HTTP route GET /:username i.e. /matthewlong29
function user(request, response) {
  // if url == '/....'
  var username = request.url.replace('/', '');
  if (username.length > 0) {
    response.writeHead(200, {'Content-Type': 'text/plain'});
    response.write('Header\n');
    // get json from Treehouse
    var studentProfile = new Profile(username);
    // on 'end'
    studentProfile.on("end", function(profileJSON) {
      // show profile
      // store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url,
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      // simple response
      response.write(values.username + ' has ' + values.badges + ' badges\n');
      response.end('Footer\n');
    });
    // on 'error'
    studentProfile.on("error", function(error){
      // show error
      response.write(error.message + '\n');
      response.end('Footer\n');
    });
    
  }
}

module.exports.home = home;
module.exports.user = user;
{% endhighlight %}

### app.js

{% highlight javascript linenos %}
var router = require('./router.js');
// Problem: We need a simple way to look at a user's badge count and JavaScript points from a web browser
// Solution: Use Node.js to perform the profile look ups and server our templates by HTTP

// Create a webserver

  var http = require('http');
  http.createServer(function(request, response) {
    router.home(request, response);
    router.user(request, response);
  }).listen(3000);
  console.log('Server running!');

// Function that handles the reading of files and merge in values 
  // read from file and get a string
    // merge values into a string
{% endhighlight %}