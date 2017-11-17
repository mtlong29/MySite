---
layout: article

permalink: /notes/javascript-dom-and-the-event/

title: "JavaScript DOM and the Event"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "Once we've selected an element in the DOM, we can read or affect it. We can replace or change the display, for example. Or we can create new nodes and insert them into the DOM. This post contains notes on that."

categories: notes

modified: 2017-09-02
---

{% include /globalSections/toc.html %}

Any time you interact with a webpage, you generate all kinds of events. An event is something you do on the web page, like moving your mouse around, scrolling, or clicking a link. Browsers "listen" for events and, with JavaScript, we can do something in response to an event.

## What is an Event?

When you enteract with a webpage you may trigger thousands of events. Nothing will happen unless JavaScript exists respond to these events. Some examples are shown below:

<ul>
  <li>click,</li>
  <li>dblclick,</li>
  <li>mousedown,</li>
  <li>mouseup,</li>
  <li>mousemove,</li>
  <li>mouseover,</li>
  <li>mouseout,</li>
  <li>keyup,</li>
  <li>keydown,</li>
  <li>touch,</li>
  <li>load,</li>
  <li>etc.</li>
</ul>

MDN has a thorough list of DOM events <a href="https://developer.mozilla.org/en-US/docs/Web/Events">here</a>.

## Functions as Parameters

Just as you can pass a number to a function, you can pass a function to a function.

To learn more about the distinction between function expressions and function statements, check out the MDN articles linked below.

{% highlight javascript linenos %}
function exec(func, arg) {
  func(arg);
}
exec((something) => {
  console.log(something);
}, 'Greetings');
{% endhighlight %}

### Learn More

Learn more on the MDN pages: <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function">Function statements</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function">Function expressions</a>

## Delaying Execution of a Function with setTimeout()

The window object has a `setTimeout()` function we can use to delay the execution of a function.

The below javascript executes the function after 3 seconds have passed. To learn more about the `setTimeout()` function see the <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout">MDN page for setTimeout()</a>

{% highlight javascript linenos %}
window.setTimeout((something) => {
  console.log(something);
}, 3000, 'Greetings');
{% endhighlight %}

### Another Example

{% highlight javascript linenos %}
function add(num1, num2) {
  console.log(num1 + num2);
}
window.setTimeout(add, 5000, 2, 2);
{% endhighlight %}

## Listening for Events with addEventListener()

There are three basic concepts to making a site interactive.

<ol>
  <li>Selection.</li>
  <li>Manipulate the element directly.</li>
  <li>Listen for user actions, or events.</li>
</ol>

### Learn More

For more on addEventListener() see the MDN page for addEventListener <a href="https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener">here</a>.

## Event Bubbling and Delegations

An event received by an element doesn't stop with that one element. That event moves to other elements like the parent, and other ancestors of the event. This is called "event bubbling".

Basically clicking an an `li` you're also clicking on the `ul`, and the `body`, and finally the `document`. These events rise up the DOM tree like bubbles.

{% highlight javascript linenos %}
EventTarget.addEventListener('click', () => {
  // handle event
});
{% endhighlight %}

## The Event Object

You can add an event listener to a parent element and let it handle events on its children.

When an event handler is called it receives and event object.

{% highlight javascript linenos %}
EventTarget.addEventListener('click', (event) => {
  // handle event
});
{% endhighlight%}

This object has useful information about the event as well as a few methods. There are many experimentatal methods that are likely not supported.

The property used most often is target `Event.target`. A reference to the object that dispatched the event.

The below JavaScript will log the event target to the console.

{% highlight javascript linenos %}
document.addEventListener('click', (event) => {
  console.log(event.target);
});
{% endhighlight %}

### Example One

The following example checks for if the user mouses over the `li` tags inside the `div` with the class `.list`. If this happens the text is transformed to upper case. On mouse leave the text returns to lower case.

{% highlight javascript linenos %}
const listDiv = document.querySelector('.list');
listDiv.addEventListener('mouseover', (event) => {
  if (event.target.tagName == 'LI') {
    event.target.textContent = event.target.textContent.toUpperCase();                           
  }
});
listDiv.addEventListener('mouseout', (event) => {
  if (event.target.tagName == 'LI') {
    event.target.textContent = event.target.textContent.toLowerCase();                           
  }
});
{% endhighlight %}

{% highlight html linenos %}
<div class="list">
  <ul>
    <li>grapes</li>
    <li>amethyst</li>
    <li>lavender</li>
    <li>plums</li>
  </ul>
</div>
{% endhighlight%}

Note that the conditional statement is checking if `event.target.tagName` is equal to `LI`. This is because `tagName` returns in all caps.

### Example Two

{% highlight javascript linenos %}
let section = document.getElementsByTagName('section')[0];

section.addEventListener('click', (e) => {
  if (e.target.tagName == 'INPUT') {
    e.target.style.backgroundColor = 'rgb(255, 255, 0)';
  }
});
{% endhighlight %}

{% highlight html linenos %}
<section>
    <h1>Making a Webpage Interactive</h1>
    <p>JavaScript is an exciting language that you can use to power web servers, create desktop programs, and even control robots. But JavaScript got its start in the browser way back in 1995.</p>
    <hr>
    <p>Things to Learn</p>
    <ul>
        <li>Item One: <input type="text"></li>
        <li>Item Two: <input type="text"></li>
        <li>Item Three: <input type="text"></li>
        <li>Item Four: <input type="text"></li>
    </ul>
    <button>Save</button>
</section>
{% endhighlight %}

### Learn More

To learn more about the event property ad the tagName property see their MDN pages: <a href="https://developer.mozilla.org/en-US/docs/Web/API/Event">Event Object</a> and <a href="https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName">tagName property</a>.