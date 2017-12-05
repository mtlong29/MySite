---
layout: article

permalink: /notes/front-end-development-performance-optimization/

title: "Front End Development Performance Optimization"

subtitle: "Treehouse - Front End Web Development"

excerpt: "Notes on tactics used when optimizing the performance of a website. Focused on reducing the page weight and the number of HTTP requests."

categories: notes

date: 2017-08-30
---

{% include /globalSections/toc.html %}

## What is Front End Performance Optimization

You can lose your audience if your site doesn't load the first few seconds.

The speed at which a website loads is referred to as performance.

## Setting a Performance Budget

A performance budget is a quantifiable target for how fast a website loads. This can be in the forma of a goal for total HTTP requests, page weight, total response time, or any combination of these. Each HTTP request has a cost.

### Performance Budget

A quantifiable target for how fast a website loads.

### Page Weight

The total file size of a page and all of its assets.

### HTTP Requests

HyperText Transfer Protocol request or HTTP request for short is when a client computer asks a web server for a piece of data, such as an HTML file or an image.

## Chrome DevTools

The Chrome DevTools in the Google Chrome web browser include a number of tools for measuring performance. One of ther most vauable tools for front end optimization is the Network tab.

## Google PageSpeed

Google PageSpeed is a family of tools that can help you analyze the performance of a website. PageSpeed can be installed to Chrome in the form of a plugin and used via Chrome DevTools.

You can also simply enter a website at <a href="https://developers.google.com/speed/pagespeed/insights/">https://developers.google.com/speed/pagespeed/insights/</a> and run an analysis.

## HTTP Requests

It is important to pay attention to the total number of HTTP requests on a web page. Even when no data is sent, as in the case with a 404 error, an HTTP request will still take up time. Each HTTP request is generally fast, but if there are lots of assets (even small ones like icons), it can add up.

### Assets Per Page

Sometimes you don't need the same assets for every page. Consider removign assets from the about page for example that were used only for the home page.

## Optimize Images

Images are almost always the biggest use of bandwidth. most sites have HTML, CSS, and JavaScript, but images like photos or artwork are regularly 5 or 10 times the size. Making careful choices about the number of images you load, how they load, their compression, resolution, and their file format, can all make a big impact on your page load times.

### Use of SVGs First

SVGs are small in file size because they over larger areas of the screen using just a few vector points, rather than thousands or millions of individual pixels like in a JPEG or a PNG.

### Resize and Compress Images

Delivering images that are appropriately compressed and sized to their container will reduce file sizes. If we deliver more images that are larger than their container we are just wasting bandwidth.

Saving an image as progressive. Instead of having the image load one line at a time it will load progressively. Often times by the time the users eyes have focused on the image it will already have loaded. This adds color to the page much faster.

## Optimize CSS

There are several guidelines and techniques that can help optimize CSS. Removing CSS imports and using hosted font services can help speed up page load times.

## Create a Sprite Map

Loading in lots of images can generate many HTTP requests. This is particularly bad if we're using lots of small images, like icons, where the HTTP requests can collectively take more time than the file download itself. If we can combine these smaller assets together into one download, it will save some time.

Only use a sprite map for small images. Large images would make the sprite map too large adn introduce bad image caching when users download content they won't ever see.

### SVG Symbol

An improvement is to use the `symbol` element in SVG instead of directly referencing shapes (or a `g`), because you can define the viewBox directly on the symbol and then not need one when you `use` it later in an svg.

See <a href="https://css-tricks.com/svg-symbol-good-choice-icons/">https://css-tricks.com/svg-symbol-good-choice-icons/</a> for more.

## Optimize JavaScript

Making adjustments to when JavaScript is loaded can dramatically improve perceived performance. In this case, the page will still take the same total amount of time to load, but it will appear to load faster to the end user. In other words, if a website looks like its faster then it is faster.

### Loading JavaScript async

Using async makes it so that the script will run immediately on page load. This isn't always the best practice because often times a script will require a library such as jQuery and if you load that script without jQuery there will be errors all over your page.

Therefore, use the async attribute when the script is completely independent of any other JavaScript on the page.

## Minify Assets

The CSS and JavaScript that we write is often filled with spaces, line breaks, comments, and long variable names. The web browser doesn't need any of these things to parse properly, and yet they still are being downloaded when a site visitor loads up the page. Minifying assets removes these extra bits and reduces overall page weight.

Minification reduuces the file size of JavaScripts and CSS by removes spaces, line breaks, comments, long variable names, and other optimizations.

Combining CSS into one file reduces HTTP requests as well.

Use <a href="http://closure-compiler.appspot.com/home">Google Closure Complier Service</a> to minimize JavaScript.

Use <a href="http://cssminifier.com/">CSS Minifier</a> to minify your CSS.