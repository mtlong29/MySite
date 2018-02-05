---
layout: article

permalink: /notes/javascript/

title: "JavaScript"

subtitle: "Basic Syntax"

excerpt: "JavaScript (JS) is a lightweight interpreted programming language with first-class functions. While it is most well-known as the scripting language for web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB, and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles."

categories: notes

date: 2017-11-01
---

{% include /globalSections/toc.html %}

**JavaScript, JS, is a lightweight interpreted programming language with first-class functions.** While it is most well-known as the scripting language for web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB, and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.

## Variables and Constants

>Use `let` and `const` as variables. `let` is the same as what `var` was. `const` is a constant and cannot be changed. **Always use `const` unless you will need to change the value then use `let`, never use `var`.**

## Strings and String Manipulation

There are many ways to manipulate strings such as strings concatenation, string methods, and many more. Much of which is similar to other languages.

#### String Literals and Interpolation

There is a new way to create a string using ES2015. Template literals can be written just like other strings except **instead of single quotes or double quotes use back tick character.**

>Template literals get their name from their ability to evaluate expressions.

```javascript
const student = { name: 'James', followerCount: 34 };
let html = `
  <h1>${student.name}</h1>
  <p>followers: ${student.followerCount}</p>`;
console.log(html);
// <h1>James</h1>
// <p>followers: 34</p>
```

#### String Methods

With the new `startsWith()`, `endsWith()`, and `includes()` methods we can use plain english when writing JavaScript when searching strings. All of the new methods take a second parameter. The second parameter for the `includes` maximum length of the searchable string. Therefore, if you add `20` as a second parameter it will only look after the first 20 characters.

```javascript
const str = 'To be, or not to be, that is the question.';
console.log(str.startsWith('To be')); // true
console.log(str.startsWith('not to be')); // false
console.log(str.startsWith('not to be', 10)); // true
```

The `charAt()` method returns a new string consisting of the single value located at specified offset into the string.

```javascript
const anyString = 'Brave new world';
console.log(`The character at index 0 is ${anyString.charAt()}.`);
// The character at index 0 is 'B'.
```

## Arrays

>An array is an ordered collection of values. 

An array element, like objects, may end with a comma. This can make it easier to add new values without risking forgetting a comma:

```javascript
const fruits = [
  'Apple',
  'Banana',
];
```

The array property `length` returns the number of elements in the array.

#### Useful Array Methods

There are **many** array methods that have been around for a very long time:

- `pop()` removes the last element from an array and returns that element, this method changes the length of the array ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/pop)).
- `push()` adds one or more elements to the end of an array and returns the new length of the array ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/push)).
- `shift()` extracts the first element of the array and returns it, this changes the length of the array ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift)).
- `unshift()` adds the element(s) to the beginning of an array and returns the new length of the array ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/unshift)).
- `slice()` returns a shallow copy of a portion of an array into a new array object selected from begin to end ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/slice)).
- `splice()` changes the contents of an array by removing existing elements and/or adding new elements ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/splice)).
- `sort()` sorts the elements of an array *in place*, according to string Unicode code points by default, and returns the array ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort)).

New array methods have been added with the latest JavaScript update:

**The `forEach()` method executes a provided function once for each array element** ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)).

```javascript
const fruits = ['apple', 'pear', 'cherry'];
fruits.forEach(fruit => {
  console.log(fruit);
});
// apple
// pear
// cherry
```

**The `filter()` method creates a new array with all elements that pass the test implemented by the provided function** ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter)).

```javascript
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const evens = numbers.filter(number => number % 2 === 0);      
console.log(evens);
// [2, 4, 6, 8, 10]
```

**The `map()` method creates a new array with the results of calling a provided function on every element in the calling array** ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map)).

```javascript
const prices = [5, 4.23, 6.4, 8.09, 3.20];
const displayPrices = prices.map(price => `$${price.toFixed(2)}`);
console.log(displayPrices);
// ['$5.00', '$4.23', '$6.40', '$8.09', '$3.20']
```

**The `reduce()` method applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value** ([learn more](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce)).

```javascript
const prices = [6.75, 3.10, 4.00, 8.12];
const total = prices.reduce((sum, price) => sum + price, 0);
console.log(total);
// 21.97
```

## Objects

