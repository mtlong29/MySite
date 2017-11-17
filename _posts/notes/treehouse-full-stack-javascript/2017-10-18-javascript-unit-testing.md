---
layout: article

permalink: /notes/javascript-unit-testing/

title: "JavaScript Unit Testing"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Using behavior driven development to write unit tests for your functions with JavaScript testing framework Mocha.js. Writing unit tests will help you improve your code before you even start writing it. You'll have fewer problems,and better understand the problems you have."

categories: notes

modified: 2017-10-18
---

{% include /globalSections/toc.html %}

Tests describe the expected behavior of our application. Tests are made at the beginning of a project. As you complete the project tests will help tell you the progress you've made.

## Proving Out Code Works

We already test our code all the time with logging things to the console, making varibles in the console, calling functions etc. This is referred to as manual testing.

### Problems with Manual Testing

Manual testing makes it difficult to write effectively, impacts actual code, very hard to read, only a temporary fix.

We will always need guess and check testing. However, adding automated development will reduce this need.

## Running Automated Test

<ul>
  <li>Results are displayed in an informative way.</li>
  <li>Test files are separate from real code.</li>
  <li>The output is easy to read and understand.</li>
  <li>Guarantees code works as expected.</li>
  <li>We can instantly see if anything has broken when making changes.</li>
</ul>

## Different Types of Testing

### Unit Testing

You run unit tests constantly during the development process to ensure that everything is working, every time you make a change.

Unit tests are often run for individual functions. Think of unit tests as a drill in basketball. A basketball player is testing individual skills such as dribbling, passing, shooting.

### Integration Testing

You use integration tests when you add new code to pre-existing code, to make sure that not only do all the pieces work individually as expected, but also that they run together correctly without breaking.

Think of integration tests as when a basketball player puts all their skills together.

### End-to-end Testing

Run your application from start to finish for all the user stories you can think of. This ensures that the program is ready to go live, and that the special details of deployment do not mess up the code you carefully tested on your local machine with unit tests and integration tests. You conduct end-to-end tests occasionally, maybe only a few times during a product's life-cycle, as they are very time consuming and expensive.

Think of end-to-end testing as a basketball player being part of a team and putting everything together.

End-to-end testing is very time consuming and not done frequently.

## Behavior Driven Development

Behavior Driven Development (BDD) is an approach to building software. In BDD, instead of writing code and then seeing if it works, you write tests first and code second. This means you can use tests as an outline for the application code you actually want to write.

BDD is like creating a plan before you write your program. Write tests first and code second.

### Red > Green > Refactor

Red > Green > Refactor is the coding sequence where you write your tests before there is even any code. At this point all of your tests will fail and they will be red. As you begin adding your code your only objective is to make them pass which will make them green. Once all of your tests are passing it is time to refactor your code.

Repeat the above cycle until you're ready to move on.

### Using Chai

<a href="http://chaijs.com/">Chai</a> is an expectation library that includes special functions that throw an error when an expectation is not met. When combined with `mocha.js` the output will give a readable error if there are any errors.

<a href="http://chaijs.com/guide/installation/">Install</a> Chai, a testing tool which uses the red-green-refactor using npm.

You then create a new JavaScript file. In this example it is called `textUtilities.js`.

First you have to require `chai`.

{% highlight javascript linenos %}
var expect = require('chai').expect;
{% endhighlight  %}

Chai chains multiple methods together that often make a statement sound like english. Such as "expect true to be true".

{% highlight javascript linenos %}
var expect = require('chai').expect;

expect(true).to.be.true;
{% endhighlight %}

A real example is seen below. It can also be read as english like "expect titleCase('the great mouse detective') to be a string". Where the `titleCase()` function returns a title of a movie that is in title case (first letter capitalized). 

Notice the function that makes the tests pass. This is an important time to note that you can make tests pass sometimes that don't actually accomplish what you want:

{% highlight javascript linenos %}
var expect = require('chai').expect;

function titleCase(title){
  var words = title.split(' ');
  var titleCasedWords = words.map(function(word) {
    return word[0].toUpperCase() + word.substring(1);
  });
  return titleCasedWords.join(' ');
};

expect(titleCase('the great mouse detective')).to.be.a('string');
expect(titleCase('a')).to.equal('A');
expect(titleCase('vertigo')).to.equal('Vertigo');
expect(titleCase('the great mouse detective')).to.equal('The Great Mouse Detective');
{% endhighlight %}

At this point the `titleCase()` function works for simple titles. However, it still doesn't work for titles with odd capitalization or characters. Also, it doesn't work for unimportant characters too.

#### Quiz

Question: The most efficient way to import Chai's expect method into a file is var expect = ____;.

Answer: require('chai').expect

Question: Which of the following is NOT an advantage of writing unit tests?

Answer: Unit tests fully replace the need for manually testing and debugging our code.

Question: What specifically does the red > green > refactor cycle mean?

Answer: Write a failing test, make the test pass, make the passing code better

Question: What is BDD?

Answer: Behavior Driven Development

Question: Which type of testing focuses on individual, specific pieces of functionality?

Answer: Unit testing

Question: How much of our code should we test?

Answer: We should at least test any code our application absolutely needs to function.

