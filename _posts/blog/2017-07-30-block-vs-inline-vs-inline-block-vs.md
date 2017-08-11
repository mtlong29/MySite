---
layout: article

permalink: /blog/block-vs-inline-vs-inline-block/

title: "Block Vs. Inline Vs. Inline-Block"

subtitle: "CSS"

excerpt: "Changing the display property of an HTML element."

categories: blog

tags: [css, web development]

image:
  header: using-jekyll.jpg
  teaser: using-jekyll.jpg

modified: 2017-07-30

featured: true

published: false
---

{% include /globalSections/toc.html %}

## Common Display Methods

<ul>
  <li>Block elements</li>
  <li>Inline elements</li>
  <li>Inline Block elements</li>
</ul>

### Block Elements
Block elements such as the ones in the list below stack on top of each other, like a stack of blocks, instead of appearing side by side each other on the same line.

<ul>
  <li>divs</li>
  <li>paragraphs</li>
  <li>headings</li>
</ul>

### Inline Elements
Inline elements such such as the ones in the list below do not create line breaks in a layout. These elements appear on the same line as the content and elements beside them.

<ul>
  <li>images</li>
  <li>links</li>
  <li>span tags</li>
</ul>

Inline elements only take on padding and margins for the left and right.

### Inline Block Elements
You should choose to display an element as an inline-block so that you can still style the element as if it is a block, but it displays as inline.

## Changing an Objects Display Property
