---
layout: article

permalink: /notes/front-end-web-development-foundation/

title: "Front End Web Development Foundation"

subtitle: "Notes"

excerpt: "Personal notes from treehouse"

categories: notes

tags: []

image:
  header: https://static.pexels.com/photos/47447/pexels-photo-47447.jpeg
  teaser: https://static.pexels.com/photos/47447/pexels-photo-47447.jpeg

modified: 2017-06-02

featured: true
---

{% include /globalSections/toc.html %}

## History of HTML
Hyper Text basically means any kind of text that can be displayed on a webpage. It was originally designed to share research papers, but its usage has changed dramatically over the last few decades. This is why the word "document" still persists today.

The Internet is the hardware network that allows us to transmit data. The web is a collection of linked hypertext documents.

## Wireframing
There are many tools that can be used for wireframing such as the following:

<ul>
  <li>Pen and paper</li>
  <li>Whiteboard</li>
  <li>Photoshop</li>
  <li><a href="https://balsamiq.com/products/mockups/" target="_blank">Balsamiq Mockups</a></li>
  <li><a href="http://www.sketchapp.com/" target="_blank">Sketch</a></li>
</ul>

## HTML5
All HTML5 really means is there are some new HTML elements that weren't available previously, along with a few new pieces of browser technology.

## < !DOCTYPE html >
This tag basically tells the browser that this is an HTML document and should ALWAYS be the first thing at the top of your website source.

## < meta charset="utf-8" >
Universal character set transformation format, eight bit. This simply describes how the page is formatted and is necessary in the < head > of every webpage.

## HTML Entities
HTML entities are ampersand codes such as &copy; or & copy; without the space. More can be found <a href="http://dev.w3.org/html5/html-author/charref" target="_blank">here</a>.

## Basic HTML Structure
{% highlight html %}
<!DOCTYPE html>
<html>
  
  <head>
    <meta charset="utf-8">
    <title>Matthew Long | Dog Lover</title>
  </head>
  
  <body>
    <header>
      <h1>Matthew Long</h1>
      <h2>Dog Lover</h2>
    </header>
    <section>
      <p>Gallery will go here.</p>
    </section>
    <footer>
      <p>&copy; 2017 Matthew Long.</p>
    </footer>
  </body>
  
</html>
{% endhighlight %}

## href
Short for hyperlink reference.

## < nav >
The navigation element is a semantic element that wraps any type of site navigation.

{% highlight html %}
<nav>
  <ul>
    <li><a href="index.html">Portfolio</a></li>
    <li><a href="about.html">About</a></li>
    <li><a href="contact.html">Contact</a></li>
  </ul>
</nav>
{% endhighlight %}

## Relative Paths vs Absolute Paths
Paths such as the one in the image tag below is known as a relative paths. This path is relative to the file.

{% highlight html %}
  <img src="img/numbers-01.jpg" alt="">
{% endhighlight%}

Paths such as the one in the image tag below is known as a absolute paths. 

{% highlight html %}
  <img src="img/numbers-01.jpg" alt="">
{% endhighlight%}

The alt tag is necessary so that if the image isn't there something appears in its place. Some examples of times you wouldn't want the image to show is for search engine spiders and visually impaired people. The alt tag can be left blank like above if there is a caption below the image.

## rel="styleseet"
Rel means relationship and it describes the relationship the current document and the linked document have.

## Normalize.css
Every browser has its own unique styling. Normalize.css is a special CSS file that will reset the default browser styles. In other words, every browser applies their own default styling so that headlines are larger than paragraphs, bulleted lists have bullets, and so on. There are some inconsistenies between these default styles from one browser to another.

## Selector Specificity
If our stylesheet isnt more specific than the browser the browsers default styling will be used.

## clear: both;
The clear property specifies on which sides of an element floating elements are not allowed to float.

## Things I've learned
<ol>
  <li>The reason the work document is still used for webpages.</li>
  <li>I do not use the section tags enough.</li>
  <li>Never leave off charset=utf-8" from your website.</li>
</ol>