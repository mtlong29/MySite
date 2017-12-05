---
layout: article

permalink: /notes/const-and-let/

title: "Defining Variables with let and const"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "Notes on new ways to declare a variable in JavaScript. The var declaration is no longer recrommended due to undesirable behaviors. Therefore, use const if the variable isn't going to be reassigned. Use let if the variable will be reassigned."

categories: notes

date: 2017-08-31
---

{% include /globalSections/toc.html %}

For most of JavaScript's life, there's been only one way to create, or "declare", a variable: the `var` keyword. In a recent version of JavaScript there are two new ways: `const` and `let`.

{% highlight javascript linenos %}
var message = 'Hello';
let something = 'Yo';
const woohoo = 'Hi';
{% endhighlight %}

Most JavaScript developers learned the `var` method, and a lot still use the `var` keyword.

Some of the behaviors from using `var` can be problematic or unexpected. That is why developers of the JavaScript programming language decided to introduce new ways fro creating variables. The sixth version of JavaScript, called ES2015, or ECMAScript 2015, introduced two new keywords, `const` and `let`.

As you can see about `const` and `let` work in similarily to `var`.

## Creating Unchanging Variables With Const

Using the keyword `const` to create variables have a number of benefits including the ability to prevent the value from being reassigned.

`const` is the first method you should consider when creating a variable. `const` is short for constant, meaning that the value of the variable shouldn't change it should remain constant.

Some examples of when to use `const`:

<ul>
  <li>Tax rates</li>
  <li>Dimensions of user interface components</li>
  <li>Product prices</li>
</ul>

## Using Constants with Arrays and Objects

You cannot reassign a constant variable in the case of a number or a string. The same goes for any value of a constant variable. You cannot reassign strings, numbers, booleans. Objects and arrays have methods and properties that modify the objects or array. 

{% highlight javascript linenos %}
const days = ["Monday"];
days.push("Tuesday");
const
// ["Monday", "Tuesday"]
const days = ["Wednesday", "Thursday"];
// Uncaught TypeError: Assignment to constant variable.
const person = {
  firstName: "Matthew", 
  lastName: "Long"
}
person = {
  firstName: "Billy", 
  lastName: "Boi"
}
// Uncaught TypeError: Assignment to constant variable.
person.firstName = "Billy";
// person = {firstName: "Billy", lastName: "Long"}
{% endhighlight %}

You can modify them but you cant reassign them.

## Defining a Variable with let

Using constants is a best practice when assigning variables, but what happens when you do actually want to reassign a value. That's where `let` comes in.

In this respect it works just like `var`.

{% highlight javascript linenos %}
let score = 1;
score++
// 2
{% endhighlight %}

## Using let with for Loops

If you use the `var` declaration in a for loop then `i`, for example, is defined globally. 

The following example will show the difference between using `let` and `var` in a for loop.

{% highlight html linenos %}
<button>Button 0</button>
<button>Button 1</button>
<button>Button 2</button>
<button>Button 3</button>
<button>Button 4</button>
<button>Button 5</button>
<button>Button 6</button>
<button>Button 7</button>
<button>Button 8</button>
<button>Button 9</button>
<button>Button 10</button>
{% endhighlight %}

So the following alert would display 10 every time a button is pressed.

{% highlight javascript linenos %}
const buttons = document.getElementsByTagName('button');
for (var i = 0; i < buttons.length, i++) {
  const button = buttons[i];
  button.addEventListener('click', function() {
    alert('Button ' + i + ' Pressed')
  });
}
{% endhighlight%}

This time the `let` variable declaration of `i` is localized to each cycle of the for loop. Which means the correct `i` value will show depending on which button is clicked.

{% highlight javascript linenos %}
const buttons = document.getElementsByTagName('button');
for (let i = 0; i < buttons.length, i++) {
  const button = buttons[i];
  button.addEventListener('click', function() {
    alert('Button ' + i + ' Pressed')
  });
}
{% endhighlight%}

The problem with `var` is related to scope. The variable `i` lives in what's called the global score.

Using `let` gives each button its own local copy of `i`. This means that the `let` variable declaration of `i` is localized to each cycle of the for loop. In other words the `i` variable is distinct for each cycle through the loop.

## Overview

`const` is used for values you never want to change. The `let` is used for values you want to reassign. The `var` usage should be avoided.

Think of the difference when you use `let` the variable is only available inside the loop, but if you use `var` it is available outside the loop as well.