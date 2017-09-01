---
layout: article

permalink: /notes/constructor-functions-and-prototypes/

title: "Constructor Functions and Prototypes"

subtitle: "Treehouse - Front End Web Development"

excerpt: "These notes discuss what a constructor function is. It explains that object literals aren't the only way to create objects. If you're making a lot of similar objects you can use a constructor function to generate new objects of the same kind. A constructor functions describes how an object should be created, create similar objects, and each object created is known as an instance of that object type."

categories: notes

modified: 2017-08-27
---

{% include /globalSections/toc.html %}

## Creating Multiple Instances with Constructors

Object literals aren't the only way to create objects. If you're making a lot of similar objects you can use a constructor function to generate new objects of the same kind.

### Limitation to Object Literals

Just because there are limitation doesn't mean you shouldn't use them. If you want to make more than one object that are similar to each other you'll want to use constructor functions.

### Constructor Functions
<ul>
  <li>Describes how an object should be created.</li>
  <li>Create similar objects.</li>
  <li>Each object created is known as an instance of that object type.</li>
</ul>

An example of a constructor function:

{% highlight javascript linenos %}
function Contact(name, email) {
  this.name = name;
  this.email = email;
}
var contact = new Contact("Andrew", "andrew@teamtreehouse.com");
{% endhighlight %}

The `var contact = new Contact("Andrew", "andrew@teamtreehouse.com");` portion of the code is called an instance. This contact is a specific realization of a contact and their defaults. When you create a new instance you use the `new` keyword. 

Note that there is not a `return` statement. They are not needed for constructor functions.

Contructor functions help keep your programming DRY. Meaning you don't repeat yourself!

## Dice Roll Example as Constructor Function

{% highlight javascript linenos %}
function Dice(sides) {
  this.sides = sides;
  this.roll = function () {
    return Math.floor(Math.random() * this.sides) + 1;
  }
}
var dice = new Dice(6);
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
  <p id="placeholder"></p>
  <button id="button">Roll Dice</button>
  <script src="dice.js"></script>
  <script src="ui.js"></script>
</body>
</html>
{% endhighlight %}

## Methods with Prototypes

Further reading: <a class="fancyLink" href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Object/prototype">Object Prototypes</a>

So far we've been adding methods as we've been creating or instantiating them in our constructor function which can have negative effects. There is another more efficient way of doing it, using Prototypes.

{% highlight javascript linenos %}
function Dice(sides) {
  this.sides = sides;
  this.roll = function () {
    return Math.floor(Math.random() * this.sides) + 1;
  }
}
var dice = new Dice(6);
var dice10 = new Dice(10);
console.log(dice.roll === dice10.roll);
// false
{% endhighlight %}

The above code block means that each time a new instance is create the construction function is ran over and over. Every time we create an object, this code is ran. And a new anonymous function is created again and again. What this means is that your program is taking up more space in the computer's RAM. This could slow the whole browser down. Most computers today can handle this, but some may not.

A solution to this is as follows:

{% highlight javascript linenos %}
function diceRoll() {
  return Math.floor(Math.random() * this.sides) + 1;
}
function Dice(sides) {
  this.sides = sides;
  this.roll = diceRoll;
}
var dice = new Dice(6);
var dice10 = new Dice(10);
console.log(dice.roll === dice10.roll);
{% endhighlight %}

However, now we have a function floating around. It may get difficult tracking down which external function works with what method call. JavaScript provides a way to organize our code with construction functions, and that's with a special property called prototype.

The prototype on a construction function is an object like an object literal. It looks like the following:

{% highlight javascript linenos %}
function Dice(sides) {
  this.sides = sides;
}
Dice.prototype.roll = function() {
  return Math.floor(Math.random() * this.sides) + 1;
}
var dice = new Dice(6);
var dice10 = new Dice(10);
console.log(dice.roll === dice10.roll);
// true
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

Now you can see that `dice.roll === dice10.roll` is `true`.