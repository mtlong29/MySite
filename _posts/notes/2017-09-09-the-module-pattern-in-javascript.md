---
layout: article

permalink: /notes/the-module-pattern-in-javascript/

title: "The Module Pattern in JavaScript"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Module Patterns are how some of those huge JavaScript projects out there are getting built. Applications become much easier to build and maintain with these patterns."

categories: notes

modified: 2017-09-09
---

{% include /globalSections/toc.html %}

Module Patterns are how some of those huge JavaScript projects out there are getting built. Applications become much easier to build and maintain with these patterns.

## Basic Possible Module Pattern

{% highlight javascript linenos %}
function foo() {
  console.log('foobar');
}
foo();
// foobar
{% endhighlight %}

However, if you're talking about a larger application, there'll be one huge problem. And that's that the `foo` variable, or the foo function is accessible in the global namespace. And this is sometimes what we refer to as cluttering the global namespace. 

The reason this is a problem is because so much is happening in the browser these days.

You might load Angular, Bootstrap, and jQuery into the browser. You might even have a few other JavaScript libraries.

Now, if you have to navigate a bunch of variables that clutter the global namespace, it can be quite a nuisance. In fact, it could be catastriphic if the variables you create share the same names as the variables from another library.

The Most basic module pattern is going to solve this. To do this, I just wrap my code in a self-executing anonymous function. That looks like the following:

{% highlight javascript linenos %}
(function() {
  function foo() {
    console.log('foobar');
  };
  foo();
}());
// foobar
{% endhighlight %}

The reason it is wrapped in parantheses is basically saying treat the whole function as an expression which doesn't require naming or assigning.

When this code has run the global namespace is not cluttered with my variable. And w can see that `foo` is undefined.

## Plus and Exclamation Point Symbol Usage

A cool little trick is to replace the closures with a plus sign `+` or an exclamation point `!` like the following:

{% highlight javascript linenos %}
!function() {
  function foo() {
    console.log('foobar');
  };
  foo();
}();
// foobar
{% endhighlight %}

The reason you might want to do this, is if you're concatenating multiple files together. In the basic module pattern, you'd have to remember to end every module with a semicolon. 

Additionally, if you don't know which file is going to come first, you'd have to do the following. 

{% highlight javascript linenos %}
;(function() {
  function foo() {
    console.log('foobar');
  };
  foo();
}());
// foobar
{% endhighlight %}

It's much more elegant to simply add the exclamation point. There are a few other symbols used, but these are the two most common.

## Import Other Globals

Another thing we can do with our module pattern is import other globals to be used within the module but with the reference, locally within the module.

### Underscore

A very popular JavaScript toolkit is called the underscore. Below brings it in as a parameter.

{% highlight javascript linenos %}
!function(underscore) {
  function foo() {
    console.log('foobar');
  };
  foo();
}(_);
// foobar
{% endhighlight %}

There are a couple benefits to this. The first is that renaming the variable makes it obvious that you are doing something different or special with this variable in your module. For instance, maybe you are going to extend underscore with some new methods. 

Additionally, there's also a slight performance benefit. This is because the variable is now referened in the local scope. This means that when you call the variable, the intrepreter does not have to crawl thru the global scope looking for it.

Below demonstrates how we have access to the new variable, by logging the verson of underscore.

{% highlight javascript linenos %}
!function(underscore){
  underscore.someAwesomeMethod = 'yay!';
  console.log(underscore.VERSION);
}(_);
// 1.6.0
{% endhighlight %}

### Benefits of Importing Variables

One of the other benefits of importing variables is that JavaScript is typically compressed, and minified for use in production. Compressors cannot rename global variables, however, minifiers or compressors are able to rename global variables that have been invoked with the local reference, and that's just like we did with underscore. By importing it, and then using it locally. Also, you don't have to rename the variable itself. That was done just for the purpose of an example.

{% highlight javascript linenos %}
!function(_){
  underscore.someAwesomeMethod = 'yay!';
  console.log(underscore.VERSION);
}(_);
// 1.6.0
{% endhighlight %}

It will still have a local reference. Read more about minification, check <a href="http://alistapart.com/article/javascript-minification-part-II">here</a>.

## Module Export Pattern

If you want to keep your code from cluttering the global namespace and you want to share information with different parts of your applilcation you have the module export pattern.

{% highlight javascript linenos %}
var awesomeNewModule (function(){
  var exports = {};
  exports.helloMars = function() {
    console.log('Hello Mars!');
  };
  return exports;
}());
{% endhighlight %}

This will give you access to the awesomeNewModule and helloMars method in the browser.

The below contains a couple more values and methods.

{% highlight javascript linenos %}
var awesomeNewModule (function(){
  var exports = {
    foo: 5,
    bar: 10
  };
  exports.helloMars = function() {
    console.log('Hello Mars!');
  };
  exports.goodbye = function() {
    console.log('Goodbye Mars!');
  };
  return exports;
}());
{% endhighlight %}

You now have access to the above in the browser. Keep in mind that you don't have these globally.

## loose Augmentation and the Asynchronous Runtime Environment

At first, it is easy enough to split your code into different files and then smash them together in a specific order. However, this quickly becomes unmanageable. Using another pattern called loose augmentation. We can actually take advantage of JavaScript's asynchronous runtime environment. (Don't concern yourself with this.. This might be the first and last time you "hear" about this.. BUT you will definitely "see" it a lot.)

To implement this pattern, see the small piece of logic that has been added.

{% highlight javascript linenos %}
var awesomeNewModule (function(exports){
  var exports = {
    foo: 5,
    bar: 10
  };
  exports.helloMars = function() {
    console.log('Hello Mars!');
  };
  exports.goodbye = function() {
    console.log('Goodbye Mars!');
  };
  return exports;
}(awesomeNewModule || {}));
{% endhighlight %}

Now all the values will get assigned to an empty object or to `awesomeNewModule`. If these already exist whichever file is loaded last is the one that will be used. 

The whole point of modular code is splitting code that doesn't rely or override patterns or methods created from another.

## The Submodule Pattern

{% highlight javascript linenos %}
var awesomeNewModule.sub (function(exports){
  var exports = {
    foo: 5,
    bar: 10
  };
  exports.helloMars = function() {
    console.log('Hello Mars!');
  };
  exports.goodbye = function() {
    console.log('Goodbye Mars!');
  };
  return exports;
}(awesomeNewModule.sub || {}));
{% endhighlight %}

You can see this at work looking at bootstrap, or airbrb's polygot.js for example.