---
layout: article

permalink: /notes/javascript-array-manipulation-methods/

title: "JavaScript Array Manipulation Methods"

subtitle: "Treehouse - Full Stack JavaScript"

excerpt: "Notes on how to manipulate JavaScript arrays. The methods explored are filter(), map(), and reduce()."

categories: notes

date: 2017-12-02
---

{% include /globalSections/toc.html %}

Notes on how to manipulate JavaScript arrays. The methods explored are filter(), map(), and reduce().

## Remove Array Items with filter()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/filter">MDN Page for filter</a>.

The `filter()` method can be used to remove elements from an array. `filter()` doesn't affect the original array. It returns a new array. 

You call `filter()` by passing a callback fucntion inside the method: `['A', 'B', 'C'].filter(() => {});`. Just like the `forEach()` method the first parameter of the callback will be an item from the array: `['A', 'B', 'C'].filter((letter) => {});`. The callback is simply a function that returns `true` or `false`.

If the callback returns `true`, `filter()` will add that item to the new array: `['A', 'B', 'C'].filter((letter) => {return letter !== 'B'}); // ['A', 'C']`. If it returns `false`, the item won't be added. Hence, `'B'` not being added.

First, a technique not using the `filter()` method:

{% highlight javascript linenos %}
const names = ['Selma', 'Ted', 'Mike', 'Sam', 'Sharon', 'Marvin'];

let sNames = [];

names.forEach(name => {
  if(name.charAt(0) === 'S') {
    sNames.push(name);
  }
});

console.log(sNames);
// ['Selma', 'Sam', 'Sharon']
{% endhighlight %}

Second, the same example, but using `filter()`:

{% highlight javascript linenos %}
const names = ['Selma', 'Ted', 'Mike', 'Sam', 'Sharon', 'Marvin'];

const sNames = names.filter(name => {
  if (name.charAt(0) === 'S') {
    return true;
  } else {
    return false;
  }
});

console.log(sNames);
// ['Selma', 'Sam', 'Sharon']
{% endhighlight %}

Which can also be written as the following using ternary operator:

{% highlight javascript linenos %}
const names = ['Selma', 'Ted', 'Mike', 'Sam', 'Sharon', 'Marvin'];

const sNames = names.filter(name => {
  return name.charAt(0) === 'S' ? true : false;
});

console.log(sNames);
// ['Selma', 'Sam', 'Sharon']
{% endhighlight %}

However, any time you're returning `true` or `false` you can simply `return` the condition itself. That's because the condition is returning `true` or `false` so you don't need any extra code.

{% highlight javascript linenos %}
const names = ['Selma', 'Ted', 'Mike', 'Sam', 'Sharon', 'Marvin'];

const sNames = names.filter(name => name.charAt(0) === 'S');

console.log(sNames);
// ['Selma', 'Sam', 'Sharon']
{% endhighlight %}

It is often "best practice" to create a variable that contains the function and then pass that variable into the `filter()` method.

{% highlight javascript linenos %}
const names = ['Selma', 'Ted', 'Mike', 'Sam', 'Sharon', 'Marvin'];

const startsWithS = name => name.charAt(0) === 'S';
const sNames = names.filter(startsWithS);

console.log(sNames);
// ['Selma', 'Sam', 'Sharon']
{% endhighlight %}

#### Example Two:

Return all values except the number `3`:

{% highlight javascript linenos %}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const numbersNotThree = numbers.filter(number => number !== 3);      

console.log(numbersNotThree);
// [1, 2, 4, 5, 6, 7, 8, 9, 10]
{% endhighlight %}

#### Example Three:

Return only the even numbers:

{% highlight javascript linenos %}
const numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];

const evens = numbers.filter(number => number % 2 === 0);      

console.log(evens);
// [2, 4, 6, 8, 10]
{% endhighlight %}

#### Example Four:

Return only years that are in the twentieth century:

{% highlight javascript linenos %}
const years = [1989, 2015, 2000, 1999, 2013, 1973, 2012];

const century20 = years.filter(year => year > 1900 && year <= 2000);

