---
layout: article

permalink: /notes/javascript/

title: "JavaScript"

subtitle: "Basic Syntax"

excerpt: "Basic Syntax for JavaScript."

categories: notes

date: 2017-11-01
---

{% include /globalSections/toc.html %}

JavaScript(JS) is a lightweight interpreted programming language with first-class functions. While it is most well-known as the scripting language for Web pages, many non-browser environments also use it, such as Node.js, Apache CouchDB, and Adobe Acrobat. JavaScript is a prototype-based, multi-paradigm, dynamic language, supporting object-oriented, imperative, and declarative (e.g. functional programming) styles.

## Variables and Constants

Use `let` and `const` as variables. `let` is the same as what `var` was. `const` is a constant and cannot be changed. Always use `const` unless you will need to change the value then use `let`, never use `var`.

## Arrays

An array is an ordered collection of values. An array just like an object, may end with a comma. This can make it easier to add new values without risking forgetting a comma:

```javascript
var fruits = [
  'Apple',
  'Banana',
];
```

Useful array methods. `pop()`: extracts the last element of the array and returns it, `push()`: appends the element to the end of the array, `shift()`: extracts the first element of the array and returns it, and `unshift()`: adds the element to the beginning of the array.

## Objects

## Functions

## Conditional Statements

## Control Structures

## Learn More Links

- [MDN JavaScript Documents](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
- [devhints.io/es6](https://devhints.io/es6)