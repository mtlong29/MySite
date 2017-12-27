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

#### Quiz

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

#### Quiz

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
