---
layout: article

permalink: /notes/javascript-array-iteration-using-foreach/

title: "JavaScript Array Iteration Using forEach"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on how to iterate over array in JavaScript using forEach()."

categories: notes

date: 2017-11-24
---

{% include /globalSections/toc.html %}

Notes on how to iterate over array in JavaScript using forEach().

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

#### Example Five

{% highlight javascript linenos %}
const numbers = [1, 2, 3, 4, 5];
let total = 0;

numbers.forEach(number => total += number);
{% endhighlight %}

#### Example Six

{% highlight javascript linenos %}
// method one:
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dayAbbreviations = [];

days.forEach(day => {
  dayAbbreviations.push(day.charAt(0) + day.charAt(1));
});

// method two:
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
let dayAbbreviations = [];

days.forEach(day => dayAbbreviations.push(day.slice(0, 2)));
{% endhighlight %}

#### Example Seven

{% highlight javascript linenos %}
const stringPrices = ['5.47', '3.12', '8.00', '5.63', '10.70'];
let priceTotal = 0;

stringPrices.forEach(price => priceTotal += parseFloat(price));
{% endhighlight %}

#### Example Eight

{% highlight javascript linenos %}
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
let noel = [];

// noel should be an array containing every letter of the alphabet except "L"

// method one:
alphabet.forEach(letter => {
  if (letter != "L") {
    noel.push(letter);
  }
});

// method two:
alphabet.forEach(letter => letter != "L" ? noel.push(letter) : null);
{% endhighlight %}

#### Example Nine

{% highlight javascript linenos %}
const percentages = [34, 67, 12, 39, 90, 82, 22, 24, 99];
let upperRange = [];

// store all percentages that are greater than 50% in upperRange.

// method one:
percentages.forEach(percentage => {
  if (percentage > 50) {
    upperRange.push(percentage);
  }
});

// method two:
percentages.forEach(percentage => (percentage > 50) ? upperRange.push(percentage): null);
{% endhighlight %}

#### Example Ten

{% highlight javascript linenos %}
const colors = ['#87E2D0', '#559F4D', '#FFE0F4', '#7E7E7E', '#FF2D2D', '#F7FFEC'];
let filteredColors = [];

// add colors with hex values that start with "F" to filteredColors

// method one:
colors.forEach(color => {  
  if (color.charAt(1) === "F") {
    filteredColors.push(color);
  }
});

// method two:
colors.forEach(color => (color.charAt(1) === "F") ? filteredColors.push(color) : null);

// method three:
colors.forEach(color => (color[1] === "F") ? filteredColors.push(color) : null);
{% endhighlight %}

#### Example Eleven

{% highlight javascript linenos %}
const months = ['january', 'february', 'march', 'april', 'may'];
let capitalizedMonths = [];

// return array of capitalized months
months.forEach(month => capitalizedMonths.push(month.toUpperCase()));
{% endhighlight%}

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