console.log(century20);
// [1989, 2000, 1999, 1973]
{% endhighlight %}

#### Example Five:

Given an array of numbers filter out the duplicates:

{% highlight javascript linenos %}
const numbers = [1, 1, 2, 3, 4, 3, 5, 5, 6, 7, 3, 8, 9, 10];

const unique = numbers.filter((number, index, array) => {
  return index === array.indexOf(number);
});

console.log(unique); 
// [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
{% endhighlight %}

## Transform Array Items with map()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/map">MDN Page for map</a>.

Use the `map()` method to transform elements in an array.

Like `filter()`, `map()` returns a new array leaving the original array unchanged. Unlike `filter()` it returns a new array with the same number or array elements.

Say for example you have an array with words (`animal = ['dog', 'cat', 'horse']`) you want to pluralize (`animals = ['dogs', 'cats', 'horses']`). You could use `map()` to go through an array of temperatures changing them from celsius (`celsius = [0, 37, 100]`) to fahrenheit (`fahrenheit = [32, 98.6, 212]`). Or you could have an array of numbers such as prices (`price = [1.00, 4.25, 7.20]`) and change them to an array of strings and add a dollar sign in front (`newPrice = ['$1.00', '$4.25', '$7.20']`).

To transform an array's items with `map()`, you use a callback function to return the data you want.

{% highlight javascript linenos %}
const strings = ['1','2','3','4','5'];

const numbers = strings.map(string => parseInt(string));

console.log(numbers);
// [1, 2, 3, 4, 5]
{% endhighlight %}

#### Example Two:

Capitalize all the letters of every item in an array:

{% highlight javascript linenos %}
const fruits = ['apple', 'pear', 'cherry'];

const capitalizedFruits = fruits.map(fruit => fruit.toUpperCase());

console.log(capitalizedFruits);
// ['APPLE', 'PEAR', 'CHERRY']
{% endhighlight %}

#### Example Three:

Givin an array of prices as numbers return an array of prices as strings with a dollar sign in front.

{% highlight javascript linenos %}
const prices = [5, 4.23, 6.4, 8.09, 3.20];

const displayPrices = prices.map(price => `$${price.toFixed(2)}`);

console.log(displayPrices);
// [ '$5.00', '$4.23', '$6.40', '$8.09', '$3.20' ]
{% endhighlight %}

#### Example Four:

Given an array of `daysOfWeek` containing the full name for each day return a new array containing the abbreviation of every day (first three letters):

{% highlight javascript linenos %}
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const abbreviatedDays = daysOfWeek.map(day => `${day.charAt(0)}${day.charAt(1)}${day.charAt(2)}`);

console.log(abbreviatedDays);
// ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
{% endhighlight %}

{% highlight javascript linenos %}
const daysOfWeek = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

const abbreviatedDays = daysOfWeek.map(day => day.split('').slice(0, 3).join(''));

console.log(abbreviatedDays);
// ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
{% endhighlight %}

## Return a Single Value from an Array with reduce()

<a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/Reduce">MDN Page for reduce</a>.

Use `reduce()` to return a single value from an array of values.

The `reduce()` method lets you turn all the items in an array into one value. For example, you may have an array of prices, but you only need the total price. If you had an array of names, and you wanted to find out how many names there were with a length greater than six, you could use the `reduce()` method to return that total. You could also add an array of numbers together and return the sum. Or say you have an array of dates and you wanted to return the most recent date.

The parameters for `reduce()` work a little differently than `forEach()`, `filter()`, and `map()`. The callback function for `reduce()` has two parameters instead of one. The first parameter is an accumulator. The second parameter represents the current item in the array. The accumulator contains the running total of the value the reduce method returns. In other words the accumulator is returned.  

The second argument after the callback function represents the value for the accumulator for the first time in the array.

{% highlight javascript linenos %}
const total = [0, 1, 2, 3].reduce((acc, cur) => acc + cur, 0);

console.log(total);
// 6
{% endhighlight %}

