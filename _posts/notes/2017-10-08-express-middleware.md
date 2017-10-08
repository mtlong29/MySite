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