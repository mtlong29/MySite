---
layout: article

permalink: /notes/javascript-unit-testing/

title: "JavaScript Unit Testing"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Using behavior driven development to write unit tests for your functions with JavaScript testing framework Mocha.js. Writing unit tests will help you improve your code before you even start writing it. You'll have fewer problems, and better understand the problems you have. These notes also look at behavior driven development with Mocha & Chai. The real power of unit tests is when you use them to help you write code from the start."

categories: notes

date: 2017-10-18
---

{% include /globalSections/toc.html %}

**Using behavior driven development to write unit tests for your functions with JavaScript testing framework Mocha.js.** Writing unit tests will help you improve your code before you even start writing it. You'll have fewer problems, and better understand the problems you have. These notes also look at behavior driven development with **Mocha** & **Chai**. The **real power of unit tests is when you use them to help you write code from the start**.

>Tests describe the expected behavior of our application. Tests are made at the beginning of a project. As you complete the project tests will help tell you the progress you've made.

## Proving Our Code Works

We already test our code all the time with logging things to the console, making variables in the console, calling functions, etc. **This is referred to as manual testing.**

#### Problems with Manual Testing

Manual testing makes it difficult to write effectively, impacts actual code, very hard to read, only a temporary fix. **We will always need this guess and check testing. However, adding automated development will reduce this need.**

#### Benefits of Running Automated Test

- Results are displayed in an informative way.
- Test files are separate from real code.
- The output is easy to read and understand.
- Guarantees code works as expected.
- We can instantly see if anything has broken when making changes.

## Different Types of Testing

>Three different types of testing, 1. unit testing, 2. integration testing, and 3. end-to-end testing.

### Unit Testing

You run unit tests constantly during the development process to ensure that everything is working, every time you make a change. **Unit tests are often run for individual functions.** *Think of unit tests as a drill in basketball. A basketball player is testing individual skills such as dribbling, passing, shooting.*

### Integration Testing

**You use integration tests when you add new code to pre-existing code**, to make sure that not only do all the pieces work individually as expected, but also that they run together correctly without breaking. *Think of integration tests as when a basketball player puts all their skills together.*

### End-to-end Testing

**Run your application from start to finish for all the user stories you can think of.** This ensures that the program is ready to go live, and that the special details of deployment do not mess up the code you carefully tested on your local machine with unit tests and integration tests. You conduct end-to-end tests occasionally, maybe only a few times during a product's life-cycle, as they are very time consuming and expensive. *Think of end-to-end testing as a basketball player being part of a team and putting everything together.* End-to-end testing is very time consuming and not done frequently.

## Behavior Driven Development

>Behavior Driven Development (BDD) is an approach to building software. In BDD, instead of writing code and then seeing if it works, you write tests first and code second. This means you can use tests as an outline for the application code you actually want to write.

BDD is like creating a plan before you write your program. Write tests first and code second.

#### Red > Green > Refactor

**Red > Green > Refactor is the coding sequence where you write your tests before there is even any code.** At this point all of your **tests will fail and they will be red**. As you begin adding your code your only objective is to **make them pass which will make them green**. Once all of your **tests are passing it is time to refactor your code**. Repeat the above cycle until you're ready to move on.

## Using Chai

