---
layout: article

permalink: /notes/serving-static-files-in-express/

title: "Serving Static Files in Express"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Web pages need CSS and other assets to look good. Express can supply those with what's called a static server."

categories: notes

date: 2017-10-12
---

{% include /globalSections/toc.html %}

Web pages need CSS and other assets to look good. Express can supply those with what's called a static server.

## What Are Static Assets?

When a browser makes a git request it receives HTML. However, there's no file called `index.html`. This means the app has to assemble it. Browsers use HTML, CSS, and JS files. Express doesn't need to build the HTML and CSS. The JavaScript on the server and the JavaScript on the client are completely different. To send images, CSS, and other static files the Express app uses what is called a Static Server. It sends these files straight to the client.

In other words static apps consist of a series of HTML files, CSS, files, and images that represent a physical page of a website. Dynamic apps use server technologies (such as Express) to dynamically build an app right when a user visits the page. 

Using dynamic websites/apps allows easier design updates, more flexible data, and easier content updates. In the vast majority of app projects, dynamic sites pay off in the end.

## Adding Static Assets to the App

To serve statis assets look at the `express.static()` documentation <a href="https://expressjs.com/en/4x/api.html#express.static">here</a>.

You can create a folder in the root directory called `public`. This is common terminology for static files being server.

In the app.js file you will type `app.use(express.static('public'))`. Now the folder is available. You can type `/stylesheets/style.css` in the browser if that is where the route is. However, it would be safer if you could just type `/static/stylesheets/style.css`. To do this add `static` to the above: `app.use('static', express.static('public'))`.

To actually use these styles you will need to link to it in your HTML:

{% highlight html linenos %}
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
{% endhighlight %}

## Merging the Design Files

You can google and find a Pug to HTML converter. I use codepen. The main objective of this will be to match the designers classes, id's, and pictures with your pug template.

### Quiz

Question: What overall problem do cookies attempt to solve?

Answer: How to store state

Question: What overall problem do query strings attempt to solve?

Answer: How to pass information to the server

Question: What overall problem does templating attempt to solve?

Answer: How to write and reuse HTML

Question: What overall problem do redirects attempt to solve?

Answer: How to move the client to a different URL

Question: Where are static assets executed?

Answer: The client executes them

Question: Express cannot read and execute client-side JavaScript

Answer: True