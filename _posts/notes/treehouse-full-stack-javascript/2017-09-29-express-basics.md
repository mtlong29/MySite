---
layout: article

permalink: /notes/express-basics/

title: "Express Basics"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "These notes concern Express.js basics. Express.js is used to build dynamic websites on the Node.js platform. These are notes on the most basic aspects of Express.js such as setup, creating a server, and creating a route. These notes also cover templating. Templates are a special type of file that has their own syntax and language. They live on the server, and act as some kind of form letter for your HTML. So, it's like an HTML page with holes or blanks in it. You can fill in those blanks with custom content by adding variables to the template. The result is a full HTML page sent to the client. The process is called rendering the template."

categories: notes

date: 2017-09-29
---

{% include /globalSections/toc.html %}

**Express.js is used to build dynamic websites on the Node.js platform.** These are notes on the most basic aspects of Express.js such as *setup*, *creating a server*, and *creating a route*.

## What is Express?

>Express is a web framework that has a set of software tools to create dynamic web applications.

#### Web Framework Tools

- Templating
- URL Mapping / Routing
- User Input Processing

#### Benefits of a Web Framework

Using a web framework **allows you to build your application quicker**. This is because you're not focusing on the mundane aspects of development. Using a web framework **allows you to focus on what makes your application different than others** which is often referred to as business logic. Using a web framework **allows you to understand other codebases using the same framework**. The same can be said for when other developers are collaborating on your project. If they're already familiar with the framework they can get to that business logic quicker.

#### Similar Web Frameworks

>The principals learned from Express / Node.js are transferrable to other languages and frameworks:

- Express / Node.js
- Flask / Python
- Spark / Java
- Sinatra / Ruby

All of the above have similar conventions. If you know one of the frameworks you can get up and running with the other fairly fast.

#### Installing Express

**The first thing to do when starting a new Node.js project is to install its dependencies.** To initialize a Node.js application use `npm init -y`. The `-y` flag enables all the default settings. To install express using npm type `npm install express@4.15.2 --save`. The `--save` adds this package to the package.json file. **To add express you most require the express module by typing `const express = require('express');`.**

#### Quiz:

---

**Question**: To start a node project in a directory without a package.json file run the following command:

**Answer**: npm init

**Question**: Using a web framework gives you more control because it requires you to build all the low level services any application needs, increasing the control you ahve as a developer.

**Answer**: False

**Question**: What is a word for solutions to common problems in software?

**Answer**: Patterns

**Question**: In order to use node modules in a file, they need to be ____ using the ____ method.

**Answer**: required, require

**Question**: Which of the following is not one of the primary tools we will use in this course?

**Answer**: An IDE

---

## Creating a Server in Express

**Express sets up a server on a local computer.** It's job is to wait for HTTP requests from clients. When you're ready to make your application available to the public you'll need to deploy the project to a remote server. To create an express application you can just call `express();`. You can make this a variable as well, by typing `const app = express();`. **You would want to make it a variable because it will be extended throughout the application.** 

The next thing is setting up the development server which is the listen method. The listen method has one parameter which is the port number. This looks like the following: `app.listen(3000)`. You now have an express application. Start the app by running `node app.js` in the console. Now go to `localhost:3000` in the browser. You will get an error message, because express has not been told how to respond yet.

## Creating a Route with Express

Routes are essential to any web framework. 

>Express handles requests through routes. 

**Through a users perspective a route is just like a url.** It's the path a user takes to access data on the server. A route, also called an endpoint, is a command to run a specific function. Which in turn sends a response back to the client. For example, `/about` tells the application to load the content for the about page. **To create a route use the `.get()` method on the app object.** This will be the route to follow if the user just visits our site. The first parameter for the `.get()` method is the `'/'`, or root route. The second parameter is an anonymous callback function which also takes two parameters. These parameters will be the `request` and `response`. This callback will run when the client requests this route.

For now, the example will use the send method.

```javascript
const express = require('express');

const app = express();

app.get('/', (request, response) => {
  response.send('Hello world!');
});

app.listen(3000);
```

There is a module called `nodemon` that can be used to monitor any changes in your source and automatically restart your server. Install nodemon by typing `npm install -g nodemon` in the console. To use it make sure the package.json has the appropriate main entry file which will be app.js for this example. Now run this by typing `nodemon` in the console.

#### Quiz:

---

**Question**: The `app.listen` method can take a parameter, which will tell the server:

**Answer**: The port to serve the application on.

**Question**: In express, the convention for creating a new application, is to assign it to the variable ____: (e.g. const ____ = express();)

**Answer**: app

**Question**: The `get` method takes two parameters ____ and ____.

**Answer**: path, callback

**Question**: A route is where a server is set up to respond to a ____ from a client.

**Answer**: request

**Question**: The `get` method registers a route that will listen for HTTP ____ requests at a given route.

**Answer**: GET

---

## Adding Multiple Routes to the App

