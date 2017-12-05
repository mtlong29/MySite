---
layout: article

permalink: /notes/traversing-the-dom/

title: "Traversing the DOM"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "These are notes on how to traverse the DOM using techniques such as parent, children, and sibling propertyies."

categories: notes

date: 2017-09-02
---

{% include /globalSections/toc.html %}

Traversing is similar selecting an element. Basically you're selecting an element based off of other elements on the page.

## Parent Node Example

The below example shows how to traverse a DOM using the `parentNode` property.

{% highlight javascript linenos %}
const removeMe = document.querySelector('.remove_me');
let parent = removeMe.parentNode;
parent.removeChild(removeMe);
{% endhighlight %}

{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <title>Parent Traversal</title>
  </head>
  <link rel="stylesheet" href="style.css" />
  <body>
    <ul>
      <li>Hello</li>
      <li>Hi</li>
      <li class="remove_me">Good bye!</li>
      <li>Howdy</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
{% endhighlight %}

## Using previousElementSibling and insertBefore

You can reference a previous sibling with the `previousElementSibling` property, and to insert a node before an element, with `insertBefore`.

For some background on why `previousSibling` and other similar properties don't always refer to element nodes, check out <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM">this MDN article on Whitespace in the DOM</a>. There is also the <a href="https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling">MDN page for previousElementSibling</a> and the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore">MDN page for insertBefore</a>

## Getting the First and Last Child

See the <a href="https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/firstElementChild">MCN page for firstElementChild</a> and the <a href="https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/lastElementChild">MDN page for lastElementChild</a> for more information.