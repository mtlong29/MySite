---
layout: article

permalink: /notes/nodejs-basics/

title: "Node.js Basics"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Node.js is a JavaScript environment that allows you to perform a multitude of tasks and build all sorts of exciting applications. These are notes about node.js basics."

categories: notes

date: 2017-09-14
---

{% include /globalSections/toc.html %}

**Node.js is a JavaScript environment that allows you to perform a multitude of tasks and build all sorts of exciting applications.** These are notes about node.js basics.

*Examples of what you can do with Node.js:*

- Chat applications,
- Play gameboy games online,
- Productivity tools such as cloud9,
- Treehouse workspaces,
- Grunt,
- Gulp,
- webpack,
- paypal,
- walmart,
- etc..

>Writing a node.js application is basically just writing a JavaScript application outside of the browser.

## Commands

**Running a node application is simple as typing `node <filename>`.** Running the node REPL (Read-Eval-Print-Loop) `node`. To exit the REPL use CTRL+D once or CTRL+C twice.

To see if you have node up and running check the version by typing `node -v`.

## JavaScript without the Browser

JavaScript is interpreted by browser API's. **The key to writing a Node.js application is knowing what objects you have available to you.**

#### Native Objects

Native objects are those *objects that are part of the JavaScript programming language* and are available in both Node.js and the Browser.

#### Host Objects

Host objects are those *objects that are only available in a single environment*. For example the DOM, or Document Object Model is not available in Node.js but are available in the Browser. Likewise, the host objects to access local file system is not available in the Browser but are in Node.js.

## Why use Node.js?

There are many programming languages that are natively available on the server-side. Node.js is a good tool because most of these languages and frameworks handle one set of tasks from beginning to end before repeating the process again doing the same set of steps for another task.

Languages that queue up requests, and process them one at a time are known as blocking languages, since it blocks the handling of other requests.

**Node.js is a more efficient system, doing what it can do now, responding to requests while it waits for other tasks to finish.** This often means when certain types of applications are ported to Node.js, you don't necessarily require as much system resources to perform the same tasks.

Node.js is *non-blocking* and that's why you'd want to build JavaScript applications on the Node.js platform over other languages and platforms. It's fast and efficient. It doesn't take up as many computer resources by the computers processing power or memory.

## Finding Help as a Node.js developer

Being a developer in any environment requires you to know what tools are at our disposal to help us in our endeavors building applications.

[The node.js documentation site.](http://nodejs.org/api/)

## Connecting Node.js to Treehouse User API Example

```javascript
// Require https module
const https = require('https');

// Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} number of points in JavaScript`;
  console.log(message);
}

// Connect to the API URL (https://teamtreehouse.com/username.json)
function getProfile(username) {
  const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
    let body = '';
    // Read the data
    response.on('data', data => {
      body += data.toString();
    });
    
    response.on('end', () => {
      // Parse the data
      const profile = JSON.parse(body);
      // Print the data
      printMessage(username, profile.badges.length, profile.points.JavaScript);
    });
    
  });
}

const users = process.argv.slice(2);
users.forEach(getProfile);
```

```bash
treehouse:~/workspace$ node app.js matthewlong29
matthewlong29 has 115 total badge(s) and 4062 number of points in JavaScript
```

## Error Handling and Requiring Your Own Files

#### profile.js

```javascript
// Require https module
const https = require('https');

// Require http module for status codes
const http = require('http');

// Print Error Messages
function printError(error) {
  console.error(error.message);
}

// Function to print message to console
function printMessage(username, badgeCount, points) {
  const message = `${username} has ${badgeCount} total badge(s) and ${points} number of points in JavaScript`;
  console.log(message);
}

// Connect to the API URL (https://teamtreehouse.com/username.json)
function get(username) {
  try {
    const request = https.get(`https://teamtreehouse.com/${username}.json`, response => {
      if (response.statusCode === 200) {
        let body = '';
        // Read the data
        response.on('data', data => {
          body += data.toString();
        });
        
        response.on('end', () => {
          try {
            // Parse the data
            const profile = JSON.parse(body);
            // Print the data
            printMessage(username, profile.badges.length, profile.points.JavaScript);
          } catch (error) {
            printError(error);
          }
        });
      } else {
        const message = `There was an error getting the profile for ${username} (${http.STATUS_CODES[response.statusCode]})`;
        const statusCodeError = new Error(message);
        printError(statusCodeError);
      }
    });
    request.on('error', printError);
  } catch (error) {
    printError(error);
  }
}

module.exports.get = get;
```

#### app.js 

```javascript
const profile = require('./profile.js');

const users = process.argv.slice(2);
users.forEach(profile.get);
```

#### Console 

```bash
treehouse:~/workspace$ node app.js matthewlong29
matthewlong29 has 115 total badge(s) and 4094 number of points in JavaScript
```

## Command Line Current Weather Conditions Application

#### api.json

```javascript
{
  "key": "yourkey"
}
```

#### weather.js

```javascript
const https = require('https');
const api = require('./api.json');

// Print out temp details
function printWeather(weather) {
  const message = `Current temperature in ${weather.location.city} is ${weather.current_observation.temp_f}F`;
  console.log(message);
}

function get(query) {
  // current conditions http://api.wunderground.com/api/a75ed8a9205127d7/conditions/q/CA/San_Francisco.json
  const request = https.get(`https://api.wunderground.com/api/${api.key}/geolookup/conditions/q/${query}.json`, response => {
    let body = '';
    // Read the data
    response.on('data', chunk => {
      body += chunk;
    });
    response.on('end', () => {
      const weather = JSON.parse(body);
      printWeather(weather);
      // Parse data
      // Print the data
    });
  });
}

module.exports.get = get;
```

#### app.js

```javascript
const weather = require('./weather.js');
 
// Join multiple values passed as arguments and replace all spaces with underscores
const query = process.argv.slice(2).join('_').replace(' ', '_');

// query: 90201
// query: Cleveland_OH
// query: London_England
weather.get(query);
```

#### Console

```bash
treehouse:~/workspace$ node app.js 40207
Current temperature in Louisville is 87.4F
```

**Node.js is a versatile platform for building all sorts of applications.** These notes are about the creation of a dynamic website that displays treehouse student profile information by creating a server that will *dynamically* generate content, handle URLs, read from files and build a simple template engine.

## HTTP Servers

A web browser is an application that is used to download and render HTML and CSS and execute any client side JavaScript. You type in a website address into a browser's address bar and hit enter, and it sends a request for information to a server or a computer on the internet that has that domain name assigned to it. Part of the information that the server receives in the request is the address or the URL that the client has entered. A URL will have a path to a file like `index.html`. The software running on the server like Apache or NGINX, will be configured to look for a certain directory on the server and look for the file, and in turn reads its contents and sends it back to the browser. 

#### Protocol

>The way the browsers and the web server agree to communicate is called a Protocol. 

**The protocol that the browser and web servers use is Hypertext Transfer Protocol or HTTP.** You can refer to the software on the server as an HTTP Server and the browser as an HTTP Client.

#### Dynamic Sites

Now, what happens when you want a dynamic site, for example, if I wanted a PHP script to run on my server? The HTTP server would need to use a PHP Interpreter to run the code to generate dynamic content on the page and send it. So the question is, how does Node.js fit in?

#### Node.js and Dynamic Sites

With Node.js you can actually create your own HTTP server programmatically. Handling URLs, and requests, and responding however you want. You can server static files or generate dynamic content. It's all up to you.

Use the [Node.js API docs](https://nodejs.org/dist/latest-v6.x/docs/api/) when stuck. Planning doesn't go into every single detail but it's enough to get going.