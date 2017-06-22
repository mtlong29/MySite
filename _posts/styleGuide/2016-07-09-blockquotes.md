---
layout: article

title: "Blockquotes"

excerpt: "If a piece of text needs to be called out then one option is a blockquote. Here you will find blockquotes."

permalink: /blog/style-guide/blockquotes/

categories: style-guide

tags: [html, scss, markdown, web design]

image:
  header: blockquote.jpg
  teaser: blockquote.jpg

modified: 2016-07-09
---

{% include /globalSections/toc.html %}

A blockquote can be used to bring attention to a section. It is basically bringing attention to a quoted section, but I like using it to add flare to a piece of text as well.

## Markdown Output
>This is an example of a blockquote.

## Markdown Code
{% highlight markdown %}

>This is an example of a blockquote.

{% endhighlight %}

## HTML Output
<blockquote>
  <p>This is an example of a blockquote.</p>
  <p><cite>Dude, <em>Some Place</em></cite></p>
</blockquote>

## HTML Code
Much more customization can go into blockquotes when using HTML tags.

{% highlight html %}

<blockquote>
  <p>This is an example of a blockquote.</p>
  <p><cite>Dude, <em>Some Place</em></cite></p>
</blockquote>

{% endhighlight %}

## SCSS Code
This code can be found in `_assets/stylesheets/_base.scss`. Below is the code as of July 9th, 2016.

{% highlight scss %}

blockquote {
  margin: 0.8em 0em 0.8em 0;
  padding-left: 1em;
  padding-right: 1em;
  font-style: italic;
  border-left: 0.4em solid $pale-blue;
  a {
    color: inherit;
  }
  cite {
    font-family: $sans-serif;
    font-size: 0.8rem;
    font-style: normal;
    &:before {
      content: "\2014";
      padding-right: 5px;
    }
  }
}

{% endhighlight %}
