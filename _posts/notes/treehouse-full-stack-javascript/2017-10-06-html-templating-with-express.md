---
layout: article

permalink: /notes/html-templating-with-express/

title: "HTML Templating (Pug) With Express"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Templates are a special type of file that has their own syntax and language. They live on the server, and act as some kind of form letter for your HTML. So, it's like an HTML page with holes or blanks in it. You can fill in those blanks with custom content by adding variables to the template. The result is a full HTML page sent to the client. The process is called rendering the template."

categories: notes

modified: 2017-10-06
---

{% include /globalSections/toc.html %}

Templates are a special type of file that has their own syntax and language. They live on the server, and act as some kind of form letter for your HTML. So, it's like an HTML page with holes or blanks in it. You can fill in those blanks with custom content by adding variables to the template. The result is a full HTML page sent to the client. The process is called rendering the template.

## What is Template Rendering

The majority of the HTML you serve from an app will never change. If a user is viewing photos in a gallery the photos change. There are small differences, like a different caption, or some content specifically related to that photo. But the basic structure and most of the HTML will be the same.

Most web application frameworks handles this situation using what are called templates. A template provides the basic HTML for your app and serves it to the users. Templates also lets you vary the output to provide customized responses. 

### How They Work

When a request comes in to a given route, the server decides how to handle the request. We've seen the most basic things you can do with the express response objects already. For instance, using the res.send method to send the string "I love Treehouse" to the browser. A server can send back a response containing HTML derived from a template.

Rendering a template results in what the viewer sees on their screens, templates are often called views. Most templates in languages resemble HTML.

### Which Templates

The most popular template in languages for JavaScript developers are:

<ol>
  <li><a href="http://handlebarsjs.com/">Handlebars</a>,</li>
  <li><a href="http://www.embeddedjs.com/">EJS (embedded JavaScript)</a> and,</li>
  <li><a href="https://pugjs.org/api/getting-started.html">Pug</a>.</li>
</ol>

Pug used to be called Jade, Pug is the exact same thing with a different name. There are several others as well.

You can use basically any templating engine with Express, but Pug is by far the most popular.

Template engines in express are very easy to set up and use. Pug syntax has a slightly steeper learning curve than some of the other templating languages.

### Quiz

Question: Which of the following is NOT a common JavaScript templating language:

Answer: HAML

Question: Template rendering is unique to Express, and is not used in most web frameworks.

Answer: False

Question: The only template language that can be used with Express is Jade.

Answer: False

Question: Templates are stored on ____.

Answer: the server

Question: Templates are static, in other words their content does not change.

Answer: False

## What is Pug?

With Pug you don't need to type much to render an entire HTML page. As you can see in the below example, if you need to type an attribute that isn't a class or an id you can place it in parantheses. To nest tags you simply indent them. If you are placing an id or a class on a div you can leave the div off. Pug will assume a class or id standing alone is for a div tag.

{% highlight html linenos %}
html(lang="en")
  head
  body
    section#mainContent
      .wrapper
        h1.mainHeading Hi!
{% endhighlight %}

{% highlight html linenos %}
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
{% endhighlight %}

## Using Pug in Your Express App

<ol>
  <li>Download Pug with npm</li>
  <li>Update code in app to use Pug</li>
  <li>Create templates</li>
  <li>Render templates with <code>response.render()</code></li>
</ol>

### Installing Pug

Make sure you have Node installed by typing `node -v`. Then initialize npm by typing `npm init`. Once you've done this install Pug by typing `npm install pug --save`.

Now pug has been added to your package.json file.

### Tell Express App to Use Pug

Once you have Pug installed it's really easy tell your Express app to use Pug. See a very basic Express app below:

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

To use Pug you must set the template engine. A template engine enables you to use static template files in your application. At runtime, the template engine replaces variables in a template file with actual values, and transforms the template into an HTML file sent to the client. Read more on this <a href="https://expressjs.com/en/guide/using-template-engines.html">here</a>.

This is when you can use the `app.set()` method. The `app.set()` method defines different settines in express. To tell it to use the pug "view engine" you type `app.set('view engine', 'pug');`. By default express will look in a folder called views. You can define what folder to use, but sticking with default is easy. Inside the "views" folder create a pug file such as the following:

{% highlight html linenos %}
doctype html
html(lang="en")
  head
    title Landing Page
  body
    h1 The future home of something maical
    p Gate wind, moonshine horses meow irrigation, with feed troughs cheep, or cabbage with pumpkin trees chicken. In the straw rain barrels. Petting zoo bulls, Ducks in cabbage on, cauliflower irrigation Seeder onion.
{% endhighlight %}

To use the template you would replace the `res.send()` method with the `res.render()` method.

