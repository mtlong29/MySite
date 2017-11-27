---
layout: article

permalink: /notes/javascript-array-iteration-methods/

title: "JavaScript Array Iteration Methods"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on how to access and transform data in arrays with JavaScript's array iteration methods. The main methods looked at in these notes are forEach(), filter(), map(), and reduce()."

categories: notes

modified: 2017-11-24
---

{% include /globalSections/toc.html %}

Notes on how to access and transform data in arrays with JavaScript's array iteration methods. The main methods looked at in these notes are forEach(), filter(), map(), and reduce().

#### Quiz

Question: What is an integer that refers to the position of an array element?

Answer: index

Question: What word refers to the act of reading an array's elements one by one?

Answer: iteration

Question: To access an array element, what do you need to place around its index?

Answer: square brackets

Question: Arrays hold elements in a specific order.

Answer: True

Question: What kind of data can you store in an array?

Answer: numbers, strings, date objects, booleans, arrays

## for loop vs forEach()

The `forEach()` method is used to iterate over an array.

{% highlight javascript linenos %}
const fruits = ['apple', 'pear', 'cherry'];

for (let i = 0; i < fruits.length; i++) {
  console.log(i);
}
// apple
// pear
// cherry

fruits.forEach(fruit => {
  console.log(fruit);
});
// apple
// pear
// cherry

fruits.forEach(fruit => console.log(fruit));
// apple
// pear
// cherry
{% endhighlight %}

The good of using the `forEach()` method: easier to read and understand. Bugs are easier to avoid: infinite loops are impossible, avoids incrementing mistakes, wrong condition.

The bad of using the `forEach()` method: can't break out of loop early. If you need to exit an array before the end you need to use a `for` loop or a `while` loop.

#### Example One

{% highlight javascript linenos %}
const fruits = ['apple', 'pear', 'cherry'];
let capitalizedFruits = [];

fruits.forEach(fruit => {
  let capitalizedFruit = fruit.toUpperCase();
  capitalizedFruits.push(capitalizedFruit)
});

console.log(capitalizedFruits);
// ['APPLE', 'PEAR', 'CHERRY']
{% endhighlight %}

#### Example Two

{% highlight javascript linenos %}
const prices = [6.75, 3.10, 4.00, 8.12];
let total = 0;

prices.forEach(price => {
  total += price;
});

console.log(total)
// 21.97
{% endhighlight %}

#### Example Three

{% highlight javascript linenos %}
// log only names starting with 's'
const names = ['Selma', 'Ted', 'Mike', 'Sam', 'Sharon', 'Marvin']; 
let sNames = [];

names.forEach(name => {
  if (name.split('')[0].toLowerCase() == 's') {
    sNames.push(name);
  }
});

console.log(sNames);
// ['Selma', 'Sam', 'Sharon']

// could also be solved using 'charAt(0)' among other..
{% endhighlight %}

#### Example Four

{% highlight javascript linenos %}
const numbers = [1,2,3,4,5,6,7,8,9,10];
let times10 = [];

numbers.forEach(number => {
  times10.push(number*10);
});

// [10, 20, 30, 40, 50, 60, 70, 80, 90, 100]
{% endhighlight %}

### forEach 'index' and 'array' Parameters

Note that there are other parameters the `forEach()` method can take.

{% highlight javascript linenos %}
arr.forEach(function callback(currentValue, index, array) {
    //your iterator
}[, thisArg]);
{% endhighlight %}

The `currentValue` is the value of the current element being processed in the array. The `index` is the index of the current element being processed in the array. And the `array` is the array that `forEach()` is being applied to.

These aren't used often but it's good to know they exist.

Learn more at the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach">MDN Page for forEach()</a>.

#### Example Using Index

{% highlight javascript linenos %}
// log only names starting with 's'
const names = ['Selma', 'Ted', 'Mike', 'Sam', 'Sharon', 'Marvin']; 
let sNames = [];

names.forEach((name, index) => console.log(`${index + 1}) ${name}`));
// 1) Selma
// 2) Ted
// 3) Mike
// 4) Sam
// 5) Sharon    
// 6) Marvin
{% endhighlight %}

## Remove Array Items with filter()

The filter method can be used to remove elements from an array.