In the above example the accumulator starts at 0 and the current value is 1. Next, the accumulator is 1 and the current is 2. Next, accumulator 3, current 3. Finally, at the end, the accumulator is return, which is 6.

If an initial value is not given, `reduce()` will take the first value of the array (value at index 0) and use that:

{% highlight javascript linenos %}
const total = [0, 1, 2, 3].reduce((acc, cur) => acc + cur);

console.log(total);
// 6
{% endhighlight %}

While this is true, it is often better to give that second parameter for `reduce()` to explicitely set the initial value of the accumulator.

#### Example Two:

Given an array of prices return the total using the `reduce()` method:

{% highlight javascript linenos %}
const prices = [6.75, 3.10, 4.00, 8.12];

const total = prices.reduce((sum, price) => sum + price, 0);

console.log(total);
// 21.97
{% endhighlight %}

#### Example Three:

Given an array of names return a count of the names that start with 'g'.

{% highlight javascript linenos %}
const names = ['Gary', 'Pasan', 'Gabe', 'Treasure', 'Gengis', 'Gladys', 'Tony'];

const gNameCount = names.reduce((count, name) => {
  if (name.toLowerCase().charAt(0) === 'g') {
    return count + 1;
  }
  return count;
}, 0);

console.log(gNameCount);
// 4
{% endhighlight %}

#### Example Four:

Given an array of phone numbers return the total count of phone numbers that have a '503' area code.

{% highlight javascript linenos %}
const phoneNumbers = ["(503) 123-4567", "(646) 123-4567", "(503) 987-6543", "(503) 234-5678", "(212) 123-4567", "(416) 123-4567"];

const numberOf503 = phoneNumbers.reduce((count, phoneNumber) => {
  if (phoneNumber.slice(0, 5) === '(503)') {
    return count + 1;
  }
  return count;
}, 0);

console.log(numberOf503);
// 3
{% endhighlight %}

## Chaining Array Methods

Because the `map()` method returns an array, you can call another array method directly after it. The same is true for the `filter()` method. This is commonly called chaining methods, because each call is like a link in a chain.

As long as a method returns an array, you can call another array method on the end.

{% highlight javascript linenos %} 
const arr = [1,2,3];

const newArr = arr.filter(number => number !== 2).map(number => number + 1);

console.log(newArr);
// [2,4]
{% endhighlight %}

In previous examples we've been storing the results of `filter()` and `map()` in variables, or constants. This is a good practice when you need to chain array manipulating methods to keep your code organized:

{% highlight javascript linenos %}
const arr = [1,2,3];

const smallerArr = arr.filter(number => number !== 2);
const incrementedArr = smallerArr.map(number => number + 1);

console.log(incrementedArr); 
// [2,4]
{% endhighlight %}

Because the JavaScript interpreter ignores whitespace, you will often see each method on a separate line:

{% highlight javascript linenos %}
const arr = [1,2,3];

const newArr = arr
  .filter(number => number !== 2)
  .map(number => number + 1);

console.log(newArr); 
// [2,4]
{% endhighlight %}

You can also plug methods in and out of the chain in a modular way, which makes the code more maintainable. For example, if you no longer wanted to add one to each item you could remove the `map()` method.

As before, these methods don't affect the original array. They return a new array. Generally, making new arrays means you have more options.

#### Example Two

Given an array of years create a new array for years in the 21st centrury, displayed like "2015 A.D.", using `filter()` and `map()`:

{% highlight javascript linenos %}
const years = [1989, 2015, 2000, 1999, 2013, 1973, 2012];

let displayYears = years
  .filter(year => year >= 2001 && year < 3000)
  .map(year => `${year} A.D.`);

console.log(displayYears);
// ["2015 A.D.", "2013 A.D.", "2012 A.D."]
{% endhighlight %}

## Working with Objects in Arrays

Arrays of objects are often utilitzed in JavaScript development.

Working with objects in arrays is much like before. For example, say you had an array of objects called users. Each object contained a name. If you wanted to filter out a specific name you could do the following:

{% highlight javascript linenos %}
const users = [
  {name: 'Samir'},
  {name: 'Angela'},
  {name: 'Beatrice'}
];

