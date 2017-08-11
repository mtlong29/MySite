---
layout: article

permalink: /blog/sticky-footer-techniques/

title: "Sticky Footer Techniques"

subtitle: "Wordpress"

excerpt: "That wordpress login page could not be more boring."

categories: blog

tags: [css, html, web development]

image:
  header: using-jekyll.jpg
  teaser: using-jekyll.jpg

modified: 2017-07-28

featured: true

published: false
---

{% include /globalSections/toc.html %}

There are a number of methods for forcing a footer to the bottom of the page no matter the height of the content in your page.

## First, Establish The Properties of Your Site

## Simplest Method

{% highlight html %}
<div class="wrap">
  <body></body>
  <footer></footer>
</div>
{% endhighlight %}

{% highlight css %}
.wrap {
  min-hight: calc(100vh - 80px);
}
{% endhighlight %}