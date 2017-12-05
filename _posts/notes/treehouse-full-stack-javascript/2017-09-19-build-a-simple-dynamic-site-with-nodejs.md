---
layout: article

permalink: /notes/build-a-simple-dynamic-site-with-nodejs/

title: "Build a Simple Dynamic Site with Node.js"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Node.js is a versatile platform for building all sorts of applications. These notes are about the creation of a dynamic website that displays treehouse student profile information by creating a server that will dynamically generate content, handle URLs, read from files and build a simple template engine."

categories: notes

date: 2017-09-19
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

## Making Our Views DRY

Creating the HTML sections that can be dynamically pulled in at a later time.

### header.html
{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
    <title>Treehouse Profile</title>
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style type="text/css" media="screen">
      @import url(http://fonts.googleapis.com/css?family=Varela+Round);
      @import url(http://necolas.github.io/normalize.css/3.0.2/normalize.css);
      body {
        background: #ECEEEF;
        text-align: center;
        margin: 100px auto;
        max-width: 462px;
        padding: 0 40px;
        font: 18px normal 'Varela Round', Helvetica, serif;
        color: #777B7E;
      }
      img {
        width: 100%;
      }
      #searchIcon, #avatar {
        width: 50%;
        border-radius: 50%;
        margin: 0 25% 0 25%;
      }
      input {
        font-family: 'Varela Round', Helvetica, serif;
        font-size: 18px;
        padding: 31px 0;
        margin: 10px 0;
        text-align: center;
        width: 360px;
        border-radius: 4px;
        border: 1px solid #D5DDE4;
        color: #2C3238;
      }
      #username {
        margin: 20px 0 0;
      }
      .button {
        border-color: #5FB6E1;
        background: #5FB6E1;
        color: #fff;
      }
      #error {
        width: 100%;
        padding: 22px 0;
        background: #FFE6B2;
        color: #C5A14E;
        position: absolute;
        left: 0;
        top: 0;
      }
      #profile {
        background: #fff;
        border-radius: 4px;
        border: 1px solid #D5DDE4;
        padding: 40px 0 0;
        margin: -40px 0 0;
      }
      ul {
        list-style-type: none;
        padding: 0;
        margin: 40px 0 0;
      }
      li {
        display: inline-block;
        width: 100%;
        padding: 22px 0;
        margin: 0;
        border-top: 1px solid #D5DDE4;
      }
      a, a:visited {
        color: #5FB6E1;
        text-decoration: none;
      }
      span {
        color: #2C3238;
      }
    </style>
  </head>
  <body>
{% endhighlight %}

### search.html
{% highlight html linenos %}
<img src="http://i.imgur.com/VKKm0pn.png" alt="Magnifying Glass" id="searchIcon">
<form action="/" method="POST">
  <input type="text" placeholder="Enter a Treehouse username" id="username" name="username">
  <input type="submit" value="submit" class="button">
</form>
{% endhighlight %}

### profile.html
{% highlight html linenos %}
<div id="profile">
  <img src="{{avatarUrl}}" alt="Avatar" id="avatar">
  <p><span>{{username}}</span></p>
  <ul>
    <li><span>{{badges}}</span> Badges earned</li>
    <li><span>{{javascriptPoints}}</span> JavaScript points</li>
    <li><a href="/">search again</a></li>
  </ul>
</div>
{% endhighlight %}

### error.html
{% highlight html linenos %}
<div id="error">{{errorMessage}}</div>
{% endhighlight %}

### footer.html
{% highlight html linenos %}
  </body>
</html>
{% endhighlight %}

## Reading from Files

The basis for the templates are the contents of the files in views folder as seen above. Now we need to use Node.js File System module to read the contents of our files.

### renderer.js 

{% highlight javascript linenos %}
var fs = require("fs");
function view(templateName, values, reponse) {
  //Read from the template file
  var fileContents = fs.readFileSync('./views/' + templateName + '.html');
  //Insert values in to the content
  //Write out the contents to the response
  reponse.write(fileContents);
}
module.exports.view = view;
{% endhighlight %}

### router.js

{% highlight javascript linenos %}
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/") {
    //show search
    response.writeHead(200, {'Content-Type': 'text/plain'});  
    renderer.view("header", {}, response);
    renderer.view("search", {}, response);
    renderer.view("footer", {}, response);
    response.end();
  }
  //if url == "/" && POST
    //redirect to /:username
}
//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, {'Content-Type': 'text/plain'});  
    renderer.view("header", {}, response);    
    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile
      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url, 
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //Simple response
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });  
    //on "error"
    studentProfile.on("error", function(error){
      //show error
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });     
  }
}
module.exports.home = home;
module.exports.user = user;
{% endhighlight %}

## Binding Values (populate templates with user data)

