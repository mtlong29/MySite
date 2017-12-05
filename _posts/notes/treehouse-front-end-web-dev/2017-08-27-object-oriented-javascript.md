---
layout: article

permalink: /notes/object-oriented-javascript/

title: "Object Oriented JavaScript"

subtitle: "Treehouse - Front End Web Development"

excerpt: "An object is a container for values in the form of properties and functionality in the form of methods. Functionality encapsulated by an object is known as a method. These notes discuss this among other object oriented JavaScript details."

categories: notes

date: 2017-08-27
---

{% include /globalSections/toc.html %}

## Object

An object is a container for values in the form of properties and functionality in the form of methods.

{% highlight javascript linenos %}
var h1 = document.getElementById('header');
console.log(h1.innerHTML);
h1.innerHTML = 'JavaScript is Awesome!';
{% endhighlight %}

Functionality encapsulated by an object is known as a method!

In the example above the `getElementById` method is used on the `document` object. Methods provide functionality and return values. However, they don't have to return anything at all. Properties can be accessed or assigned (getting or setting).

<ul>
  <li>Objects provide functionality through methods. Methods may or may not return values.</li>
  <li>Objects provide data storage in properties.</li>
  <li>The name of the perperty is a key.</li>
  <li>The contents of a property is known as a value.</li>
</ul>

## Three distint Kinds of Objects

There are three distinct kinds of objects

<ul>
  <li>Native Objects in JavaScript</li>
  <li>Host Objects in the Browser</li>
  <li>Your Own Objects</li>
</ul>

### Native Objects in JavaScript

Some examples:

<ul>
  <li>Number</li>
  <li>String</li>
  <li>Array</li>
  <li>Boolean</li>
  <li>Object</li>
</ul>

### Host Objects in the Browser

Some examples:

<ul>
  <li>Document</li>
  <li>Console</li>
  <li>Element</li>
</ul>

### your Own Objects

Some examples:

<ul>
  <li>Contacts in an address book</li>
  <li>Characters in a game</li>
  <li>Songs in a playlist</li>
</ul>

## Real World Objects

Objects in programming allow us to model things that we have and use in real life. All real world objects have two common characteristics.

<ul>
  <li>State</li>
  <li>Behavior</li>
</ul>

You can say that the state of an object is stored in its properties and its behavior in its methods.

An example of a real world object is a radio. Its state is on off, change the station, and change the volume.

## Object Literal

An object literal holds data or information about a particular thing at a given time. Basically an object literal stores the state of a thing.

{% highlight javascript linenos %}
var person = {
  name: "Lauren",
  treehouseStudent: true
}
person.name;
person.treehouseStudent;
{% endhighlight %}

Another way to access the properties on an object is using square brackets.

{% highlight javascript linenos %}
person["name"];
person["treehouseStudent"];
{% endhighlight %}

They are in quote marks because each key is actually a string. In the JavaScript programming language an objects keys are always strings, but the JavaScript interpretor is clever enough to intrepret the keys as strings without quote marks as long as they are valid variable names. If you use the quote marks you can make keys that aren't valid variable names such as spaces. This is bad practice.

See what the interpretor sees as follows:

{% highlight javascript linenos %}
var person = {
  "name": "Lauren",
  "treehouseStudent": true
}
{% endhighlight %}

## Adding a Method to an Object

### Project Example Step One

{% highlight javascript linenos %}
function diceRoll() {
  var sides = 6;
  var randomNumber = Math.floor(Math.random() * sides) + 1;
  console.log(randomNumber);
}
var dice = {}
{% endhighlight %}

### Project Example Step Two

{% highlight javascript linenos %}
var dice = {
  roll: function () {
    var sides = 6;
    var randomNumber = Math.floor(Math.random() * sides) + 1;
    console.log(randomNumber);
  }
}
{% endhighlight %}

### Project Example Step Three

{% highlight javascript linenos %}
var dice = {
  sides: 6,
  roll: function () {
    var randomNumber = Math.floor(Math.random() * this.sides) + 1;
    console.log(randomNumber);
  }
}
{% endhighlight %}

Think of `this` is the owner of the function. That is the object where the method is called.

### Final Project Example

{% highlight javascript linenos %}
var dice = {
  sides: 6,
  roll: function () {
    return Math.floor(Math.random() * this.sides) + 1;
  }
}
function printNumber(number) {
  var placeholder = document.getElementById("placeholder");
  placeholder.innerHTML = number;
}
var button = document.getElementById("button");
button.onclick = function() {
  var result = dice.roll();
  printNumber(result);
};
{% endhighlight %}

{% highlight html linenos %}
<html>
<head>
    <title>Dice Simulator 2015</title>
    <link rel="stylesheet" href="style.css">
</head>  
<body>
  <p id="placeholder">
  
  </p>
  <button id="button">Roll Dice</button>
  <script src="dice.js"></script>
  <script src="ui.js"></script>
</body>
</html>
{% endhighlight %}

## Simple Addition Calculator
{% highlight javascript linenos %}
var calculator = {
		sum: 0,
		add: function(value) {
      this.sum += value;
    },
    clear: function() {
      this.sum = 0;
    }, 
    equals: function() {
      return this.sum;
    }
}
{% endhighlight %}