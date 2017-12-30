---
layout: article

permalink: /notes/jquery-recap/

title: "jQuery Recap"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "jQuery is a popular JavaScript library used to add interactivity to webpages quicker and easier. These notes summarize some of the basics."

categories: notes

date: 2017-12-22
---

{% include /globalSections/toc.html %}

jQuery is a popular JavaScript library used to add interactivity to webpages quicker and easier. These notes summarize some of the basics.

**jQuery became popular in the mid-2000s**, when there were a number of differences between how browsers like Internet Explorer, Firefox, Chrome, and Safari handled DOM (*Document Object Model*) programming. Browsers have come a long way in recent years. Not as much work needs to be done to make sure that JavaScript plays nice in ever version of every browser.

New native methods, like `querySelector` and `querySelectorAll`, have been added to the DOM API, making it easier to select elements. Because of this, there is a debate about whether jQuery is still worth learning and using. jQuery is still everywhere. **jQuery is active in millions of websites. With this much existing code, it's unlikely to disappear anytime soon.**

>Keep in mind it is probably no longer worthwhile to invest large amounts of time into becoming a jQuery expert, it's valuable to get to know jQuery enough to build simple projects, use plugins, maintain an existing code base, and add interactivity to webpages.

You may never use jQuery to build complex web applications, but it's still quite useful for prototyping, or for adding features to websites and smaller projects. **If you wanted to include a carousel, a drag and drop feature, light box, or loading animation to your webpage, you're going to be able to do that in a matter of minutes with preexisting jQuery solutions.**

In general, you'll find excellent documentation and a breadth of tutorials, videos, and courses to help you accomplish pretty much anything you want to do.

## jQuery vs. JavaScript

One thing to keep in mind is jQuery is still JavaScript.

The following uses JavaScript to hide an element with the class `box`.

```javascript
const box = document.querySelector('.box');
box.style.display = 'none';
```

The following is functionally the same:

```javascript
jQuery('.box').hide();
```

You can even save time with a shorthand for writing `jQuery` with the dollar sign, `$`.

```javascript
$('.box').hide();
```

