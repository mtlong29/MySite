---
layout: article

permalink: /notes/parameters-query-strings-and-modularizing-routes/

title: "Parameters, Query Strings, and Modularizing Routes"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on another essential component of Express, middleware."

categories: notes

date: 2017-10-10
---

{% include /globalSections/toc.html %}

Parameters, Query Strings, and Modularizing Routes

## Modular Routes

Creating a modular app is easy. First, create a folder to hold your routes files. Call it `routes`. In the routes folder create `index.js`. At the top require express. With express, create a new route using the `router`. Next, replace `app` with `router`. Finally, export the file using `module.exports()`.

Next, in the `app.js` file import or require the routes file. Finally, use `app.use` to specify the routes.

Create the `cards` route in the routes folder. You can cut the route from `index.js` and paste it into its own file. Don't forget to export and require it like the `routes/index.js` file.

### routes/index.js

{% highlight javascript linenos %}
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
{% endhighlight %}

### routes/cards.js

{% highlight javascript linenos %}
const express = require('express');
const router = express.Router();

router.get('/', (req, res) => {
    res.render('card', { prompt: "Who is buried in Grant's tomb?" });
});

module.exports = router;
{% endhighlight %}

### app.js

{% highlight javascript linenos %}
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
{% endhighlight %}

## Using Data and Route Parameters

Web applications need data! For a flashcard application, you will need questions and answers as data. If users need a login this will also be stored in data.

To get started using data in an Express app start by creating a folder named `data`. In that folder create a fild called `flashcardData.json`. This data may look like the following:

{% highlight javascript linenos %}
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
{% endhighlight%}

To use this data, you must require it. Require it in the `cards.js` file:

{% highlight javascript linenos %}
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
{% endhighlight %}

Note the `const { data }` format. This is equivalent to:

{% highlight javascript linenos %}
const data  = require('../data/flashcardData.json').data;
const cards = data.cards;
{% endhighlight %}

To pull any card you want in the browser you will need a route parameter. A route parameter is a variable that a user can put right into the URL to point to a particular resource. For our current URL, we want to place a number at the end indicating which card to display.

In express, we can indicate a route parameter right where we declared the URL. Use a colon to tell expres to treat this part of the URL as a variable. And if we put `:id` for example, Express will treat this portion of the URL as a variable or a route parameter named `id`. The value for the route parameter from the URL will be stored in the request object params property.

{% highlight javascript linenos %}
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
{% endhighlight %}

### Quiz

Question: Why is it a good idea to keep routes in files separate from the main app?

Answer: As the app grows, this will keep your code well organized.

Question: How do you create a router instance in a router file?

Answer: `express.Router();`

Question: `express.Router()` creates an object that behaves similar to the `app` object.

Answer: True

Question: How can an express app get access to a route parameter?

Answer: From the `req.params` object

## Card Template

The problem now is how are we going to view the answer for the question. One possibility is new URLs for questions and answers such as `/cards/4/question` and `/cards/4/answer`. This would work.

There's another option called a query string. This is what the `?` in the URL is. For example, `/cards/4?key=value`. You can separate additional values with an ampersand like: `/cards/4?key=value&key2=value2`.

For our card application, we could use `/cards/4?side=question` and `/cards/4?side=answer`.

Checking for a query string is similar to checking for route paramater or cookie. It will be under the `query` property of the `req` object: `req.query.side`.

In the `cards.js` file:

{% highlight javascript linenos %}
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
{% endhighlight %}

Lastly, in the `card.pug` file we must change prompt to text.

{% highlight html linenos %}
extends layout.pug

block content
  section#content
    h2= text
    if hint
      p
        i Hint: #{hint}
{% endhighlight %}

This ensures the question or the answer will show up. Now you can type the URL `/cards/4?side=question` and `/cards/4?side=answer` to see the questions and answers.

## Adding Links

If you want the hint to only show when the question side is open you will need to add a conditional statement around the hint and remove it from the templateData constant:

{% highlight javascript linenos %}
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
{% endhighlight %}

Note: In Pug you can use JavaScript template literals. Template literals make it much easier to read JavaScript instead of string catenation.

{% highlight html linenos %}
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
{% endhighlight %}

If you want to add a link to go from the `question` to the `answer` side of the cards you will need start by modifying the `card.pug` template:

{% highlight html linenos %}
extends layout.pug

block content
  section#content
    h2= text
    if hint
      p
        i Hint: #{hint}
    a(href=`${id}?side=${sideToShow}`)= sideToShowDisplay
{% endhighlight %}

Next we need to pass in the new values into the `card.js` and add and else if clause:

{% highlight javascript linenos %}
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
{% endhighlight %}

### Quiz

Question: Pug templates support Javascript string interpolation.

Answer: True

Question: How do you get query information from a uRL?

Answer: `req.query`

Question: What symbol in a URL marks the beginning of a query string?

Answer: `?`

Question: Given the URL (http://example.com/resource?building=42&age=40&color=salmon), what is the value of "age" in the query string?

Answer: `40`

Question: What does a query string contain?

Answer: key value pairs

## Randomize Cards

In the `cards.js` file you can use `Math.random()` to select a random card:

{% highlight javascript linenos %}
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
{% endhighlight %}

As you can see a new route was created. Then the total number of cards was determined using the `.length` property. A random number was generated using `Math.random()`. Finally, that number is plugged into the URL.

## Linking Around the Application

Redirect users to show the question side of the card by default:

{% highlight javascript linenos %}
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
{% endhighlight %}

As you can see you can also remove the query string from the random string to clean up the code a little.

However, now if you enter anything other than a valid card number it will direct you to something you dont want.

You can place another link on the page that will move the user to another card:

{% highlight html linenos %}
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
{% endhighlight %}

Giving the users a way to get from the homepage to the flashcards:

{% highlight html linenos %}
extends layout.pug

block content
  section#content
    h2= Welcome, #{name}!
    form(action='/goodbye', method='post')
      button(type='submit') Goodbye
    p
      a(href='/cards') Begin!
{% endhighlight %}

Next, move the goodbye button to the layout template.

{% highlight html linenos %}
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
{% endhighlight %}

Lastly, you need to add the name value that is stored in the cookie to the `cards.js` file. Don't forget to add the name to the `templateData` object.

{% highlight javascript linenos %}
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
{% endhighlight %}

Now if you go to the goodbye the welcome and goodbye still appears. You can hide this with a conditional on the layout template.

{% highlight html linenos %}
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
{% endhighlight %}

### Quiz

Question: Where are cookies stored?

Answer: On the client

Question: What is one of the benefits of template rendering?

Answer: It reduceds repetition you would otherwise need to have in your HTML files

Question: What happens when an object is passed into the `next` function?

Answer: Execution is passed to the next error handling middleware function.

Question: How do you get cookies from a client's request? 

Answer: `req.cookies`

Question: What are two ways of putting data into a URL to be sent to the server?

Answer: query strings and url parameters

