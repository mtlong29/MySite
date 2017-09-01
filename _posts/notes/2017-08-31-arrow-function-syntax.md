---
layout: article

permalink: /notes/arrow-function-syntax/

title: "Introducing Arrow Function Syntax"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "ECMAScript 2015 has been widely adopted by all modern browsers. This means we can use a more concise way to write functions. These notes show how to convert some traditional functions into a more modern syntax."

categories: notes

modified: 2017-08-31
---

{% include /globalSections/toc.html %}

The following are equivalent functions. The arrow function uses an equal sign and a greater than sign. `=>`.

{% highlight javascript linenos %}
//Function Declaration
function divide1(a, b) {
  return a / b; 
}

//Function Expression
const divide2 = function(a, b) {
  return a / b;
}

//Arrow Function Expression
const divide3 = (a, b) => {
  return a / b;
}
{% endhighlight %}

## Arrow Functions

Arrow functions are less verbose than function declarations. But they can get even more concise.

If your arrow function only takes a single argument like in the case of the following example. You don't need parentheses.

{% highlight javascript linenos %}
const square = (x) => {
  return x * x;
}
// Without parantheses
const square = x => {
  return x * x;
}
{% endhighlight %}

You can reduce the arrow syntax further by removing the curly braces when you only have a single line of code in your function. This can really clean up your code to be more concise. See the square example from before revisited below.

{% highlight javascript linenos %}
  const square = x => x*x;
{% endhighlight %}

Don't forget if there are more than one argument for a function you have to include the parentheses. Also, if there are no arguments you must have the empty parantheses, `()`.

One last example:

{% highlight javascript linenos %}
const square = (x) => x * x;
const cube = (x) => square(x) * x;
cube(2);
// 8
{% endhighlight %}