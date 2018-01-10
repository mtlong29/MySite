---
layout: article

permalink: /notes/javascript-and-the-dom/

title: "JavaScript and the DOM"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on how to use JavaScript to interact with the DOM, or Document Object Model. Once an element in the DOM is selected, it can be read or changed. New nodes can also be inserted into the DOM."

categories: notes

date: 2017-09-01
---

{% include /globalSections/toc.html %}

**JavaScript is an exciting all purpose language.** You can use it to power web servers, create desktop programs, and even control robots. But JavaScript got its start in the browser. It was created to make web pages responsive to mouse clicks and other input from visitors. 

Interactivity means that when the page loads JavaScript makes the page *more engaging* for users. Some great examples are [thestlbrowns.com](http://www.thestlbrowns.com), online calculators, and Google Sheets. Google Sheets is a full blown application within a web page. All the interactivity within these examples done using JavaScript. JavaScripts global environment is full of controls your code can use to make things happen. These controls come in the form of JavaScript objects and functions.

>**DOM stands for Document Object Model.** The DOM is a representation of a webpage that JavaScript can use. Changes that JavaScript makes to the DOM alter the web page.

#### Example One

```javascript
const myHeading = document.getElementById('myHeading');
const myButton = document.getElementById('myButton');
const myTextInput = document.getElementById('myTextInput');

myTextInput.addEventListener('input', () => {
  myHeading.style.color = myTextInput.value;
});
```

```html
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
```

The above example will get the string entered into the input using the event listener and then change the h1 to the color entered. If you enter `myTextInput` into the browsers console it will tell you loads of DOM information about `<input id="myTextInput" type="text">`.

#### Example Two

The below will select the list items by tag name using the `selectElementsbyTagName()` method.

```javascript
const myList = document.getElementsByTagName('li');
for (let i = 0; i < myList.length; i++) {
  myList[i].style.color = 'purple';
}
```

```html
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
```

You can also select elements by class name using `document.getElementsByClassName()`. Keep note of the *elements* or *element* term. This is good indication of whether the selector returns *an element* or *a collection of elements*.

## Using CSS Queries to Select Page Elements

>`querySelector` and `querySelectorAll` are the most flexible of the selectors looked at so far in these notes. They will accept ID's classes, tag names, and more.

CSS selectors are a powerful way to select DOM elements. See the [MDN page for querySelector](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector) or the [MDN page for querySelectorAll](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelectorAll) for more information.

>Typing `document.querySelectorAll('li')` into the browsers console will give you an HTML collection of all list items on the page. And typing `document.querySelector('li')` will give you the first matching list item. You can also type `document.querySelector('#myHeading')` to have the element with the ID myHeading returned. 

**Note that this looks similar to jQuery.**

You can also select by HTML attribute. For example, if you type `document.querySelector('[title=label]')` into the console it will return the element with the attribute `title="label"`. *You can even use pseudo classes.* The following example selects the odd list items and sets the background to lightgray.

```javascript
const evens = document.querySelectorAll('li:nth-child(odd)');
for (let i = 0; i < evens.length; i++) {
  evens[i].style.backgroundColor = 'lightgray';
}
```

#### Example One

The following example selects *all* list items inside the unordered list with the ID of rainbow and then iterates over an array of colors changing their color.

```javascript
let listItems = document.querySelectorAll('#rainbow li');
const colors = ["#C2272D", "#F8931F", "#FFFF01", "#009245", "#0193D9", "#0C04ED", "#612F90"];
for(var i = 0; i < colors.length; i ++) {
  listItems[i].style.color = colors[i];    
}
```

```html
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
```

## Checking Whether a JavaScript Feature is Available

Many JavaScript developers turn to tools like [Babel](https://babeljs.io/) to manage the varying stages of browser support for new JavaScript features. Babel can be used for other environments besides browsers too. [Mozilla Developer Network](https://developer.mozilla.org/en-US/) is a great reference site for JavaScript, as well as the browser environment. [Can I use](http://caniuse.com/#) is also a good reference to check cross-browser support for features you want to use.

## Making Changes to the DOM

Once we've selected an element in the DOM, we can read or affect it. We can replace or change the display, for example. Or we can create new nodes and insert them into the DOM. This post contains notes on that. If you want to get or set an elements class use `Element.className`. The below will store the value of the text input element with the id of linkName. It then sets that value of the `a` tag with ID of like to the text that was returned from inputValue.

```javascript
let inputValue = document.querySelector('#linkName').value;
document.querySelector('#link').innerHTML = inputValue;
```

## Styling Elements

If you enter `p.style` into the console it will show all the inline styles (and possible style properties). This is why we don't typically style elements using the `.style` property. However, hiding and showing an element is common practice. The following example hides and shows the section with the class list.

```javascript
const toggleList = document.querySelector('#toggleList');
const listDiv = document.querySelector('.list');
toggleList.addEventListener('click', () => {
  if (listDiv.style.display == 'none') {
    toggleList.innerHTML = 'Hide List';
    listDiv.style.display = 'block';
  } else {
    listDiv.style.display = 'none';
    toggleList.innerHTML = 'Show List';
  }
});
```

## Creating New DOM Elements

We've made several changes to the elements on our page with JavaScript. Now it's time to take it to the next level and create new elements. You can create new elements with the `document.createElement()` method. The idea here is seen below:

```javascript
const contentDiv = document.getElementById("content");
addItemButton.addEventListener('click', () => {
  let li = document.createElement('li');
  li.innerHTML = addItemInput.value;
  document.querySelector('ul').appendChild(li);
  addItemInput.value = '';
});
```

There is also the `insertBefore()` method that inserts a node before the reference node as a child of a specified parent node. If the given child is a reference to an existing node in the document, `insertBefore()` moves it from its current position to the new position.

## Removing Elements from the DOM

You can remove elements from the page, using the `removeChild()` method.

```javascript
const removeItemButton = document.querySelector('button.removeItemButton');
removeItemButton.addEventListener('click', () => {
  let li = document.querySelector('li:last-child');
  document.querySelector('ul').removeChild(li);
});
```

## Manipulating the DOM Example 

```javascript
const descriptionInput = document.querySelector('input.description');
const descriptionP = document.querySelector('p.description');
const descriptionButton = document.querySelector('button.description');
const toggleList = document.querySelector('#toggleList');
const listDiv = document.querySelector('.list');
const addItemInput = document.querySelector('input.addItemInput');
const addItemButton = document.querySelector('button.addItemButton');
const removeItemButton = document.querySelector('button.removeItemButton');

toggleList.addEventListener('click', () => {
  if (listDiv.style.display == 'none') {
    toggleList.innerHTML = 'Hide List';
    listDiv.style.display = 'block';
  } else {
    listDiv.style.display = 'none';
    toggleList.innerHTML = 'Show List';
  }
});

descriptionButton.addEventListener('click', () => {
  descriptionP.innerHTML = descriptionInput.value + ': ';
  descriptionInput.value = '';
});

addItemButton.addEventListener('click', () => {
  let li = document.createElement('li');
  li.innerHTML = addItemInput.value;
  document.querySelector('ul').appendChild(li);
  addItemInput.value = '';
});

removeItemButton.addEventListener('click', () => {
  let li = document.querySelector('li:last-child');
  document.querySelector('ul').removeChild(li);
});
```

```html
<!DOCTYPE html>
<html>
  <head>
    <title>JavaScript and the DOM</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <h1 id="myHeading">JavaScript and the DOM</h1>
    <p>Making a web page interactive</p>
    <button id="toggleList">Hide List</button>
    <div class="list">
      <p class="description">Things that are purple:</p>
      <input type="text" class="description">
      <button class="description">Change list description!</button>
      <ul>
        <li>grapes</li>
        <li>amethyst</li>
        <li>lavender</li>
        <li>plums</li>
      </ul>
      <input type="text" class="addItemInput">
      <button class="addItemButton">Add item</button>
      <button class="removeItemButton">Remove last item</button>
    </div>
    <script src="app.js"></script>
  </body>
</html>
```

## JavaScript DOM and the Event

Any time you interact with a webpage, you generate all kinds of events. An event is something you do on the web page, like moving your mouse around, scrolling, or clicking a link. Browsers "listen" for events and, with JavaScript, we can do something in response to an event.

### What is an Event?

When you interact with a webpage you may trigger thousands of events. Nothing will happen unless JavaScript exists respond to these events. Some examples are shown below:

- click,
- dblclick,
- mousedown,
- mouseup,
- mousemove,
- mouseover,
- mouseout,
- keyup,
- keydown,
- touch,
- load,
- etc.

MDN has a thorough [list of DOM events](https://developer.mozilla.org/en-US/docs/Web/Events).

## Functions as Parameters

Just as you can pass a number to a function, you can pass a function to a function. Learn more on the MDN pages: [Function statements](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/function) and [Function expressions](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/function).

```javascript
function exec(func, arg) {
  func(arg);
}
exec((something) => {
  console.log(something);
}, 'Greetings');
```

## Delaying Execution of a Function with setTimeout()

The window object has a `setTimeout()` function we can use to delay the execution of a function.

The below javascript executes the function after 3 seconds have passed. To learn more about the `setTimeout()` function see the <a href="https://developer.mozilla.org/en-US/docs/Web/API/WindowTimers/setTimeout">MDN page for setTimeout()</a>

```javascript
window.setTimeout((something) => {
  console.log(something);
}, 3000, 'Greetings');
```

#### Example One

```javascript
function add(num1, num2) {
  console.log(num1 + num2);
}
window.setTimeout(add, 5000, 2, 2);
```

## Listening for Events with addEventListener()

There are three basic concepts to making a site interactive.

- Selection.
- Manipulate the element directly.
- Listen for user actions, or events.

For more on `.addEventListener()` see the [MDN page for addEventListener](https://developer.mozilla.org/en-US/docs/Web/API/EventTarget/addEventListener).

## Event Bubbling and Delegations

An event received by an element doesn't stop with that one element. That event moves to other elements like the parent, and other ancestors of the event. This is called "event bubbling". Basically clicking an an `li` you're also clicking on the `ul`, and the `body`, and finally the `document`. **These events rise up the DOM tree like bubbles.**

```javascript
EventTarget.addEventListener('click', () => {
  // handle event
});
```

## The Event Object

**You can add an event listener to a parent element and let it handle events on its children.** When an event handler is called it receives and event object.

```javascript
EventTarget.addEventListener('click', (event) => {
  // handle event
});
```

This object has useful information about the event as well as a few methods. There are many experimental methods that are likely not supported. The property used most often is target `Event.target`. A reference to the object that dispatched the event.

The below JavaScript will log the event target to the console.

```javascript
document.addEventListener('click', (event) => {
  console.log(event.target);
});
```

#### Example One

The following example checks for if the user mouses over the `li` tags inside the `div` with the class `.list`. If this happens the text is transformed to upper case. On mouse leave the text returns to lower case.

```javascript
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
```

```html
<div class="list">
  <ul>
    <li>grapes</li>
    <li>amethyst</li>
    <li>lavender</li>
    <li>plums</li>
  </ul>
</div>
```

Note that the conditional statement is checking if `event.target.tagName` is equal to `LI`. This is because `tagName` returns in all caps.

#### Example Two

```javascript
let section = document.getElementsByTagName('section')[0];

section.addEventListener('click', (e) => {
  if (e.target.tagName == 'INPUT') {
    e.target.style.backgroundColor = 'rgb(255, 255, 0)';
  }
});
```

```html
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
```

To learn more about the event property ad the tagName property see their MDN pages: [Event Object](https://developer.mozilla.org/en-US/docs/Web/API/Event) and [tagName property](https://developer.mozilla.org/en-US/docs/Web/API/Element/tagName).

## Traversing the DOM

Traversing is similar selecting an element. Basically you're selecting an element based off of other elements on the page.

After you have selected an element you can use DOM traversing properties to select another element. Some common properties are:

- `firstElementChild` is a read-only property that returns the object's first child Element, or *null* if there are no child elements.
- `lastElementChild` is a read-only property that returns the object's last child element, or *null* if there are no child elements.
- `previousElementSibling` is a read-only property that returns the element immediately prior to the specified one in its parent's children list, or *null* if the specified element is the first one in the list.
- `nextElementSibling` is a read-only property that returns the element immediately following the specified one in its parent's children list, or *null* if the specified element is the last one in the list.
- `parentElement` is a read-only property that returns the DOM node's parent element, or *null* if the node either has no parent, or its parent isn't a DOM element.

#### Parent Node Example:

The below example shows how to traverse a DOM using the `parentNode` property.

```javascript
const removeMe = document.querySelector('.remove_me');
let parent = removeMe.parentNode;
parent.removeChild(removeMe);
```

```html
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
```

#### Traversal Example:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <link href="https://fonts.googleapis.com/css?family=Courgette" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css?family=Lato:400,700" rel="stylesheet">
    <title>Traversing the DOM</title>
    <link rel="stylesheet" href="css/style.css">
  </head>
  <body>
    <div class="wrapper">
      <h1>Color Palette:</h1>
      <div></div>
      <ul class="list">
        <li>
          <span>Robin's Egg Blue</span>
          #04c5e6
        </li>
        <li>
          <span>Geyser</span>
          #b7c7d0
        </li>
        <li>
          <span>Jaffa</span>
          #f36f49
        </li>
        <li>
          <span>Shamrock</span>
          #57d6ab
        </li>
      </ul>
    </div>
    <script src="js/scripts.js"></script>
  </body>
</html>
```

```javascript
// STARTING POINT - select the <ul> with the class list
const list = document.querySelector('.list');

// 1: Store the first child of the `ul` in the variable `firstItem`
const firstItem = list.firstElementChild;
firstItem.style.backgroundColor = '#04c5e6';

// 2: Using traversal, store the second list item in a variable named `nextItem`
const nextItem = firstItem.nextElementSibling;
nextItem.style.backgroundColor = '#b7c7d0';

// 3: Store the last child of the `ul` in a variable named `lastItem`
const lastItem = list.lastElementChild;
lastItem.style.backgroundColor = '#57d6ab';

// 4: Using traversal, store the second-to-last list item in a variable named `prevItem`
const prevItem = lastItem.previousElementSibling;
prevItem.style.backgroundColor = '#f36f49';

// 5: Store the nested div in a variable named `banner`
const banner = list.previousElementSibling;
banner.className = 'banner';

// 6: Using traversal, store the wrapper div in a variable named `wrapper`
const wrapper = banner.parentElement;
wrapper.style.backgroundColor = '#fcfcfc';

// 7: Using traversal, store the body in a variable named `body`
const body = wrapper.parentElement;
body.style.backgroundColor = '#f8fdf3';
```

#### Using previousElementSibling and insertBefore

You can reference a previous sibling with the `previousElementSibling` property, and to insert a node before an element, with `insertBefore`.

For some background on why `previousSibling` and other similar properties don't always refer to element nodes, check out [this MDN article on Whitespace in the DOM](https://developer.mozilla.org/en-US/docs/Web/API/Document_Object_Model/Whitespace_in_the_DOM). There is also the [MDN page for previousElementSibling](https://developer.mozilla.org/en-US/docs/Web/API/NonDocumentTypeChildNode/previousElementSibling) and the [MDN page for insertBefore](https://developer.mozilla.org/en-US/docs/Web/API/Node/insertBefore)

#### Getting the First and Last Child

See the [MDN page for firstElementChild](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/firstElementChild) and the [MDN page for lastElementChild](https://developer.mozilla.org/en-US/docs/Web/API/ParentNode/lastElementChild) for more information.