const newUsers = users.filter(user => user.name !== "Samir");

console.log(newUsers);
// [{name: 'Angela'}, {name: 'Beatrice'}]
{% endhighlight %}

What if the object had an age property? You could use the `map()` method to produce an array of strings displaying how old each user is:

{% highlight javascript linenos %}
const users = [
  {
    name: 'Samir',
    age: 27
  },
  {
    name: 'Angela',
    age: 33
  },
  {
    name: 'Beatrice',
    age: 42
  }
];

const newUsers = users.map(user => `${user.name} is ${user.age} years old.`);

console.log(newUsers);
// ['Samir is 27 years old.', 'Angela is 33 years old.', 'Beatrice is 42 years old.']
{% endhighlight %}

Recall that you can use `reduce()` to combine array elements into one value. The value it returns doesn't need to be primitive, like a string or number, it can be an object or even another array, depending on the needs of your program.

Using `reduce()` you can take the users array and create a new object where the name is the key and the age is the value:

{% highlight javascript linenos %}
const users = [
  {
    name: 'Samir',
    age: 27
  },
  {
    name: 'Angela',
    age: 33
  },
  {
    name: 'Beatrice',
    age: 42
  }
];

const usersObj = users.reduce((usersObj, user) => {
  usersObj[user.name] = user.age;
  return usersObj;
}, {});

console.log(usersObj);
// {Samir: 27, Angela: 33, Beatrice: 42}
{% endhighlight %}

#### Example Two:

Given an array of objects with firstNames and lastNames, create an array of full name strings using the `map()` method:

{% highlight javascript linenos %}
const authors = [
  { firstName: "Beatrix", lastName: "Potter" },
  { firstName: "Ann", lastName: "Martin" },
  { firstName: "Beverly", lastName: "Cleary" },
  { firstName: "Roald", lastName: "Dahl" },
  { firstName: "Lewis", lastName: "Carroll" }
];

const fullAuthorNames = authors.map(author => `${author.firstName} ${author.lastName}`);

console.log(fullAuthorNames);
// ["Beatrix Potter", "Ann Martin", "Beverly Cleary", "Roald Dahl", "Lewis Carroll"]
{% endhighlight %}

## Practice Combining filter() and map()

As stated you can combine `filter()` and `map()` to clean an array of unwanted values before transforming the leftover items.

#### Example One:

Given an array of names use `filter()` and `map()` to create an array of objects, like `{name: Samir}`, with only names that start with the letter "S":

{% highlight javascript linenos %}
const userNames = ['Samir', 'Angela', 'Beatrice', 'Shaniqua', 'Marvin', 'Sean'];

const sNames = userNames
  .filter(name => name[0].toLowerCase() === 's')
  .map(name => ({name: name}));

console.log(sNames);
// [{name: 'Samir'}, {name: 'Shaniqua'}, {name:'Sean'}];
{% endhighlight %}

Note that, because an arrow function because they use curly braces to surround their function bodies, the arrow function doesn't know this is an object literal, which also uses curly braces. This is why it is surrounded by parentheses.

Also, note that because the variable name is the same as the property, the following property shorthand can be used:

{% highlight javascript linenos %}
const userNames = ['Samir', 'Angela', 'Beatrice', 'Shaniqua', 'Marvin', 'Sean'];

const sNames = userNames
  .filter(name => name[0].toLowerCase() === 's')
  .map(name => ({name}));

console.log(sNames);
// [{name: 'Samir'}, {name: 'Shaniqua'}, {name:'Sean'}];
{% endhighlight %}

#### Example Two:

Given an array of objects containing names and ages return an array of strings for users that are 30 years and older using `filter()` and `map()`:

{% highlight javascript linenos %}
const users = [
  {name: 'Samir', age: 27},
  {name: 'Angela', age: 33},
  {name: 'Beatrice', age: 42},
  {name: 'Shaniqua', age: 30},
  {name: 'Marvin', age: 23},
  {name: 'Sean', age: 47}
];

const oldUsers = users
  .filter(user => user.age >= 30)
  .map(user => user.name);