[Chai](http://chaijs.com/) is an expectation library that includes special functions that throw an error when an expectation is not met. When combined with `mocha.js` the output will give a readable error if there are any errors. [Install Chai](http://chaijs.com/guide/installation/), a testing tool which uses the red-green-refactor using npm.

You then create a new JavaScript file. In this example it is called `textUtilities.js`. First you have to require `chai`.

```javascript
var expect = require('chai').expect;
```

Chai chains multiple methods together that often make a statement sound like english. Such as "expect true to be true".

```javascript
var expect = require('chai').expect;

expect(true).to.be.true;
```

A real example is seen below. It can also be read as english like "expect titleCase('the great mouse detective') to be a string". Where the `titleCase()` function returns a title of a movie that is in title case (first letter capitalized). 

Notice the function that makes the tests pass. **This is an important time to note that you can make tests pass sometimes that don't actually accomplish what you want.**

```javascript
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
```

At this point the `titleCase()` function works for simple titles. However, it still doesn't work for titles with odd capitalization or characters. Also, it doesn't work for unimportant characters too.

#### Quiz:

---

**Question**: The most efficient way to import Chai's expect method into a file is var expect = ____;.

**Answer**: require('chai').expect

**Question**: Which of the following is NOT an advantage of writing unit tests?

**Answer**: Unit tests fully replace the need for manually testing and debugging our code.

**Question**: What specifically does the red > green > refactor cycle mean?

**Answer**: Write a failing test, make the test pass, make the passing code better

**Question**: What is BDD?

**Answer**: Behavior Driven Development

**Question**: Which type of testing focuses on individual, specific pieces of functionality?

**Answer**: Unit testing

**Question**: How much of our code should we test?

**Answer**: We should at least test any code our application absolutely needs to function.

---

## Behavior Driven Development with Mocha & Chai

>The real power of unit tests is when you use them to help you write code from the start.

Once mocha is installed using npm you can run it in the terminal using `mocha <your test file>`.

#### General Structure of Test Files

Mocha expects us to organize our files in order to run properly. You need to run `npm init`. Once you do this you will see a scripts field already in your `package.json` file: `"test": "mocha"`. It is important that the directory is named "test". It is important to keep all tests in this (same) directory

- Easy to import code from other files
- Easy to organize our tests
- Easy to find a test file after seeing its output in the console

You can change the `package.json` file if you forget to install mocha before `npm init`. You can now run `npm test` to run all tests.

#### Quiz:

---

**Question**: What is Mocha?

**Answer**: A framework used for writing and running automated test suites.

**Question**: Which directory should contain our test files to make running them easiest?

**Answer**: /test

**Question**: What's an example of something Mocha does for developers?

**Answer**: Makes it possible to run all of our test suites with one command.

---

## Test Suites and Test Specs (describe and it)

A test suite is a block of unit tests that are all closely related; they test the same function or similar parts of our code base.

We introduce a test suite in mocha using `describe()`. Each individual unit test is sometimes called a "spec". Mocha makes it natural to write specs by containing them in a function called `it()`. To use Chai's `expect` method, import Chai at the top of your file: `var expect = require('chai').expect`.

```javascript
 var expect = require('chai').expect; 
// Test suite
describe('Mocha', function() {
  // Test Spec (unit test)
  it('should run our tests using npm', function() {
    expect(true).to.be.ok;
  });
});
```

#### Quiz:

---

**Question**: What is a sanity check? 

**Answer**: A trivial function or test that proves we set things up correctly.

**Question**: Which Mocha function groups similar expectations together, representing a single unit test?

**Answer**: `it`

**Question**: Which Mocha function groups test spects together? 

**Answer**: describe

**Question**: Which of the following expectations would produce the test output `AssertionError: expected false to be truthy`?

**Answer**: `expect(false).to.be.ok`

---

## Chai's Methods

See [more Chai Methods](http://chaijs.com/api/bdd/) that can be used for better testing.

#### Example Test Suite

The following example is tests for a Battleship game engine. The code for the game will need:

- Current player and winner
- Number of ships
- Position of ships
- Status as active or sunk

```javascript
var expect = require('chai').expect;

describe('checkForShip', function() {
	var checkForShip = require('../game_logic/ship_methods').checkForShip;
	var player;

	before(function() {
		player = {ships: [{locations: [[0, 0], [0, 1]]}, {locations: [[1, 0], [1, 1]]}, {locations: [[2, 0], [2, 1], [2, 2], [2, 3]]}]};
	});

	it('should correctly report no ship at a given players coordinate', function() {
		expect(checkForShip(player, [9, 9])).to.be.false;
	});

	it('should correctly report a ship located at the given coordinates', function() {
		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
	});

	it('should handle ships located at more than one coordinate', function() {
		expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [9, 9])).to.be.false;
	});

	it('should handle checking multiple ships', function() {
		expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);
		expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);
		expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);
		expect(checkForShip(player, [9, 9])).to.be.false;
	});
});

describe('damageShip', function() {
	var damageShip = require('../game_logic/ship_methods').damageShip;

	it('should register damage on a given ship at a given location', function() {
		var ship = {locations: [[0, 0]], damage: []};
		damageShip(ship, [0, 0]);
		expect(ship.damage).to.not.be.empty;
		expect(ship.damage[0]).to.deep.equal([0, 0]);
	});
});

describe('fire', function() {
	var fire = require('../game_logic/ship_methods').fire;
	var player;
	
	beforeEach(function() {
		player = {ships: [{locations: [[0, 0]], damage: []}]};
	});

	after(function() {
		console.log('entire test suite completed');
	});

	afterEach(function() {
		console.log('one unit test completed');
	});

	it('should record damage on the given players ship at a given coordinate', function() {
		fire(player, [0, 0]);
		expect(player.ships[0].damage[0]).to.deep.equal([0, 0]);
	});

	it('should NOT record damage if there is no ship at my coordinates', function() {
		fire(player, [9, 9]);
		expect(player.ships[0].damage).to.be.empty;
	});
});
```