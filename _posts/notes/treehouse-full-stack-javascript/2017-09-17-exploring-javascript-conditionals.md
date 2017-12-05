---
layout: article

permalink: /notes/exploring-javascript-conditionals/

title: "Exploring JavaScript Conditionals"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "These are notes regarding alternatives to if..then statements for controlling program flow. These are typically not uesd often, but they are important to be exposed to."

categories: notes

date: 2017-09-17
---

{% include /globalSections/toc.html %}

These are notes regarding alternatives to if..then statements for controlling program flow. These are typically not uesd often, but they are important to be exposed to.

## Typical if..else Statement

{% highlight javascript linenos %}
const day = new Date().getDay();

if(day === 0) {
	console.log('Sunday');
} else if (day === 1) {
	console.log('Monday');
} else if (day === 2) {
	console.log('Tuesday');
} else if (day === 3) {
	console.log('Wednesday');
} else if (day === 4) {
	console.log('Thursday');
} else if (day === 5) {
	console.log('Friday');
} else if (day === 6) {
	console.log('Saturday');
} else {
	console.log('Invalid Day');
}
// Sunday
{% endhighlight %}

## Switch

The quivalent of the above typical `if else` statement written as a `switch` statement can be seen below:

{% highlight javascript linenos %}
switch(day) {
  case 0:
    console.log('Sunday');
    break;
  case 1:
    console.log('Monday');
    break;
  case 2:
    console.log('Tuesday');
    break;
  case 3:
    console.log('Wednesday');
    break;
  case 4:
    console.log('Thursday');
    break;
  case 5:
    console.log('Friday');
    break;
  case 6:
    console.log('Saturday');
    break;
  default:
    console.log('Invalid Day');
    break;
}
// Sunday
{% endhighlight %}

Note that most people consider a `switch` statement to not be best practice. This is mainly due to the necessity of the `break;` line. Without it `Sunday` and `Monday` would have been logged to the console. The `defaul` case is like the `else` condition from a typical `else if` statement.

## Ternary Operator

A ternary operator is a compact, two-way branching conditional expression. Many developers use this. However, it is so compact that it can be difficult to read. 

It's called ternary because it involves three expressions. `<boolean>`, `<expression if true>`, and `<expression if false>`.

The ternary operator uses two characters `?`, and `:`. See the following examples:

### Typical if..else Statement

{% highlight javascript linenos %}
const isTrue = true;

if(isTrue) {
	console.log('yes');
} else {
	console.log('no');
}
// yes
{% endhighlight %}

### Ternary Statement

{% highlight javascript linenos %}
const isTrue = true;

isTrue ? console.log('yes') : console.log('no');
// yes
{% endhighlight %}

### Ternary As An Expression

{% highlight javascript linenos %}
const isTrue = true;

const yesOrNo = isTrue ? 'yes' : 'no';

console.log(yesOrNo);
// yes
{% endhighlight %}

Technically you could use the ternary as a large branching expression. However, this gets messy fast. Therefore, it is often considered a bad practice.

The only times you should use a ternary is for very simple conditioning.

## Short Circuit Evaluation

Logical operators can be used to control program flow directly. This can help stop code from executing code as fast as possible.

{% highlight javascript linenos %}
console.log(3 === 3 && 'a' === 'a');
// true
{% endhighlight %}

{% highlight javascript linenos %}
console.log(3 === 3 && 'cow');
// cow
{% endhighlight %}

{% highlight javascript linenos %}
console.log(3 === 3 && 'cow' && 'chicken');
// chicken
{% endhighlight %}

{% highlight javascript linenos %}
console.log(3 === 3 && false && 'chicken');
// false
{% endhighlight %}

{% highlight javascript linenos %}
3 === 3 && false && console.log('chicken');
//
{% endhighlight %}

{% highlight javascript linenos %}
3 === 3 && 'cow' && console.log('chicken');
// chicken
{% endhighlight %}

{% highlight javascript linenos %}
console.log(3 === 3 || 'cow' || 'chicken');
// true
{% endhighlight %}

{% highlight javascript linenos %}
console.log(3 === 4 || 'cow' || 'chicken');
// cow
{% endhighlight %}

{% highlight javascript linenos %}
console.log(3 === 4 || false || 0);
// 0
{% endhighlight %}

You wouldn't want to replicate a complex branching operation using short circuiting. However, there are a few ways it can be useful:

{% highlight javascript linenos %}
function isAdult(age) {
  if(age && age >= 18) {
    return true;
  } else {
    return false;
  }
}

console.log(isAdult(16));
// false
{% endhighlight %}

{% highlight javascript linenos %}
function isAdult(age) {
  return age && age >= 18
}

console.log(isAdult(19));
// true
{% endhighlight %}

A common way you'll see short circuiting done is to assign a default value.

{% highlight javascript linenos %}
const countToFive = start => {
  for (let i = start; i <= 5; i++) {
    console.log(2);
  }
}

countToFive();
// 2
// 3
// 4
// 5
{% endhighlight %}

{% highlight javascript linenos %}
const countToFive = start => {
  start = start || 1;
  for (let i = start; i <= 5; i++) {
    console.log(i);
  }
}

countToFive();
// 1
// 2
// 3
// 4
// 5
{% endhighlight %}

However, if you passed in `0` it would be falsy. Therefore, using the `||` operator makes it impossible to start from `0`. It will default to `1`.

It can't really be used when a "valid" value can be considered falsy. 

You'll probably see the `||` operator being used in older code. ECMAScript2015 introduced a default parameter to functions. This made short circuiting less useful. The new syntax also doesnt suffer from the issue of evaluating zero as a false value.

To assign a default value  you can juse assign the value to the parameter in the function declaration.

{% highlight javascript linenos %}
const countToFive = (start = 0) => {
  for (let i = start; i <= 5; i++) {
    console.log(i);
  }
}

countToFive(0);
// 0
// 1
// 2
// 3
// 4
// 5
{% endhighlight %}

Another example:

{% highlight javascript linenos %}
const greet = name => {
  name && console.log(`Hi ${name}!`)
}

greet();
//
{% endhighlight %}

{% highlight javascript linenos %}
const greet = name => {
  name && console.log(`Hi ${name}!`)
}

greet('Billy');
// Hi billy!
{% endhighlight %}

See that nothing is returned when a name isn't provided.