{% highlight javascript linenos %}
const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.render(index);
});

app.get('/hello', (req, res) => {
  res.send('<h1>Hello you!</h1>');
});

app.listen(3000, () => {
  console.log('The application is runnong on localhost:3000!');
});
{% endhighlight %}

### Quiz

Question: How do you nest one element inside another in Pug template:

Answer: Indent the nested element under the enclosing element.

Question: The response objects 'render' method takes the name of a template as its first parameter. The file extension (e.g. '.pug') is required.

Answer: False

Question: In Pug's syntax, which of the following is NOT a correct assignment of the class 'nav' to a 'div'.

Answer: div#nav

Question: In order to use Pug in your app, all of the following need to be true, EXCEPT:

Answer: your pug templates are always stored in a folder called "views". (Your templates can be stored in a folder with any name you choose. If you choose a name other than "views", you'll need to configure the app with the path to that folder.)

Question: Why is template rendering so important?

Answer: It allows developers to reuse more of their code.

## Express's response.render Method

Using `response.render()` is where we'll start putting dynamic data into the Express app! To learn more see <a href="https://expressjs.com/en/4x/api.html#res.render">res.render()</a>.

The real power of templating is when you use variables to inject customized content, such as a user's name, a list of shopping cart items, or text of a blog post.

{% highlight html linenos %}
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
{% endhighlight %}

{% highlight javascript linenos %}
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
{% endhighlight %}

In the above the hint is inserted by `#{}`. This is similar to in JavaScript template literal which looks like `${}`. Note that in Pug you can only use variables in attributes you will have to concatenate strings.

### Quiz

In the root route, render the "main.pug" template:

{% highlight javascript linenos %}
const express = require('express');
const posts = require('./mock/posts.json');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates')

app.get('/', (req, res) => {
  res.render('main');
});

app.listen(3000, () => {
  console.log("The frontend server is running on port 3000!");
});
{% endhighlight %}

Pass the posts object to your template, naming it "posts".

{% highlight javascript linenos %}
const express = require('express');
const posts = require('./mock/posts.json');

const app = express();

app.set('view engine', 'pug');
app.set('views', __dirname + '/templates')

app.get('/', (req, res) => {
  res.render('main', {posts: posts});
});

app.listen(3000, () => {
  console.log("The frontend server is running on port 3000!");
});
{% endhighlight %}

## Using Logic in Pug

Pug templates can contain logic you can use to make them more versatiles. You can show or hide parts of the page conditionally, or iterate over arrays of data to express tables or lists more concisely.

In our example, if we want the hint to only show if theres an actual hint available. For example, if we remove the hint from our object `hint:` will still display on our page.

Using an if statement is as simple as the following:

{% highlight html linenos %}
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
{% endhighlight %}

If you wanted a paragraph to show when there is no hint you would use an `else` clause. Using an `else` is also easy:

{% highlight html linenos %}
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
{% endhighlight %}

Looping through an array of variables is also easy. First, create an array (list of colors for example) in your app.js file. Don't forget to add it to `res.render()`.

{% highlight javascript linenos %}
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
{% endhighlight %}

Use `each` to indicate you want to iterate over an array using pug. Then nest what to do for each value inside the `each`.

{% highlight html linenos %}
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
{% endhighlight %}

Notice that `color` is similar to `i`. Meaning you can name that whatever you wish as long as you're consistent.

## Breaking Your Project's Templates into Partials

Making templating more modular and reusable is always a good idea. For example, you don't want to include the footer and header (or any other elements used throughout many pages) in every page.

Create a layout named `layout.pug`, for example:

{% highlight html linenos %}
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
{% endhighlight %}

Next Extent the layout using the `extend` keyword.

{% highlight html linenos %}
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
{% endhighlight %}

Now a full HTML page will be rendered using these two files.

This can be broken up even further into something known as `includes`. Create a folder in the "views" directory called "includes".

You can then cut something out such as a header and place it in the "includes" folder. Name it `header.put`. The same can be done for the footer.

{% highlight html linenos %}
header
  h1 Flash Cards
{% endhighlight %}

{% highlight html linenos %}
footer
  p An app to help you study
{% endhighlight %}

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

### Quiz

Question: One Pug file can loag another Pug file.

Answer: True

Question: What is the conventional name of the Pug file that holds the topmost elements, like <html>, <body>, stylesheets, etc?

Answer: layout.pug

Question: A good use for a conditional in a template might be to hide a menu for accessing user account data unless a user is signed in.

Answer: True

Question: What is an example of something Pug templates are capable of?

Answer: Rendering a list of elements based on an array of data.

Question: A good use for iteration in a Pug template might be for rendering an HTML <body> element.

Answer: False