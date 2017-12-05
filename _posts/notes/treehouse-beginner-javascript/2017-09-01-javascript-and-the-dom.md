---
layout: article

permalink: /notes/javascript-and-the-dom/

title: "JavaScript and the DOM"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "Notes on how to use JavaScript to interact with the document object model."

categories: notes

date: 2017-09-01
---

{% include /globalSections/toc.html %}

JavaScript is an exciting all purpose language. You can use it to power web servers, create desktop programs, and even control robots. But JavaScript got its start in the browser. It was created to make web pages responsive to mouse clicks and other input from visitors.

## Interactivity Examples

Interactivity means that when the page loads JavaScript makes the page more engaging for users. Some great examples are <a href="http://www.thestlbrowns.com">thestlbrowns.com</a>, online calculators, and Google Sheets. Google Sheets is a full blown application within a web page. All the interactivity within these examples done using JavaScript.

## Thinking Globally

JavaScripts global environment is full of controls your code can use to make things happen. These controls come in the form of JavaScript objects and functions.

## Document Object

DOM stands for Document Object Model. The DOM is a representation of a webpage that JavaScript can use. Changes that JavaScript makes to the DOM alter ther web page.

## Simple Example One

{% highlight javascript linenos %}
const myHeading = document.getElementById('myHeading');
const myButton = document.getElementById('myButton');
const myTextInput = document.getElementById('myTextInput');

myTextInput.addEventListener('input', () => {
  myHeading.style.color = myTextInput.value;
});
{% endhighlight %}

{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript and the DOM</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <h1 id="myHeading">JavaScript and the DOM</h1>
    <p>Making a web page interactive</p>
    <input type="text" id="myTextInput">
    <button id="myButton">Change Heading Color</button>
    <script src="app.js"></script>
  </body>
</html>
{% endhighlight %}

The above example will get the string entered into the input using the event listener and then change the h1 to the color entered.

If you enter `myTextInput` into the browsers console it will tell you loads of DOM information about `<input id="myTextInput" type="text">`.

## Simple Example Two

The below will select the list items by tag name using the `selectElementsbyTagName()` method.

{% highlight javascript linenos %}
const myList = document.getElementsByTagName('li');
for (let i = 0; i < myList.length; i++) {
  myList[i].style.color = 'purple';
}
{% endhighlight %}

{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript and the DOM</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <h1 id="myHeading">JavaScript and the DOM</h1>
    <p>Making a web page interactive</p>
    <p>Things that are purple:</p>
    <ul>
      <li>grapes</li>
      <li>amethyst</li>
      <li>lavender</li>
      <li>plums</li>
    </ul>
    <script src="app.js"></script>
  </body>
</html>
{% endhighlight %}

You can also select elements by class name using `document.getElementsByClassName()`.

## Using CSS Queries to Select Page Elements

`querySelector` and `querySelectorAll` are the most flexible of the selectors looked at so far in these notes. They will accept ID's classes, tag names, and more.

CSS selectors are a powerful way to select DOM elements. See the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector">MDN page for querySelector</a> or the <a href="https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll">MDN page for querySelectorAll</a> for more information.

Typing `document.querySelectorAll('li')` into the browsers console will give you an HTML collection of all list items on the page. And typing `document.querySelector('li')` will give you the first matching list item. You can also type `document.querySelector('#myHeading')` to have the element with the ID myHeading returned. 

Note that this looks similar to jQuery. 

You can also select by HTML attribute. For example, if you type `document.querySelector('[title=label]')` into the console it will return the element with the attribute `title="label"`.

You can even use pseudo classes. The following example selects the odd list items and sets the background to lightgray.

{% highlight javascript linenos %}
const evens = document.querySelectorAll('li:nth-child(odd)');
for (let i = 0; i < evens.length; i++) {
  evens[i].style.backgroundColor = 'lightgray';
}
{% endhighlight %}

The following example selects all list items inside the unordered list with the ID of rainbow and then iterates over an array of colors changing their color.

{% highlight javascript linenos %}
let listItems = document.querySelectorAll('#rainbow li');
const colors = ["#C2272D", "#F8931F", "#FFFF01", "#009245", "#0193D9", "#0C04ED", "#612F90"];
for(var i = 0; i < colors.length; i ++) {
  listItems[i].style.color = colors[i];    
}
{% endhighlight %}

{% highlight html linenos %}
<!DOCTYPE html>
<html>
  <head>
    <title>Rainbow!</title>
  </head>
  <body>
    <ul id="rainbow">
      <li>This should be red</li>
      <li>This should be orange</li>
      <li>This should be yellow</li>
      <li>This should be green</li>
      <li>This should be blue</li>
      <li>This should be indigo</li>
      <li>This should be violet</li>
    </ul>
    <script src="js/app.js"></script>
  </body>
</html>
{% endhighlight %}

## Checking Whether a JavaScript Feature is Available

Many JavaScript developers turn to tools like <a href="https://babeljs.io/">Babel</a> to manage the varying stages of browser support for new JavaScript features. Babel can be used for other environments besides browsers too.

<a href="https://developer.mozilla.org/en-US/">Mozilla Developer Network</a> is a great reference site for JavaScript, as well as the browser environment.

<a href="http://caniuse.com/#">Can I use</a> is also a good reference to check cross-browser support for features you want to use.