[Express](http://expressjs.com/en/api.html) applications will have *several* (and often many) routes. Adding a second route is very simple. *Simply copy and paste the root route and change the first parameter to the new route.* For this example, it is `/hello`. You can see this page by going to `localhost:3000/hello`. Also, note that the parameters in the callback function were changed to `req` and `res`, because these are used most often in examples across the internet. Also, adding the `<h1>` tag now *serves html to the page*.

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
});

app.get('/hello', (req, res) => {
  res.send('<h1>Hello you!</h1>');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

>Using the `send()` method is not the best way to serve html to the page. **The best way is templating**.

**Templates are a special type of file that has their own syntax and language.** They live on the server, and **act as some kind of form letter for your HTML**. So, it's **like an HTML page with holes or blanks in it**. You can **fill in those blanks with custom content by adding variables to the template**. The result is a full HTML page sent to the client. **The process is called rendering the template.**

## What is Template Rendering

The majority of the HTML you serve from an app will never change. If a user is viewing photos in a gallery the photos change. There are small differences, like a different caption, or some content specifically related to that photo. But the basic structure and most of the HTML will be the same.

Most web application frameworks handles this situation using what are called templates. A template provides the basic HTML for your app and serves it to the users. Templates also lets you vary the output to provide customized responses. 

#### How They Work

When a request comes in to a given route, the server decides how to handle the request. We've seen the most basic things you can do with the express response objects already. For instance, using the res.send method to send the string "I love Treehouse" to the browser. A server can send back a response containing HTML derived from a template.

Rendering a template results in what the viewer sees on their screens, templates are often called views. Most templates in languages resemble HTML.

#### Which Templates

The **most popular template in languages for JavaScript **developers are:

- [Handlebars](http://handlebarsjs.com/),
- [EJS (embedded JavaScript)](http://www.embeddedjs.com/) and,
- [Pug](https://pugjs.org/api/getting-started.html).

**Pug used to be called Jade, Pug is the exact same thing with a different name.** There are several others as well. You can use basically any templating engine with Express, but **Pug is by far the most popular.** Template engines in express are very easy to set up and use. Pug syntax has a slightly steeper learning curve than some of the other templating languages.

#### Quiz:

---

**Question**: Template rendering is unique to Express, and is not used in most web frameworks.

**Answer**: False

**Question**: The only template language that can be used with Express is Jade.

**Answer**: False

**Question**: Templates are stored on ____.

**Answer**: the server

**Question**: Templates are static, in other words their content does not change.

**Answer**: False

---

## What is Pug?

With Pug you don't need to type much to render an entire HTML page. As you can see in the below example, if you need to type an attribute that isn't a class or an id you can place it in parentheses. To nest tags you simply indent them. If you are placing an id or a class on a div you can leave the div off. Pug will assume a class or id standing alone is for a div tag.

```html
html(lang="en")
  head
  body
    section#mainContent
      .wrapper
        h1.mainHeading Hi!
```

```html
<html>
  <head></head>
  <body>
    <section id="mainContent">
      <div class="wrapper">
        <h1 class="mainHeading">hi!</h1>
      </div>
    </section>
  </body>
</html>
```

#### Using Pug in Your Express App

- Download Pug with npm
- Update code in app to use Pug
- Create templates
- Render templates with `response.render()`

#### Installing Pug

Make sure you have Node installed by typing `node -v`. Then initialize npm by typing `npm init`. Once you've done this **install Pug by typing `npm install pug --save`**. Now pug has been added to your *package.json* file.

## Tell Express App to Use Pug

Once you have Pug installed it's really easy tell your Express app to use Pug. See a very basic Express app below:

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.send('<h1>Hello world!</h1>');
});

app.get('/hello', (req, res) => {
  res.send('<h1>Hello you!</h1>');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

>To use Pug you must set the template engine. 

A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. Read more on this [here](https://expressjs.com/en/guide/using-template-engines.html).

This is when you can use the `app.set()` method. **The `app.set()` method defines different settings in express. To tell it to use the pug "view engine" you type `app.set('view engine', 'pug');`.** By default express will look in a **folder called views**. You can define what folder to use, but sticking with default is easy. Inside the "views" folder create a pug file such as the following:

```html
doctype html
html(lang="en")
  head
    title Landing Page
  body
    h1 The future home of something maical
    p Gate wind, moonshine horses meow irrigation, with feed troughs cheep, or cabbage with pumpkin trees chicken. In the straw rain barrels. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion.
```

>To use the template you would replace the `res.send()` method with the `res.render()` method.

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.render(index);
});

app.get('/hello', (req, res) => {
  res.send('<h1>Hello you!</h1>');
});

app.listen(3000, () => {
  console.log('The application is running on localhost:3000!');
});
```

#### Quiz:

---

**Question**: How do you nest one element inside another in Pug template?

**Answer**: Indent the nested element under the enclosing element.

**Question**: The response objects 'render' method takes the name of a template as its first parameter. The file extension (e.g. '.pug') is required.

**Answer**: False

**Question**: In Pug's syntax, which of the following is NOT a correct assignment of the class 'nav' to a 'div'.

**Answer**: div#nav

**Question**: In order to use Pug in your app, all of the following need to be true, EXCEPT:

**Answer**: your pug templates are always stored in a folder called "views". (Your templates can be stored in a folder with any name you choose. If you choose a name other than "views", you'll need to configure the app with the path to that folder.)

**Question**: Why is template rendering so important?

**Answer**: It allows developers to reuse more of their code.

---

## Express's response.render Method

Using `response.render()` is where we'll start putting dynamic data into the Express app! To learn more see [res.render()](https://expressjs.com/en/4x/api.html#res.render).

>The real power of templating is when you **use variables to inject customized content**, such as a user's name, a list of shopping cart items, or text of a blog post.

```html
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    header
      h1 Flash Cards
    section#contnet
      h2= prompt
      p
        i Hint: #{hint}
    footer
      p An app to help you study
```

**In the above the hint is inserted by `#{}`. This is similar to in JavaScript template literal which looks like `${}`.** 

```javascript
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.render(index);
});

app.get('/cards', (req, res) => {
  res.render('card', { 
    prompt: "Who is buried in Grant's tomb?",
    hint: "Think about whose tomb it is."
  });
});

app.listen(3000, () => {
  console.log('The application is runnong on localhost:3000!');
});
```

>Note that in Pug you can only use variables in attributes you will have to concatenate strings.

## Using Logic in Pug

**Pug templates can contain logic you can use to make them more versatile.** You can show or hide parts of the page *conditionally*, or *iterate over arrays of data* to express tables or lists more concisely. In our example, if we want the hint to only show if theres an actual hint available. For example, if we remove the hint from our object `hint:` will still display on our page.

Using an *if statement* is as simple as the following:

```html
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    header
      h1 Flash Cards
    section#contnet
      h2= prompt
      if hint
        p
          i Hint: #{hint}
    footer
      p An app to help you study
```

If you wanted a paragraph to show when there is no hint you would use an *else clause*. Using an else is also easy:

```html
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    header
      h1 Flash Cards
    section#contnet
      h2= prompt
      if hint
        p
          i Hint: #{hint}
      else
        p There is no hint.
    footer
      p An app to help you study
```

*Iterating* over an array of variables is also easy. First, create an array (list of colors for example) in your app.js file. Don't forget to add it to `res.render()`.

```javascript
const express = require('express');
const app = express();
const colors = [
  'red',
  'orange',
  'yellow',
  'green',
  'blue',
  'purple'
];

app.get('/', (req, res) => {
  res.render(index);
});

app.get('/cards', (req, res) => {
  res.render(
    'card', 
    { 
      prompt: "Who is buried in Grant's tomb?",
      hint: "Think about whose tomb it is."
    },
    colors
  );
});

app.listen(3000, () => {
  console.log('The application is runnong on localhost:3000!');
});
```

Use *each* to indicate you want to iterate over an array using pug. Then nest what to do for each value inside the `each`.

```html
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    header
      h1 Flash Cards
    section#contnet
      ul 
        each color if colors
          li= color
      h2= prompt
      if hint
        p
          i Hint: #{hint}
    footer
      p An app to help you study
```

Notice that `color` is similar to `i`. Meaning you can name that whatever you wish as long as you're consistent.

## Breaking Your Project's Templates into Partials

>Making templating more modular and reusable is always a good idea. 

For example, you don't want to include the footer and header (or any other elements used throughout many pages) in every page. Create a layout named `layout.pug`, for example:

```html
doctype html
html(lang="en")
  head
    title Flash Cards
  body
    header
      h1 Flash Cards
    block content
    footer
      p An app to help you study
```

Next Extend the layout using the *extend* keyword:

```html
extends layout.pug

block content
  section#contnet
    ul 
      each color if colors
        li= color
    h2= prompt
    if hint
      p
        i Hint: #{hint}
```

Now a full HTML page will be rendered using these two files. This can be broken up even further into something known as *includes*. **Create a folder in the "views" directory called "includes".** You can then cut something out such as a header and place it in the "includes" folder. Name it `header.put`. The same can be done for the footer.

```html
header
  h1 Flash Cards
```

```html
footer
  p An app to help you study
```

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

#### Quiz:

---

**Question**: One Pug file can load another Pug file.

**Answer**: True

**Question**: What is the conventional name of the Pug file that holds the topmost elements, like <html>, <body>, stylesheets, etc?

**Answer**: layout.pug

**Question**: A good use for a conditional in a template might be to hide a menu for accessing user account data unless a user is signed in.

**Answer**: True

**Question**: What is an example of something Pug templates are capable of?

**Answer**: Rendering a list of elements based on an array of data.

**Question**: A good use for iteration in a Pug template might be for rendering an HTML <body> element.

**Answer**: False

---