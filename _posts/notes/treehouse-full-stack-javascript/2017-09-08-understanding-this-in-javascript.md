---
layout: article

permalink: /notes/understanding-this-in-javascript/

title: "Understanding 'this' in JavaScript"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "JavaScript has an extremely powerful keyword, this. this can be used to access data contextually, allowing your functions and methods to access the data that they need based on a specific context.."

categories: notes

date: 2017-09-08
---

{% include /globalSections/toc.html %}

JavaScript has a special keyword to give access to a specific context. The `this` keyword can be used to access values, methods, and other objects on a context specific basis. Meaning, this changes based on where it is used.

That is what makes `this` so powerful and it's also what makes it such a huge headache to understand.

## Debugging Strategies

The `this` keyword can be used as a debugging strategy as well. Being able to play with `this` in different contexts can be super helpful. Plus, these debugging strategies will make your debugging workflow go much faster.

The JavaScript intrepreter assigns a value to `this` based on where it appears. There are four main ways that `this` takes a value.

<ol>
  <li>In normal function calls.</li>
  <li>Within methods on objects.</li>
  <li>Within an object that has been constructed.</li>
  <li>A function invoked with .call, .apply, or bind.</li>
</ol>

## this In Normal Function Calls

In the below examlpe, a function named `helloworld` is called. The script logged two things, the "Hello world" string, and `this`, which is the window object in the context of a normal function.

{% highlight javascript linenos %}
function helloWorld() {
  console.log("Hello world!");
  console.log(this);
};
helloWorld();
{% endhighlight %}

When you call a function in this way, this is going to be the gglobal context. In a browers, it's the window object. But if we were in a Node app. things would be quite a bit different.

## this Within Methods on Objects

The second way that you can use `this` is within a method on an object. It's also one of the most powerful ways that `this` can be used.

See the following examples:

{% highlight javascript linenos %}
var Portland = {
  bridges: 12,
  airport: 1,
  soccerTeams: 1,
  logNumberOfBridges: function() {
    console.log("There are " + this.bridges + " bridges in Portland!")
  }
}
Portland.logNumberOfBridges();
// There are 12 bridges in Portland!
{% endhighlight %}

{% highlight javascript linenos %}
var Portland = {
  bridges: 12,
  airport: 1,
  soccerTeams: 1,
  logNumberOfBridges: function() {
    console.log("There are " + this.bridges + " bridges in Portland!")
  },
  logTeams: function() {
    console.log(this.soccerTeams);
  }
}
Portland.logTeams();
// 1
{% endhighlight %}

{% highlight javascript linenos %}
var Portland = {
  bridges: 12,
  airport: 1,
  soccerTeams: 1,
  logNumberOfBridges: function() {
    console.log("There are " + this.bridges + " bridges in Portland!")
  }
}
function logTeams () {
  console.log(this.soccerTeams);
}
Portland.foo = logTeams;
Portland.foo();
logTeams();
// 1
// undefined
{% endhighlight %}

In the last example you get `undefined` because `logTeams()` does not contain `soccerTeams`. However, `portland.foo()` does contain `soccerTeams`. You can see/debug this issue by logging `this` to the console instead od `this.soccerTeams`.


## this Within an object that has been constructed

One of the most powerful ways to use `this` is on a constructor function. The following constructor function takes two parameters a `name` and a `state` parameter.

{% highlight javascript linenos %}
var City = function(name, state) {
  this.name = name || 'Portland';
  this.state = state || 'Oregon';
  this.printMyCityAndState = function() {
    console.log("My city is " + this.name + ", and my state is " + this.state);
  };
};
portland = new City();
seattle = new City('Seattle', 'Washington');
salem = new City('Salem');
vancouver = new City('Vancouver', 'Washington');
portland.printMyCityAndState();
seattle.printMyCityAndState();
salem.printMyCityAndState();
vancouver.printMyCityAndState();
{% endhighlight %}

See that `this.name = name || 'Portland';` line means that if the a `name` parameter is passed then it will use that, but if not then it will default to `Portland`.

The `new` keyword is also a special keyword in JavaScript, and all it says is that, I'm gonna create a new instance using `this` constructor function.

My city is, the value of `this.name`. And my state is, the value plus the value of `this.state`.

One of the reasonss that the constructor function is so valuable is because you can basically repeat this hundreds of times and the `this` keyword will always respond to the object that's been created, allowing you to create applications with highlight replicable code.