{% highlight javascript linenos %}
var fs = require("fs");
function mergeValues(values, content) {
  // Cycle over the keys
    for(var key in values) {
    // Replace all {{keys}} with the values from the values object
    content = content.replace('{{' + key + '}}', values[key]);
    }
  // return merged content
  return content;
}
function view(templateName, values, reponse) {
  //Read from the template file
  var fileContents = fs.readFileSync('./views/' + templateName + '.html', {encoding: 'utf-8'});
  //Insert values in to the content
  fileContents = mergeValues(values, fileContents);
  //Write out the contents to the response
  reponse.write(fileContents);
}
module.exports.view = view;
{% endhighlight %}

## Sending Content Type Headers in Node.js

you can specify what type of content you serve by modifying a header called `Content-Type`.

Headers can be programattically created client and server side.

{% highlight javascript linenos %}
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var commonHeaders = {'Content-Type': 'text/html'};
//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/") {
    //show search
    response.writeHead(200, commonHeaders);  
    renderer.view("header", {}, response);
    renderer.view("search", {}, response);
    renderer.view("footer", {}, response);
    response.end();
  }
  //if url == "/" && POST
    //redirect to /:username
}
//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);  
    renderer.view("header", {}, response);    
    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile
      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url, 
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //Simple response
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });
        
    //on "error"
    studentProfile.on("error", function(error){
      //show error
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });
      
  }
}
module.exports.home = home;
module.exports.user = user;
{% endhighlight %}

In the above we changed the `Content-Type` to `text/html` from `text/plain`.

## Dealing with the POST Body

Now we need to get the user input from the search form.

{% highlight javascript linenos %}
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require('querystring');
var commonHeaders = {'Content-Type': 'text/html'};
//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/") {
    if (request.method.toLowerCase() === 'get') {
      //show search
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      //if url == "/" && POST
      //get the post data from body
      request.on('data', function(postBody){
        //extract the username
        var query = querystring.parse(postBody.toString());
        response.write(query.username);
        response.end();
        //redirect to /:username
      });
    }
  }
}
//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);  
    renderer.view("header", {}, response);    
    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile
      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url, 
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //Simple response
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    }); 
    //on "error"
    studentProfile.on("error", function(error){
      //show error
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });     
  }
}
module.exports.home = home;
module.exports.user = user;
{% endhighlight %}

## Redirection Headers in Node.js

{% highlight javascript linenos %}
var Profile = require("./profile.js");
var renderer = require("./renderer.js");
var querystring = require('querystring');
var commonHeaders = {'Content-Type': 'text/html'};
//Handle HTTP route GET / and POST / i.e. Home
function home(request, response) {
  //if url == "/" && GET
  if(request.url === "/") {
    if (request.method.toLowerCase() === 'get') {
      //show search
      response.writeHead(200, commonHeaders);
      renderer.view("header", {}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    } else {
      //if url == "/" && POST
      //get the post data from body
      request.on('data', function(postBody){
        //extract the username
        var query = querystring.parse(postBody.toString());
        response.writeHead(303, {'Location': '/' + query.username});
        response.end();
      });
    }
  }
}
//Handle HTTP route GET /:username i.e. /chalkers
function user(request, response) {
  //if url == "/...."
  var username = request.url.replace("/", "");
  if(username.length > 0) {
    response.writeHead(200, commonHeaders);  
    renderer.view("header", {}, response);    
    //get json from Treehouse
    var studentProfile = new Profile(username);
    //on "end"
    studentProfile.on("end", function(profileJSON){
      //show profile
      //Store the values which we need
      var values = {
        avatarUrl: profileJSON.gravatar_url, 
        username: profileJSON.profile_name,
        badges: profileJSON.badges.length,
        javascriptPoints: profileJSON.points.JavaScript
      }
      //Simple response
      renderer.view("profile", values, response);
      renderer.view("footer", {}, response);
      response.end();
    });
    //on "error"
    studentProfile.on("error", function(error){
      //show error
      renderer.view("error", {errorMessage: error.message}, response);
      renderer.view("search", {}, response);
      renderer.view("footer", {}, response);
      response.end();
    });     
  }
}
module.exports.home = home;
module.exports.user = user;
{% endhighlight %}

## Application Perfection

Add the ability to add external css files and serve through Node.js.

A possible new application would be to generate Lorem Ipsum through.

## Quiz:

Finish the following code. How do you find out the HTTP method of a request?

`request.url === '/'`

What is the Content-type for PDF files?

`application/pdf`

What is the Content-type for CSS files?

`text/css`

Status code 303 means "See Other". This is good for redirecting POST requests to GET. However, there are other redirection headers better suited for other situations. Imagine I had an old URL that no longer can be accessed at it's original location, like `/user/chalkers` but it's now at `/users/chalkers`. What status code should I use when redirecting? 

`301 (moved permanently)`

What is the Content-type for HTML?

`text/html`

What HTTP header do I use to redirect to another URL?

`Location`

What Node module do you need to require to parse a query string or the body of a POST request?

`querystring`

What is the Content-type for PNG files?

`image/png`