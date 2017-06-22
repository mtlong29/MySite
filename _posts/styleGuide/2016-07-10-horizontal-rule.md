---
layout: article

title: "Horizontal Rule"

excerpt: "A horizontal rule is nothing but a simple line. However, it can serve a few purposes when formatting a post. Here you will find examples of ways to format a horizontal rule."

permalink: /blog/style-guide/horizontal-rule/

categories: style-guide

tags: [html, css, markdown, web design]

image:
  header: horizontal-rule.jpg
  teaser: horizontal-rule.jpg

modified: 2016-07-11
---

{% include /globalSections/toc.html %}

A horizontal rule is a line. Very simple concept that can be used to separate blocks of text or underline something, among other things.

## Markdown Output:
The following are quick ways to add a simple horizontal rule into a post. The format of these are drawn from the stylesheet page.

Hyphens:

---

Asterisks:

***

Underscores:

___

## Markdown Code:
{% highlight markdown %}
Hyphens:

---

Asterisks:

***

Underscores:

___
{% endhighlight %}
## HTML Output:
Additional things can be done to horizontal rules such as changing the width, alignment, color, and others. To keep things simple the following example only changes the width.

<hr width="75%">

## HTML Code:
{% highlight html%}
<hr width="75%">
{% endhighlight %}

## CSS Code:
This code can be found in `_assets/stylesheets/_base.scss`. Below is the code as of July 9th, 2016.

{% highlight scss %}
hr {
  display: block;
  margin: 1em 0;
  border: 0;
  border-top: 5px solid $pale-blue;
}
{% endhighlight %}