>An object is a container for values in the form of properties and functionality in the form of methods.

**An object literal holds data, or information, about a particular thing at a given time.** Basically an object literal stores the state of a thing.

```javascript
const person = {
  name: "Kayla",
  student: true
}
person.name;
// "Kayla"
person.["student"];
// true
```

In the JavaScript programming language an objects keys are always strings, but the JavaScript interpreter is clever enough to interpret the keys as strings without quote marks as long as they are *valid variable names*.

```javascript
const person = {
  "name": "Kayla",
  "student": true
}
```

You can also create a method:

```javascript
const dice = {
  sides: 6,
  roll: function() {
    const randomNumber = Math.floor(Math.random() * this.sides) + 1;
    console.log(randomNumber);
  }
}
```

>Think of `this` as the owner of the function. That is the object where the method is called.

## Functions

>Functions are one of the fundamental building blocks in JavaScript. A function is a JavaScript procedure—a set of statements that performs a task or calculates a value. To use a function, you must define it somewhere in the scope from which you wish to call it.

A function definition (also called a function declaration, or function statement) consists of the function keyword, followed by:

- The name of the function.
- A list of parameters to the function, enclosed in parentheses and separated by commas.
- The JavaScript statements that define the function, enclosed in curly brackets, {}.

```javascript
function square(x) {
  return x * x;
}
square(2);
// 4
```

#### Closures

JavaScript allows for the **nesting of functions** and grants the inner function full access to all the variables and functions defined inside the outer function (and all other variables and functions that the outer function has access to). However, the **outer function does not have access to the variables and functions defined inside the inner function**.

#### Arrow Functions

An arrow function (often referred to as lambda functions in other languages) expression has a shorter syntax compared to function expressions and lexically binds the this value. **Arrow functions are less verbose than function declarations.** But they can get even more concise.

You can reduce the arrow syntax further by removing the curly braces when you only have a single line of code in your function. Don't forget if there are more than one argument for a function you have to include the parentheses. Also, if there are no arguments you must have the empty parentheses, `()`.

```javascript
const square = (x) => x * x;
const cube = (x) => square(x) * x;
cube(2);
// 8
```

Two factors influenced the introduction of arrow functions: shorter functions and **lexical this**. Until arrow functions, every new function defined its own this value (a new object in case of a constructor, undefined in strict mode function calls, the context object if the function is called as an "object method", etc.).

#### Default Parameters

In JavaScript, parameters of functions default to undefined. However, in some situations it might be useful to **set a different default value**. This is where default parameters can help.

```javascript
function multiply(a, b = 2) {
  return a * b;
}
multiply(5); 
// 10
```

## Conditional Statements

Conditional statements such as `if else` statements, `switch` statements, and more execute code based off of a condition.

#### If Else Statement

The if statement executes a statement if a specified condition is truthy. If the condition is falsy, another statement can be executed.

```javascript
if (x > 5) {
 // do the thing
} else if (x > 50) {
 // do the other thing
} else {
 // do the other other thing
}
```

#### Ternary Operator

A ternary operator is a compact, two-way branching conditional expression. Many developers use this. However, it is so compact that it can be difficult to read. ’s called ternary because it involves three expressions. `<boolean>`, `<expression if true>`, and `<expression if false>`.

```javascript
const isTrue = true;
isTrue ? console.log('yes') : console.log('no');
// yes
```

## Control Structures

There are numerous looping techniques used in JavaScript.

#### For Loops

The `for` statement creates a loop that consists of three optional expressions, enclosed in parentheses and separated by semicolons, followed by a statement (usually a block statement) to be executed in the loop. This looks like `for ([initialization]; [condition]; [final-expression]) {}`. A for loop repeats until a specified condition evaluates to false. The JavaScript for loop is similar to the Java and C for loop.

```javascript
for (let i = 0; i < 5; i++) {
   console.log(i);
   // more statements?
}
// 0
// 1
// 2
// 3
// 4
```
>Note that a `let` variable declaration is localized to each cycle of a for loop.

#### While Loops

The `while` statement creates a loop that executes a specified statement **as long as the test condition evaluates to true**. The condition is evaluated before executing the statement.

```javascript
let n = 0;
let x = 0;
while (n < 3) {
  n++;
  x += n;
}
```

#### Do While Loops

