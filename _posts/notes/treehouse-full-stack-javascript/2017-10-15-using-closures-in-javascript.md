---
layout: article

permalink: /notes/using-closures-in-javascript/

title: "Using Closures in JavaScript"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on JavaScript closures. A closure is an inner function that has access to the outer (enclosing) function's variables scope chain."

categories: notes

date: 2017-10-15
---

{% include /globalSections/toc.html %}

**A closure is an inner function that has access to the outer (enclosing) function's variables scope chain.** Closures often come up in job interview so knowing what they are can help you land the right job.

## The Problem with Globals

Global variables can be a huge problem in JavaScript. **As JavaScript get more complex with multiple people and files being included, the problem of a global variable being used in more than one place is more likely to happen; breaking your code, especially if you import a library written by someone else.**

```javascript
var count = 0;
function countBirds() {
  count += 1;
  return count + ' birds';
}
function countDogs() {
  count += 1;
  return count + ' dogs';
}
countBirds()
// "1 birds"
countBirds()
// "2 birds"
countBirds()
// "3 birds"
countDogs()
// "4 dogs"
countBirds()
// "5 birds"
countDogs()
// "6 dogs"
```

In the above example you will see that two functions are sharing the same variable in the global scope. The `count` variable is incremented every time either `countDogs()` or `countBirds()` is executed.

#### Maintaining Separate States

>Maintaining separate states for count is the main objective. 

Using separate counts (variables) might make sense for this simple example. But what if we wanted to count thousands of things. Closures can help solve these problems.

## What are Closures?

The closure is a powerful and useful concept in JavaScript.

>A closure is a function with access to its own private variables that no other function knows about or can access.

You can create any number of closures even with the same variable name contained within each one of them. **This is because the variables are hidden from all other functions.**

#### Global and Local Scope

**Functions can see variables defined inside and outside said function. However, the variable defined inside a function is not accessible outside that function.** See this described in an example below:

```javascript
var birds = 3;
function dogHouse() {
	var dogs = 8;
  console.log(birds); // 3
  console.log(dogs); // 8
}
console.log(birds); // 3
console.log(dogs); // undefined
```

#### Inner Functions

**An inner function is a function that is inside another function. Variables that are defined outside the inner function but inside the outer function is accessible.** See this described in an example below:

```javascript
var birds = 3;
function dogHouse() {
  var dogs = 8;
  function showDogs() {
    console.log(dogs);
  }
  return showDogs;
}
var getDogs = dogHouse();
getDogs(); // 8
```

The `dogHouse()` function is called an outer function. All variables within the outer function are visible to the inner function, even though they are hidden from the global scope. **Just like the outer function has access to the global variables, the inner function has access to the outer function scope.**

## Closures

A closure looks like the below, an outer function, some private variables within the outer function scope, an inner function that could modify or log out, and of the private variables, and finally the inner function is returned. **Every time the outer function is called, a new private scope is created, and the inner function returned can read and modify any private variables for this private scope.** This new scope is separate from any closures the outer function has created previously.

```javascript
function outerFunction() {
  var someCount = 0;
  function innerFunction() {
    someCount++;
    console.log("Called " + someCount + " times");
  }
  return innerFunction;
}
counter1 = outerFunction();
counter2 = outerFunction();
counter1(); // Called 1 times
counter2(); // Called 1 times
```

#### Fixing Example with Closures

Recall the example with the variable sharing issue below:

```javascript
var count = 0;
function countBirds() {
  count += 1;
  return count + ' birds';
}
function countDogs() {
  count += 1;
  return count + ' dogs';
}
countBirds()
// "1 birds"
countBirds()
// "2 birds"
countBirds()
// "3 birds"
countDogs()
// "4 dogs"
countBirds()
// "5 birds"
countDogs()
// "6 dogs"
```

Creating a closure:

```javascript
function makeBirdCounter() {
  var count = 0;
  function counter() {
    count ++;
    return count + ' bird(s)';
  }
  return counter;
}
var birdCounter = makeBirdCounter();
birdCounter(); // "1 bird(s)"
birdCounter(); // "2 bird(s)"
birdCounter(); // "3 bird(s)"
birdCounter(); // "4 bird(s)"
```

Now if we add the `dogCounter()` function back you'll see we use the same variable name but they are not affected by each other.

```javascript
function makeBirdCounter() {
  var count = 0;
  function counter() {
    count ++;
    return count + ' bird(s)';
  }
  return counter;
}
function makeDogCounter() {
  var count = 0;
  function counter() {
    count ++;
    return count + ' dog(s)';
  }
  return counter;
}
var birdCounter = makeBirdCounter();
var dogCounter = makeDogCounter();
birdCounter(); // "1 bird(s)"
birdCounter(); // "2 bird(s)"
dogCounter(); // "1 dog(s)"
birdCounter(); // "3 bird(s)"
birdCounter(); // "4 bird(s)"
dogCounter(); // "2 dog(s)"
dogCounter(); // "2 dog(s)"
```

If we create a new variable called `birdCounter2` it will have it's own private scope as well.

#### Refractoring Example

There are a number of things we can do to refractor this example. First **we don't need to name the inner function and then return it. We can return it from the start.** Second, since the inner functions are the same except for the animal name we can use **DRY programming** and use a parameter instead. Of course we will rename some functions as well:

```javascript
function makeCounter(noun) {
  var count = 0;
  return function() {
    count++;
    return count + ' ' + noun + '(s)';
  }
}
var birdCounter = makeCounter('bird');
var dogCounter = makeCounter('dog');
var fishCounter = makeCounter('fish');
birdCounter(); // "1 bird(s)"
birdCounter(); // "2 bird(s)"
fishCounter(); // "1 fish(s)"
fishCounter(); // "2 fish(s)"
fishCounter(); // "3 fish(s)"
dogCounter(); // "1 dog(s)"
birdCounter(); // "3 bird(s)"
birdCounter(); // "4 bird(s)"
dogCounter(); // "2 dog(s)"
dogCounter(); // "2 dog(s)"
```

Now it is very easy to create a new counter for anything we wish. We can also use ECMAScript2015:

```javascript
const makeCounter = noun => {
  let count = 0;
  return () => {
    count++;
    return `${count} ${noun}(s)`;
  }
}
const birdCounter = makeCounter('bird');
const dogCounter = makeCounter('dog');
const fishCounter = makeCounter('fish');
birdCounter(); // "1 bird(s)"
birdCounter(); // "2 bird(s)"
fishCounter(); // "1 fish(s)"
fishCounter(); // "2 fish(s)"
fishCounter(); // "3 fish(s)"
dogCounter(); // "1 dog(s)"
birdCounter(); // "3 bird(s)"
birdCounter(); // "4 bird(s)"
dogCounter(); // "2 dog(s)"
dogCounter(); // "2 dog(s)"
```

## Uses for Closures

Real world usages for closures:

- Distributing JavaScript Modules
- jQuery
- Moment.js
- Underscore.js
- Express Middleware

Middleware is an often example of where closures are used. 

>ECMAScript2015 has made it so that closures aren't needed as often. **This is due to the `let` keyword. `let` creates a new block scope.**