console.log(oldUsers);
// ['Angela', 'Beatrice', 'Shaniqua', 'Sean'];
{% endhighlight %}

#### Example Three:

Given an array of objects containing finished and unfinished to do items, create an array of strings containing unfinished tasks using `filter()` and `map()`:

{% highlight javascript linenos %}
const todos = [
  { todo: 'Buy apples', done: false },
  { todo: 'Wash car', done: true },
  { todo: 'Write web app', done: false },
  { todo: 'Read MDN page on JavaScript arrays', done: true },
  { todo: 'Call mom', done: false }
];

const unfinishedTasks = todos
  .filter(todo => todo.done === false)
  .map(todo => todo.todo );

console.log(unfinishedTasks)
// ["Buy apples", "Write web app", "Call mom"]
{% endhighlight %}

## Practice Combining filter() and reduce()

Combining `filter()` with `reduce()` can allow you to remove values from an array and then compute some value.

#### Example One:

Given an array of objects containing office supply items and their prices return the product that is the highest price, but still under ten dollars using `filter()` and `reduce()`:

{% highlight javascript linenos %}
const products = [
  { name: 'hard drive', price: 59.99 },
  { name: 'lighbulbs', price: 2.59 },
  { name: 'paper towels', price: 6.99 },
  { name: 'flatscreen monitor', price: 159.99 },
  { name: 'cable ties', price: 19.99 },
  { name: 'ballpoint pens', price: 4.49 },
];

const product = products
  .filter(product => product.price < 10)
  .reduce((highest, product) => {
    if (highest.price > product.price) {
      return highest;
    }
    return product;
  });
  
console.log(product)
// { name: 'paper towels', price: 6.99 }
{% endhighlight %}

As you can see the accumulator argument doesn't have to be used to add or combine elements. In fact, here it is used to collect the highest priced item. Inside the callback it compares the current array items price to the items stored in highest and returning whichever one is higher. By always choosing the highest price, `reduce()` will eventually return the product with the overall highest price. 

Also, note that an initial value is not used in thie call to `reduce()`. That's because it is not being used to combine the array's values. It makes sense to start with the first element rather than a value that isn't part of the array.

#### Example Two:

Using the same array of objects containing office supply products and their prices return a total of all products over ten dollars using `filter()` and `reduce()`:

{% highlight javascript linenos %}
const products = [
  { name: 'hard drive', price: 59.99 },
  { name: 'lighbulbs', price: 2.59 },
  { name: 'paper towels', price: 6.99 },
  { name: 'flatscreen monitor', price: 159.99 },
  { name: 'cable ties', price: 19.99 },
  { name: 'ballpoint pens', price: 4.49 },
];

const total = products
  .filter(product => product.price > 10)
  .reduce((sum, product) => sum + product.price, 0);
  
console.log(total)
// 239.97000000000003
{% endhighlight %}

Note that you can use the `toFixed()` method to remove the zeroes:

{% highlight javascript linenos %}
const products = [
  { name: 'hard drive', price: 59.99 },
  { name: 'lighbulbs', price: 2.59 },
  { name: 'paper towels', price: 6.99 },
  { name: 'flatscreen monitor', price: 159.99 },
  { name: 'cable ties', price: 19.99 },
  { name: 'ballpoint pens', price: 4.49 },
];

const total = products
  .filter(product => product.price > 10)
  .reduce((sum, product) => sum + product.price, 0)
  .toFixed(2);
  
console.log(total)
// 239.97
{% endhighlight %}

#### Example Three:

Given an array of objects containing purchased items return the total amount spent on groceries:

{% highlight javascript linenos %}
const purchaseItems = [
    { name: 'apples', dept: 'groceries', price: 2.49 },
    { name: 'bread', dept: 'groceries', price: 2.99 },
    { name: 'batteries', dept: 'electronics', price: 5.80 },
    { name: 'eggs', dept: 'groceries', price: 3.99 },
    { name: 't-shirts', dept: 'apparel', price: 9.99 }
];