The `do...while` statement also repeats until a specified condition evaluates to false. **Statement executes once before the condition is checked.**

```javascript
let i = 0;

do {
  i += 1;
  console.log(i);
} while (i < 5);
// 0
// 1
// 2
// 3
// 4
```

#### Array Iteration

The `forEach()` method is used to iterate over an array.

```javascript
const numbers = [1, 2, 3, 4, 5];
let total = 0;
numbers.forEach(number => total += number);
console.log(total);
// 15
```

[Learn more about arrays](#arrays).

## The DOM

>**DOM stands for Document Object Model.** The DOM is a representation of a webpage that JavaScript can use. Changes that JavaScript makes to the DOM alter the web page. 

#### Selecting Elements

Select elements using `document.querySelector()` (selects a *single element*) and `document.querySelectorAll()` (selects a *collection of elements* - can use indexing afterward). Use **CSS query style selectors to DOM elements**:

```javascript
document.querySelector('#elementID .nestedElementClass');
```

>Note that when you select an element it will return that elements object. You can use the properties of that object to set `style`, `innerText`, `innerHTML`, and more. Select the element in the console, or log the element to the console to see the object's properties!

```javascript
const titleElement = document.querySelector('h1');
titleElement.innerHTML = '<strong>J</strong>ava<strong>S</strong>cript';
titleElement.style.background = '#afa';
```

#### DOM Traversal

Traversal basically means **going from one element to another**. After you have selected an element you can use the following properties to traverse to another element:

- `firstElementChild` returns the object's first child Element, or *null* if there are no child elements.
- `lastElementChild` returns the object's last child element, or *null* if there are no child elements.
- `previousElementSibling` returns the element immediately prior to the specified one in its parent's children list, or *null* if the specified element is the first one in the list.
- `nextElementSibling` returns the element immediately following the specified one in its parent's children list, or *null* if the specified element is the last one in the list.
- `parentElement` returns the DOM node's parent element, or *null* if the node either has no parent, or its parent isn't a DOM element.

```html
<body>
  <h1>Title text</h1>
  <ul>
    <li>
      <span>Span text</span>
    </li>
  </ul>
</body>
```

```javascript
// select the unordered list
const list = document.querySelector('ul');

// change the list item background to red
list.firstElementChild.style.background = 'red';

// change text of span element to 'better span text'
list.firstElementChild.firstElementChild.innerText = 'Better span text.';

// change heading elements html
list.previousElementSibling.innerHTML = '<bold>Better title</bold>';

// change body elements background color to blue
list.parentElement.style.background = 'blue';
```

#### Creating and Removing DOM Elements

You can add *new* elements to the DOM using the `document.createElement()` method. This appends the new element to the the selector, be it the document, an element, etc. There is also the `insertBefore()` method that inserts a node before the reference node as a child of a specified parent node.

You can remove elements from the page, using the `removeChild()` method.

#### Creating an Event Listener

The `addEventListener()` method adds the specified event listener compatible object to the list of event listeners for the specified event type on the event target on which it is called. **The event target may be an *element* in a document, the document itself, a window, or any other object that supports events such as XMLHttpRequest.**

```javascript
EventTarget.addEventListener('click', (event) => {
  // handle event
});
```
*Click* isn't the only event. Some common events are *focus*, *blur*, *resize*, *scroll*, *keypress*, *keyup*, *mouseover*, *dblclick*, and *drag*. For an extensive list see the [MDN Event Reference Page](https://developer.mozilla.org/en-US/docs/Web/Events).

#### Execute Code Based Off Timing Functions

The `setTimeout()` method sets a timer which executes a function, or specific part of code, after the timer expires. Similarly, the `setInterval()` method repeatedly calls a function, or specific part of code, with a fixed time delay between each call.

```javascript
const intervalID = window.setInterval(() => {
  // Your code here
}, 500);
```

Note that the time is in *milliseconds*.

## Learn More About JavaScript

- [MDN JavaScript Documents](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [devhints.io/es6](https://devhints.io/es6)
- [jQuery Notes](/notes/jquery-recap/)
- [jQuery Documentation](http://api.jquery.com/)
- [Gulp Notes](/notes/gulp-basics/)
- [Gulp Documentation](https://github.com/gulpjs/gulp/blob/master/docs/API.md)