---
layout: article

permalink: /notes/template-literals/

title: "Introducing Template Literals"

subtitle: "Treehouse - Beginner JavaScript"

excerpt: "Template literals offer a lot of convenience when creating strings in JavaScript. These notes document some of the main features."

categories: notes

date: 2017-08-31
---

{% include /globalSections/toc.html %}

## Template Literals

Template literals can be written just like other strings except instead of single quotes or double quotes use back tick character. This character is in the upper left hand corner of a QWERTY keyboard.

The following three strings are the same.

{% highlight javascript linenos %}
const singleQuotes = '<p>Single Quote String</p>';
const doubleQUotes = "<p>Double Quote String</p>";
const templateLiteral = `<p>Template Literal String</p>`;
{% endhighlight %}

A use of a template literal can be seen in the following example:

{% highlight javascript linenos %}
const fruitList = 
  "<ul>" +
    "<li>Kiwi</li>" +
    "<li>Lime</li>" +
    "<li>Pineapple</li>" +
  "</ul>";
document.querySelector('.fruits').innerHTML = fruitList;
const vegList = 
  `<ul>
    <li>Potato</li>
    <li>Onion</li>
    <li>Broccoli</li>
  </ul>`;
document.querySelector('.vegetables').innerHTML = vegList;
{% endhighlight %}

As you can see this is much easier to read. It looks basically like pure HTML.

## Interpolation

Template literals get their name from their ability to evaulate expressions. Think of a form letter template with blanks to hold names or numbers that can be filled in later: "Dear ______, Thank you for your business on ______. Sincerely, Management". Similarly, values can be filled or interpolated, into template literals, to be evaluated when the program runs. The following example shows how this works.

### Without Interpolation

{% highlight javascript linenos %}
function like(thing) {
  return 'I like ' + thing;
}
function love(thing) {
  return 'I love ' + thing;
}
const sentence = '<p>' + like('apples') + ', but ' + love('oranges') + '.</p>';
document.querySelector('.interpolation').innerHTML = sentence;
{% endhighlight %}

### With Interpolation

{% highlight javascript linenos %}
function like(thing) {
  return `I like ${thing}`;
}
function love(thing) {
  return `I love ${thing}`;
}
const sentence = `<p> ${like('apples')}, but ${love('oranges')}.</p>`;
document.querySelector('.interpolation').innerHTML = sentence;
{% endhighlight %}

### With Interpolation With Arrow Function

{% highlight javascript linenos %}
const like = thing => `I like ${thing}`;
const love = thing => `I love ${thing}`;
const sentence = `<p> ${like('apples')}, but ${love('oranges')}.</p>`;
document.querySelector('.interpolation').innerHTML = sentence;
{% endhighlight %}