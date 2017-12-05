---
layout: article

permalink: /notes/introduction-to-jquery/

title: "Introduction to jQuery"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "Notes about jQuery, the world's most used JavaScript library. jQuery allows us to write less, do more by providing a set of functions that makes selecting parts of a webpage and dealing with inconsistencies across different web browsers much faster and easier. No matter your skill level as a JavaScript developer, jQuery is an important tool to have in your toolbox!"

categories: notes

date: 2017-09-04
---

{% include /globalSections/toc.html %}

jQuery, the world's most used JavaScript library. jQuery allows us to write less, do more by providing a set of functions that makes selecting parts of a webpage and dealing with inconsistencies across different web browsers much faster and easier. No matter your skill level as a JavaScript developer, jQuery is an important tool to have in your toolbox!

## Selecting Page Elements with jQuery

Selecting elements in jQuery is similar to selecting them in CSS or using the `querySelectors()` in pure JavaScript. Some of the most common selectors are shown in the examples below.

{% highlight javascript linenos %}
// Element Selectors
$('p')

// Descendent Selectors
$('p a')

// Class Selectors
$('.class')

// ID Selectors
$('#id')

// Attribute Selectors
$([name='newsletter'])
{% endhighlight %}

### Filtering Matched Elements

There are also methods such as `.first()`, `.has()`, `.last()`, `.not()`, etc. That can be used to further narrow a set of matched elements. This can be based off of position, hierarchy, form state, and content.

See <a href="https://api.jquery.com/category/traversing/filtering/">jQuery filtering methods</a> for more information.

## Accessing and Modifying Attributes

You can use the `attr()` method to retrieve the value of a particular attribute of an emelement.

You can use the `attr()` method to get or set the attribute of something.

The following example targets a adds a click event to a `button` element and changes the attribute of the `href` to http://www.mtlong.me.

{% highlight javascript linenos %}
$('button').click(function(){
  $('a').attr('href', 'http://www.mtlong.me');
});
{% endhighlight %}

There is also teh `removeAttr()` method. This method removes an attribute from each element in the set of matched elements. In other words, the `removeAttr()` method sets the value of an atrribute to its default.

### Setting Target Attribute to _blank

Instead of adding `target="blank"` to every `a` tag in the markup you can set the url for every link leading away from your website using the following jQuery code.

{% highlight javascript linenos %}
$('a').not('[href*="my-domain.com"]').attr("target", "_blank");
{% endhighlight %}

## Intro to Events

in jQuery, we will often be dealing with events that result from some action on the part of the user. It might be things that happen in the browser like a timer running out, or external data being loaded.

{% highlight javascript linenos %}
$('body').click(function(){
  console.log('clicked');
});
{% endhighlight %}

## Callback Functions

An easy way to think about this is to first understand that a callback is a function that gets passed to another function as an argument.

For example, the function inside the click method above is a callback function.

Use callback functions in jQuery to make something happen when a specific event occurs on a specific part on the page.

## Using the on() Method

There are several ways to define event handlers in JavaScript, but `on()` is the currently accepted method using jQuery. This method can be used to attach a handler for any event to a set of metched elements. The event type gets passed in as the first argument and a callback function describing what should happen when that event is triggered is passed as the second.

### Pure JavaScript

{% highlight javascript linenos %}
document.querySelector('#awesomeBtn').onclick = () => console.log('JavaScript: I have been clicked!');
// JavaScript: I have been clicked!
{% endhighlight %}

### jQuery

{% highlight javascript linenos %}
$('#awesomeBtn').on('click', function() {
  console.log('jQuery: I have been clicked!');
});
// jQuery: I have been clicked!
{% endhighlight %}

### Log Event to Console

You can also log information about the event to the console. This will give you an incredible amount of information about the event such as currentTarget, handleObj, originalEvent, timeStamp, etc.

{% highlight javascript linenos %}
$('#awesomeBtn').on('click', function(e) {
  console.log(e);
});
{% endhighlight %}

See the MDN page for event.target for more information <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event/target">here</a>.

## Using the hover() Method

The `hover()` method has two functions. The function on hover enter and on hover leave. See the simple example below.

{% highlight javascript linenos %}
$('.loc').hover(
  function(){
    $(this).html('<strong>Location:</strong> Say Something?!');
  },
  function() {
    $(this).html('<strong>Location:</strong> Say Something Else?!');
});
{% endhighlight %}

## Getters vs. Setters

Getters and setters is something you'll see across lots of different programming languages and platforms. Getters are used for retrieving information while setters are used to set, or assign, values.

For example, `html()` will get the HTML contents of the first element OR set the HTML contents of every matched element.

## Adding Content to the Page

We can create new DOM elements or clone existing elements.

When a variable is a jQuery object it typically has a `$` at the beginning such as `const $name = $('#pet-name');`.

The `append()` method will append new HTML to the end of the element selected.

## Showing and Hiding Content

The `.show()` method will cause a hidden element to show. The `.hide()` method will cause a visible method to hide. The `.toggle()` method will determine if the selected element is visible or hidden and the opposite will occur. You can chain method such as `.fadeIn()`, `.fadeOut()`, etc to add animations when changing the visibility of an element. Note that elements that you use these methods on must be hidden in the first place. This can be done in many ways. One way is to use the css method and set the display to none:

{% highlight javascript linenos %}
$('img').css('display', 'none').fadeIn(1600);
{% endhighlight %}

## Changing Style

Rather than useing the `attr()` method, we can change the styling for our elements by adding or removing a class or by setting the CSS on an element.

{% highlight javascript linenos %}
$('.card').on('click', function(){
  $(this).toggleClass('selected');
});
{% endhighlight %}

## Removing Content from the Page

Sometimes, you'll want to completely remove an element from the page, not just hide it away. To do this you can use the `.remove()` element. You can also use the `.empty()` method. 

To learn more about these two methods see the <a href="http://api.jquery.com/remove/">jQuery docs for remove</a> and the <a href="http://api.jquery.com/empty/">jQuery docs for empty</a>.

## Why We Traverse the DOM

We want to minimize the number of times we search the entire DOM for a particular element or set of elements. We certainly don't want to have to search for the same parts of the DOM more than once. You always want your code to be as DRY as possible while still being readable.

## Using the parent() Method

The `.parent()` method returns the parent of the matched element, which is the element immediately above the DOM tree.

{% highlight javascript linenos %}
$('.close').on('click', function(){
  $(this).parent().remove();
});
{% endhighlight %}

## Using the find(), prev(), and next() Methods

The `.find()`, `.prev()`, and `.next()` methods can clean up our code by reducing the number of times we search the DOM.

## Using the siblings() Method

The `.siblings()` method is used to grab all siblings (elements that share a parent within the DOM) of the selected element. We can then act on that new set of selected elements.

There are many other methods that jQuery provides. For those methods, see the <a href="http://api.jquery.com/">jQuery documentation</a>.

## The map() Method

The `.map()` method passes each element in the current matched set through a function, producing a new jQuery object containing the return values.