const groceryTotal = purchaseItems
  .filter(item => item.dept.toLowerCase() === 'groceries')
  .reduce((sum, item) => {
    return sum + item.price;
  }, 0);

console.log(groceryTotal);
// 9.47
{% endhighlight %}

## Nested Data

A common data pattern is array of arrays. It is often necessary to take the elements out of each array and create on big array. This is commonly called flattening, because you're putting the internal elements all on one level.

Consider the following:

{% highlight javascript linenos %}
const movies = [
  ['The Day the Earth Stood Still', 'Superman', 'Ghostbusters'],
  ['Finding Dory'],
  ['Jaws', 'On the Waterfront']
]
{% endhighlight %}

Notice `map()` won't work for this because we would still end up with three elements. Because we want to fundamentally alter the array structure, we can use `reduce()` to collect the internal array elements and place them in a new array.

{% highlight javascript linenos %}
const movies = [
  ['The Day the Earth Stood Still', 'Superman', 'Ghostbusters'],
  ['Finding Dory'],
  ['Jaws', 'On the Waterfront']
];

const flatMovies = movies.reduce((arr, innerMovies) => [...arr, ...innerMovies], []);

console.log(flatMovies);
{% endhighlight %}

Note that the <a href="https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Spread_operator">spread operator</a>, `...` places the elements of an array into another array.

#### Example Two:

Given an array of objects containing information about users and an array of objects containing their favorite books create an array of all the favorite books from every user:

{% highlight javascript linenos %}
const users = [
  {
    name: 'Samir',
    age: 27,
    favoriteBooks:[
      {title: 'The Iliad'},
      {title: 'The Brothers Karamazov'}
    ]
  },
  {
    name: 'Angela',
    age: 33,
    favoriteBooks:[
      {title: 'Tenth of December'},
      {title: 'Cloud Atlas'},
      {title: 'One Hundred Years of Solitude'}
    ]
  },
  {
    name: 'Beatrice',
    age: 42,
    favoriteBooks:[
      {title: 'Candide'}
    ]
  }
];

const books = users
  .map(user => user.favoriteBooks.map(book => book.title))
  .reduce((arr, titles) => [...arr, ...titles], []);

console.log(books);
// ['The Iliad', 'The Brothers Karamazov', 'Tenth of December', 'Cloud Atlas', 'One Hundred Years of Solitude', 'Candide'];
{% endhighlight %}

This was done by iterating over every user, and then iterating over every book pulling out titles.

#### Example Three

Given an array of arrays use `reduce()` method to flatten the arrays into one array:

{% highlight javascript linenos %}
const customerNames = [
    [ "John", "Sandy", "Tyrone", "Elizabeth", "Penny" ],
    [ "Barry", "Wanda", "Jamal", "Hayden" ],
    [ "Portia", "Pam", "Philip" ]
];

const flattenedCustomerNames = customerNames.reduce((arr, innerNames) => [...arr, ...innerNames], []);

console.log(flattenedCustomerNames);
// ["John", "Sandy", "Tyrone", "Elizabeth", "Penny", "Barry", "Wanda", "Jamal", "Hayden", "Portia", "Pam", "Philip"]
{% endhighlight %}

#### Example Four

Using the `reduce()` method, extract all the customer hobbies into their own array. Store the hobbies in an array called hobbies:

{% highlight javascript linenos %}
const customers = [
  {
    name: "Tyrone",
    personal: {
      age: 33,
      hobbies: ["Bicycling", "Camping"]
    }
  },
  {
    name: "Elizabeth",
    personal: {
      age: 25,
      hobbies: ["Guitar", "Reading", "Gardening"]
    }
  },
  {
    name: "Penny",
    personal: {
      age: 36,
      hobbies: ["Comics", "Chess", "Legos"]
    }
  }
];

const hobbies = customers
  .map(customer => customer.personal.hobbies.map(hobby => hobby))
  .reduce((arr, hobby) => [...arr, ...hobby], []);

console.log(hobbies);
// ["Bicycling", "Camping", "Guitar", "Reading", "Gardening", "Comics", "Chess", "Legos"]
{% endhighlight %}