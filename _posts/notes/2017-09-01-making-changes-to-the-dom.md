---
layout: article

permalink: /notes/making-changes-to-the-dom/

title: "Making Changes to the DOM"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "Once we've selected an element in the DOM, we can read or affect it. We can replace or change the display, for example. Or we can create new nodes and insert them into the DOM. This post contains notes on that."

categories: notes

modified: 2017-09-01
---

{% include /globalSections/toc.html %}

Once we've selected an element in the DOM, we can read or affect it. We can replace or change the display, for example. Or we can create new nodes and insert them into the DOM. This post contains notes on that.

If you want to get or set an elements class use `Element.className`.

The below will store the value of the text input element with the id of linkName. It then sets that value of the `a` tag with ID of like to the text that was returned from inputValue.

{% highlight javascript linenos %}
let inputValue = document.querySelector('#linkName').value;
document.querySelector('#link').innerHTML = inputValue;
{% endhighlight %}

## Styling Elements

If you enter `p.style` into the console it will show all the inline styles (and possible style properties).

This is why we don't typically style elements using the `.style` property.

However, hiding and showing an element is common practice.

The following example hides and shows the section with the class list.

{% highlight javascript linenos %}
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
{% endhighlight %}

## Creating New DOM Elements

We've made several changes to the elements on our page with JavaScript. Now it's time to take it to the next level and create new elements. 

You can create new elements with the `document.createElement()` method.

The idea here is seen below:

{% highlight javascript linenos %}
const contentDiv = document.getElementById("content");
addItemButton.addEventListener('click', () => {
  let li = document.createElement('li');
  li.innerHTML = addItemInput.value;
  document.querySelector('ul').appendChild(li);
  addItemInput.value = '';
});
{% endhighlight %}

## Removing Elements from the DOM

You can remove elements from the page, using the `removeChild()` method.

{% highlight javascript linenos %}
const removeItemButton = document.querySelector('button.removeItemButton');
removeItemButton.addEventListener('click', () => {
  let li = document.querySelector('li:last-child');
  document.querySelector('ul').removeChild(li);
});
{% endhighlight %}

## Full Example

{% highlight javascript linenos %}
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
{% endhighlight %}

{% highlight css linenos %}
@import 'https://fonts.googleapis.com/css?family=Lato:400,700';

body {
  color: #484848;
  font-family: 'Lato', sans-serif;
  padding: .45em 2.65em 3em;
  line-height: 1.5;
}
h1 {
  margin-bottom: 0;
}
h1 + p {
  font-size: 1.08em;
  color: #637a91;
  margin-top: .5em;
  margin-bottom: 2.65em;
  padding-bottom: 1.325em;
  border-bottom: 1px dotted;
}
ul {
  padding-left: 0;
  list-style: none;
}
li {
  padding: .45em .5em;
  margin-bottom: .35em;
  display: flex;
  align-items: center;
}
input,
button {
  font-size: .85em;
  padding: .65em 1em;
  border-radius: .3em;
  outline: 0;
}
input {
  border: 1px solid #dcdcdc;
  margin-right: 1em;
}
div {
  margin-top: 2.8em;
  padding: 1.5em 0 .5em;
  border-top: 1px dotted #637a91;
}
p.description,
p:nth-of-type(2) {
  font-weight: bold;
}
/* Buttons */
button {
  color: white;
  background: #508abc;
  border: solid 1px;
  border-color: rgba(0, 0, 0, .1);
  cursor: pointer;
}
button + button {
  margin-left: .5em;
}
p + button {
  background: #52bab3;
}
.list button + button {
  background: #768da3;
}
.list li button + button {
  background: #508abc;
}
li button:first-child {
  margin-left: auto;
  background: #52bab3;
}
.list li button:last-child {
  background: #768da3;
}
li button {
  font-size: .75em;
  padding: .5em .65em;
}
{% endhighlight %}