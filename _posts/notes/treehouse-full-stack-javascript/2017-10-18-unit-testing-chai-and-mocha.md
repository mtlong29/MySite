---
layout: article

permalink: /notes/unit-testing-with-chai-and-mocha/

title: "Unit Testing with Chai and Mocha"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Behavior Driven Development with Mocha & Chai. The real power of unit tests is when you use them to help you write code from the start."

categories: notes

modified: 2017-10-18
---

{% include /globalSections/toc.html %}

Behavior Driven Development with Mocha & Chai. The real power of unit tests is when you use them to help you write code from the start.

Once mocha is installed using npm you can run it in the terminal using `mocha <your test file>`.

## General Structure of Test Files

Mocha expects us to organize our files in order to run properly. You need to run `npm init`. Once you do this you will see a scripts field already in your `package.json` file: `"test": "mocha"`.

It is important that the directory is named "test". It is important to keep all tests in this (same) directory

<ul>
    <li>Easy to import code from other files</li>
    <li>Easy to organize our tests</li>
    <li>Easy to find a test file after seeing its output in the console</li>
</ul>

You can change the `package.json` file if you forget to install mocha before `npm init`. You can now run `npm test` to run all tests.

#### Quiz

Question: What is Mocha?

Answer: A framework used for writing and running automated test suites.

Question: Which directory should contain our test files to make running them easiest?

Answer: /test

Question: What's an example of something Mocha does for developers?

Answer: Makes it possible to run all of our test suites with one command.

## Test Suites and Test Specs (describe and it)

A test suite is a block of unit tests that are all closely related; they test the same function or somilar parts of our code base.

 We introduce a test suite in mocha using `describe()`. Each individual unit test is sometimes called a "spec". Mocha makes it natural to write specs by containing them in a function called `it()`. To use Chai's `expect` method, import Chai at the top of your file: `var expect = require('chai').expect`.

 {% highlight javascript linenos %}
 var expect = require('chai').expect; 
// Test suite
describe('Mocha', function() {
  // Test Spec (unit test)
  it('should run our tests using npm', function() {
    expect(true).to.be.ok;
  });
});
 {% endhighlight %}

 #### QUiz

 Question: What is a sanity check? 

 Answer: A trivial function or test that proves we set things up correctly.

 Question: Which Mocha function groups similar expectations together, representing a single unit test?

 Answer: `it`

 Question: Which Mocha function groups test spects together? 

 Answer: describe

 Question: Which of the following expectations would produce the test output `AssertionError: expected false to be truthy`?

 Answer: `expect(false).to.be.ok`

## Chai's Methods

See <a href="http://chaijs.com/api/bdd/">more Chai Methods</a> that can be used for better testing.

## Example Test Suite

The following example is tests for a Battleship game engine. The code for the game will need:

<ul>
    <li>Current player and winner</li>
    <li>Number of ships</li>
    <li>Position of ships</li>
    <li>Status as active or sunk</li>
</ul>

{% highlight javascript linenos %}
var expect = require('chai').expect;

describe('checkForShip', function () {
	var checkForShip = require('../game_logic/ship_methods').checkForShip;
	var player;
	
	before(function () {
		player = {
			ships: [
				{
					locations: [[0, 0], [0, 1]]
				},
				{
					locations: [[1, 0], [1, 1]]
				},
				{
					locations: [[2, 0], [2, 1], [2, 2], [2, 3]]
				}
			]
		};		
	});
	
	it('should correctly report no ship at a given players coordinate', function () {
		expect(checkForShip(player, [9, 9])).to.be.false;
	});
	
	it('should correctly report a ship located at the given coordinates', function () {
		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);
	});
	
	it('should handle ships located at more than one coordinate', function () {
		expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);			
		expect(checkForShip(player, [9, 9])).to.be.false;
	});
	
	it('should handle checking multiple ships', function () {
		expect(checkForShip(player, [0, 1])).to.deep.equal(player.ships[0]);
		expect(checkForShip(player, [0, 0])).to.deep.equal(player.ships[0]);	
		expect(checkForShip(player, [1, 0])).to.deep.equal(player.ships[1]);	
		expect(checkForShip(player, [1, 1])).to.deep.equal(player.ships[1]);
		expect(checkForShip(player, [2, 3])).to.deep.equal(player.ships[2]);	
		expect(checkForShip(player, [9, 9])).to.be.false;
	});
});

describe('damageShip', function () {
	var damageShip = require('../game_logic/ship_methods').damageShip;
	
	it('should register damage on a given ship at a given location', function () {
		var ship = {
			locations: [[0, 0]],
			damage: []
		};
		
		damageShip(ship, [0, 0]);
		
		expect(ship.damage).to.not.be.empty;
		expect(ship.damage[0]).to.deep.equal([0, 0]);
	});
});

describe('fire', function () {
	var fire = require('../game_logic/ship_methods').fire;
	var player;
	
	beforeEach(function () {
		player = {
			ships: [
				{
					locations: [[0, 0]],
					damage: []
				}
			]
		};	
	});
	
	after(function () {
		console.log('entire test suite completed');
	});
	
	afterEach(function () {
		console.log('one unit test completed');
	});
	
	it('should record damage on the given players ship at a given coordinate', function () {
		fire(player, [0, 0]);
		expect(player.ships[0].damage[0]).to.deep.equal([0, 0]);
	});
	
	it('should NOT record damage if there is no ship at my coordinates', function () {
		fire(player, [9, 9]);
		expect(player.ships[0].damage).to.be.empty;
	});
});
{% endhighlight %}