`querySelector` was inspired by jQuery. [Learn more on MDN](https://developer.mozilla.org/en-US/docs/Web/API/Document/querySelector).

jQuery's click method is part of a group of methods that listen for an run code in response to an action that has occurred on your webpage. Like the user **clicking a button, submitting a form, moving the mouse around the screen, hovering over an element, and so on**.

The following uses plain JavaScript to display an alert on a click event:

```javascript
const box = document.querySelector('.box');
box.addEventListener('click', () => alert('You clicked me!'));
```

The following uses jQuery to display an alert on a click event:

```javascript
$('.box').click(() => alert('You clicked me!'));
```

Both of these work exactly the same way.

#### Quiz:

---

**Question**: What is the primary reason the jQuery library was developed for JavaScript?

**Answer**: To Address inconsistencies in the way JavaScript was implemented in different browsers.

**Question**: How would one best describe jQuery?

**Answer**: jQuery is a JavaScript library that provides a collection of convenience methods that make it easier to use JavaScript to manipulate elements on webpages. 

---

## Animating Elements with jQuery

There are many jQuery methods that can help easily manipulate the DOM. Manipulating DOM elements can include:

- adjusting an element's visibility,
- adding, deleting, or modifying the contents, or
- attributes of an element, and
- changing the styles of an element.

**One area where jQuery really shines is animation.** There are several build in methods that allow you to use fun animations when you add, remove, or reveal elements on a webpage.

- `fadeIn()`, and `fadeOut()` changes the opacity of an element over time.
- `slideDown()`, and `slideUp()` reveal an element with a sliding motion.
- `delay()` lets you add a delay between two animations.

#### Example One

Display a message when the page loads then hide it after a few seconds delay.

```javascript
$('#flashMessage').hide().delay(800).slideDown(1000).delay(1600).slideUp(500);
```

The above code hides the message with the ID `flashMessage` on page load, then after 800  milliseconds (or 0.8 seconds) the message slides down over 1000 milliseconds to reveal itself, then after another 1600 milliseconds the message slides over 500 milliseconds to hide itself again. *Note that the default value for these animation effects is 400 milliseconds.*

>Chaining like the above code works because most jQuery methods return the same element each time they're called.

When the `hide()` method is called on `#flashMessage`, jQuery hides the element, then returns a reference to that element. Think of it like a conveyor belt at a factory line.

#### Example Two

Hide the element with the class `.profile-header` then chain the animation `fadeIn()` after a 2 second delay.

```javascript
$('.profile-header').hide().delay(2000).fadeIn();
```

## Changing Content Inside Elements

Two jQuery methods, `text()` and `html()`, can be used to add content onto a webpage.

The `text()` method allows you to *get*, *insert*, or *change* text within the element's you;ve selected, while the `html()` method allows you to *get*, *insert*, or *change* HTML within the element you've selected.

>These kinds of methods are known as **getters** and **setters**.

Using the `html()` method with no arguments would get any value that is within the element we call it on. The HTML method with arguments is known as a setter because it sets a value.

```javascript
$('#element').html(); // getter
$('#element').html('<p>I am setting this HTML!</p>'); // setter
```

#### Example One

Use the `text()` method to set the text of arbitrary `h1` and `p` elements with the ID's `blogTitlePreview` and `blogContentPreview`, respectively, to whatever you choose:

```javascript
const title = "My First Blog Post";
const content = "This is my first post.";

$('#blogTitlePreview').text(title);
$('#blogContentPreview').text(content);
```

#### Example Two

Now, use the `html()` method to set the HTML of the same elements, but this time with the `<strong>` tag wrapping the words "first":

```javascript
const title = "My <strong>First</strong> Blog Post";
const content = "This is my <strong>first</strong> post.";

$('#blogTitlePreview').html(title);
$('#blogContentPreview').html(content);
```

*Note that if you did the same thing, but with the `text()` method, the strong tags would show as plain text and not HTML.*

#### Example Three

Set the text of an arbitrary `.profile-text` class to `"I am the best!"`. Then set the HTML of an arbitrary `.profile-header` class to `"<strong>Matthew</strong>"`

```javascript
$('.profile-text').text('I am the best!');
$('.profile-header').html('<strong>Matthew</strong>');
```

## Getting Values from Form Fields

The `.html()` and `.text()` methods cannot be used to get information, or *values*, from form inputs. We can get it using jQuery's `.val()` methods.

Consider a form (class *blogNewPost) with an input element (id *blogTitleInput*), a textarea element (id *blogContentInput*), and a button element (id *previewButton*):

```html
<label>Title</label>
<input type="text" id="blogTitleInput">
<label>Content</label>
<textarea id="blogContentInput"></textarea>
<button id="previewButton">Preview</button>
```

The goal is to add content of a blog post and make it so that you can preview said blog post when the button is clicked:

```html
<h2 id="blogTitlePreview"></h2>
<p id="blogContentPreview"></p>
```

Using, the `.val()` method to obtain the values from the form elements, a click event can be added to the button such that it retrieves the content and appends it to the `h2` and `p` elements:

```javascript
$('#previewButton').click(() => {
  let $blogTitle = $('#blogTitleInput').val();
  let $blogContent = $('#blogContentInput').val();
  $('#blogTitlePreview').html($blogTitle);
  $('#blogContentPreview').html($blogContent);
});
```

Note you could include the flash message when the button is clicked too:

```javascript
$('#flashMessage').hide();
$('#previewButton').click(() => {
  $('#flashMessage').slideDown(1000).delay(1600).slideUp(500);
  $('#blogTitlePreview').html($('#blogTitleInput').val());
  $('#blogContentPreview').html($('#blogContentInput').val());
});
```

#### Example Two

Use the `.keyup()` method to preview the blog post content insteads of the `.click()` method:

```javascript
$('#blogTitleInput').keyup(() => {
  $('#blogTitlePreview').html($('#blogTitleInput').val());
});

$('#blogContentInput').keyup(() => {
  $('#blogContentPreview').html($('#blogContentInput').val());
});
```

Refactoring this code:

```javascript
const previewContent = (input, output) => {
  $(input).keyup(() => {
    $(output).html($(input).val());
  });
}

previewContent('#blogContentInput', '#blogContentPreview');
previewContent('#blogTitleInput', '#blogTitlePreview');
```

#### Example Three

Select an input field with an ID of *name-input*, using the `.val()` method and change the text inside a paragraph tag with the class *profile-name*:

```javascript
$('button').click(function() {
  let newName = $('#name-input').val();
  $('.profile-name').text(newName);
});
```

#### Quiz:

---

**Question**: What is the appropriate jQuery method to retrieve information from a *form input field*?

**Answer**: val

**Question**: What best describes the concept "chaining" in jQuery?

**Answer**: Calling a series of jQuery methods on an element after you've selected it.

**Question**: What does `$('#price-list li').html('<strong>$4.99</strong>')` do?

**Answer**: Select the list item nested within *#price-list* and set its HTML content to **$4.99**.

**Question**: What does `$('.product-description').text()` do?

**Answer**: Return the contents of `$('.product-description')` as plain text.

---

## Understanding Unobtrusive JavaScript

Unobtrusive JavaScript is basically three principles:

- JavaScript, as a functional layer of webpages, should be kept separate from the structural and presentational layers, they HTML and CSS.
- Cross-browser inconsistancies should be accounted for. Users should have similar experiences, regardless of which browser they're using.
- Progressive enhancement is the idea that your website's core content and functionality should be available even when JavaScript is blocked, disabled, or not fully supported.

#### Why Would a User Turn Off JavaScript?

>A user may have some kind of firewall or plug-in that end up blocking or breaking your scripts intentionally or not. A business might disable JavaScript on employee computers to limit the use of certain websites. Or a user could be using an older browser at a public library, or school with older computers, or using a computer in a country that doesn't yet have the technology to support modern browsers, etc.

## Adding New Elements to the DOM

>To create an element in jQuery, all that needs to be done is *passing valid HTML to the jQuery method*. jQuery then creates a new DOM element, that can have other jQuery methods called on it.

The `.append()` method is used to add **HTML** to the *end* of a selected DOM element. The `.prepend()` method adds **HTML** to the *beginning* of a selected DOM element.

```javascript
const $button = $('<button>Reveal Spoiler!</button>');
$('.spoiler').append($button);
```

>Note the `$` in front of the `$button` constant. It is good practice to add this in front of a variable or constant that contains jQuery selections. Obviously, not needed, but good practice.

#### Quiz:

---

**Question**: Where should you include jQuery in your main HTML file?

**Answer**: Just before the closing body tag, before any JavaScript files that depend on jQuery.

**Question**: How would you write a descendant selector to select the paragraph tag in the following code?

```html
<div class="img-tile">
  <img src="images/edinburgh.jpg" alt="Edinburgh Castle"/>
  <p>A beautiful Sunday in Edinburgh</p>
</div>
```

**Answer**: `$('img-tile p');`

**Question**: What jQuery method is used to create and insert a new element into the DOM?

**Answer**: `append`

---

#### Example Two

Use jQuery to create a new `<li>` element containing the student name *"Sam Smith"*, and save your new element to a variable called `$newStudent`.

```javascript
let $newStudent = $('<li>Sam Smith</li>');
```

Append the new element to the unordered list with the class of `student-list`.

```javascript
$('.student-list').append($newStudent);
```

## Using on() for Event Handling

The `.click()` event is one of the most basic jQuery event handling events. There is also:

- `.mouseover()`, for when a user mouses over an element, and 
- `.keypress()`, for when a user presses a key in an input element, and 
- `.focus()`, for when an input field captures focus, and more!

Methods such as these are fine for simple applications, but they are limited. For example, what if you wanted to have more than one event, *a mouseover or a click*, you would have duplicate code. Instead you can use the `.on()` method:

```javascript
$('#element').on('click mouseover', () => {
  // do stuff when the element is clicked OR when moused over
});
```

#### Using Events with Dynamically Added Elements

The order in which JavaScript is ran matters. For example, if the events were placed, in the code, before the elements were dynamically added the event wouldn't would not work because the elements aren't yet there. That's where **event delegation** on the `.on()` method comes in.

>**Event delegation** means you're listening for an event on the parent element instead of on the child element.

Therefore, since the button is being added dynamically, it would make sense to listen for a click on the button's parent element, which is a paragraph tag with the class `spoiler`: 

```javascript
$('.spoiler').on('click mouseleave', 'button', () => {
  $spoilerText.show(); // show the spoiler text
  $button.hide(); // hide the "reveal spoiler" button
});
```

The second parameter of the `.on()` method is the element that the event is looking for. It is the child of the parent selector, in this example `$('.spoiler')`.

Because we're listening for an event on the parent element, it doesn't matter whether the descendants exist in the DOM at the time of the page load, or are dynamically added later. This is called **event propagation**.

>**Event propagation** is when an event moves through the DOM from child to a parent element, because the event *propagates, or moves through,* the DOM.

[Learn more about jQuery Events](https://learn.jquery.com/events/).

## The Event Object

Currently, when any button element is clicked a spoiler is revealed. This means if a second paragraph tag with a `spoiler` class is added both spoilers will be revealed when one of the buttons is clicked. This could be *fixed* by giving the second spoiler a new class or ID, but this is very inefficient. This is where the **event object** can be used to control which button is triggered.

>To access the **event object** we must pass a parameter in the event handler.

```javascript
$('#element').on('click', event => {
  // do something with the event click
});
```
The event object contains a bunch of information about the event that has just occurred. Some of this information can come in real handy. To see more you can log the event to the console. You can also log the event target to the console:

```javascript
$('#element').on('click', event => {
  console.log(event.target);
});
```
The above will log what was clicked. *This is how we can hide the specific button that was clicked*.

```javascript
$('.spoiler').on('click mouseleave', 'button', e => {
  $(e.target).hide();
});
```

[Learn more about the event object](https://learn.jquery.com/events/event-basics/#inside-the-event-handler-function).

#### Example Two:

Using the `.on()` method, attach an event handler to handle *click* events on the *ul* elements with the class of `.student-list`. Also, pass the *event* object to the callback function:

```javascript
$('.student-list').on('click', (event) => {
  // code
});
```

Inside of the click handler, use jQuery to select `event.target`. Then call the `.hide()` method on your selection.

```javascript
$('.student-list').on('click', (event) => {
  $(event.target).hide();
});
```

## What is Traversal?

>Traversal just means to travel across or through. Traversal, in the case of JavaScript or jQuery, means to traverse the DOM, or **to move from one element on the webpage to another.**

Consider the following unordered list:

```html
<ul>
  <li>Item One</li>
  <li>Item Two</li>
  <li>Item Three</li>
  <li>Item Four</li>
</ul>
```

If this unordered list is selected through jQuery, the list items would be described as the unordered lists **children**. If the second list item is selected, the unordered list element is the **parent** element. Lastly, the first, third, and fourth list items are known as **siblings** to the selected list item.

>The `.eq()` or equals method allows you to find an element in a set of elements by index. For example:

```javascript
$('li').eq(1).css({color: 'green'});
```

The above would turn the "Item Two" list item text color to green.

>The `.prev()` method can be used to select the previous sibling:

```javascript
$('li').eq(1).prev().css({color: 'green'});
```

The above would turn the "Item One" list item text color to green.

>The `.next()` method can be used to select the next sibling:

```javascript
$('li').eq(1).next().css({color: 'green'});
```

The above would turn the "Item Three" list item text color to green.

>Note that you can also chain multiple traversal methods together:

```javascript
$('li').eq(1).next().next().css({color: 'green'});
```

The above would turn the "Item Four" list item text color to green.

Keep in mind that if another `.next()` method was chained an *empty object would be returned* because a "Item Five" list item does not exist. Nothing turns green, but there is also *no error*.

#### Fixing the Spoiler Buttons

The problem is that when we click either button, all the spoilers are revealed, not just the spoiler that was clicked.

This can be solved by using the `prev()` method to show the previous element, which will be the spoiler text.

```javascript
$('.spoiler').on('click mouseleave', 'button', e => {
  $(e.target).prev().show(); // show the spoiler text
  $(e.target).hide(); // hide the "reveal spoiler" button
});
```

Note that this could potentially cause an error because this is assuming the HTML won't change and the text and button won't ever swap positions. *Or if we were to add another element between the button and text our code would break as well.*

>Note that instead of using `event.target` we could use the keyword `this`.

However, an arrow function won't work.

```javascript
$('.spoiler').on('click mouseleave', 'button', function(e) {
  $(this).prev().show(); // show the spoiler text
  $(this).hide(); // hide the "reveal spoiler" button
});
```

#### Example Two:

Given the following html:

```html
<ul class="student-list">
  <li>James McAvoy</li>
  <li>Alena Holligan</li>
  <li>Wade Christensen</li>
  <li>Matt Krzyzynski</li>
</ul>
```

Using jQuery, select all of the list items on the page. Then, using the `.eq()` method, select "Wade Christensen" from the list of students.

```javascript
$('li').eq(2);
```
Use, `.next()` or `.prev()` to traverse from "Wade CHristensen" to "James McAvoy":

```javascript
$('li').eq(2).prev().prev();
```

#### Quiz:

---

**Question**: In the following snippet, which elements would be considered the siblings of `<div>`?

```html
<h1>My Personal Website</h1> 
<h2>Learn all about me!</h2>
<div>
    <img src=”images/profile-img.jpg" alt=”Profile image of Jane Q. Student” />
    <p>My name is Jane.</p>
    <p>I have a cat named Eleven.</p>
    <p>My favorite show is Doctor Who.</p>
</div>
```

**Answer**: The heading elements.

**Question**: Each time an event listener is triggered on a webpage, we receive a bundle of useful information such as the type of event that occurred and the event that triggered the event. This bundle of information is known as:

**Answer**: The event object

**Question**: Which of the following best describes why you might use the `.on()` method?

**Answer**: The `.on()` method allows you to assign an event handler to more than one event.

**Question**: I've attached an event listener to `<ul>` that listens for clicks on the `<ul>`'s list item elements. This is an example of what?

**Answer**: Event delegation

**Question**: In the context of an event handler, `event.target` can be used to do what?

**Answer**: Refer to the specific DOM element that triggered the event.

---

## jQuery-Specific Selectors

