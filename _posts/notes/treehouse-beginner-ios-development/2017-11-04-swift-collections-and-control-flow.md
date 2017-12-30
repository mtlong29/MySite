---
layout: article

permalink: /notes/swift-collections-and-control-flow/

title: "Swift Collections and Control Flow"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Notes on dealing with groups of values in Swift. This is achieved through the use of collection types. These notes focus on arrays and dictionaries as well as control flow statements."

categories: notes

date: 2017-11-04
---

{% include /globalSections/toc.html %}

**Dealing with groups of values is a fundamental aspect of programming and is achieved through the use of collection types.** These notes take a look at Swift's two primary collection types - **arrays** and **dictionaries**. In addition, they also look at how we can change the path of execution of our code by using several control flow statements.

## Arrays

Arrays are written much like you'd expect. However, you can also explicitly state the type of an array.

```swift
var todo = ["Finish Collections Course", "Buy Groceries", "Respond to Emails"]
var things: [String] = ["computer", "broccoli", "emails"]
let numbers: [Int] = [1, 2, 3]
```

This is obviously not necessary, but it can help. Recall that **Swift is type safe**. Therefore, arrays are restricted to a single type.

#### Adding Items

You can use the `.append()` method to add one item to the end of an array and you can use concatenation to add more than one item:

```swift
var todo = ["Finish Collections Course", "Buy Groceries", "Respond to Emails"]
// add new item to end of array using append method
todo.append("Sleep")
// concatenating two arrays
todo += ["Order Book Online", "Sleep"]
```

Keep in mind that if you make the array immutable using `let` you cannot add items to the array.

#### Reading and Modifying an Array

Reading from an array is common, and done using subscripting. **Subscripting is when you take the name of the array and then immediately after that name place a set of square brackets and the index value you want.**

You can also use this to assign a new value to an index in an array.

```swift
var todo = ["Finish Collections Course", "Buy Groceries", "Respond to Emails"]
// reading from arrays
let thirdItem = todo[2]
// modifying existing values
todo[2] = "Eat"
```

#### Inserting and Deleting Values

**You can use the `.insert()` method to insert a value into an existing array. This pushes the preexisting values forward an index.** Meaning if you want to insert a value at index 2, the value that was at index 2 is now at index 3. Any other values are push forward an index as well. **You can remove an item from an array using the `.remove()` method. This will remove the item from the array, updating the indexes too, as well as returning that value.**

```swift
var todo = ["Finish Collections Course", "Buy Groceries", "Respond to Emails"]
// insert using indexes
todo.insert("Watch TV", at: 1)
// removing items from arrays
todo.remove(at: 1)
```

>Keep in mind that the larger the array the more expensive these methods are.

#### Length

**To determine the number of items in an array you can use the `.count` property.** Note, this is not a method, it is a property.

```swift
var todo = ["Finish Collections Course", "Buy Groceries", "Respond to Emails"]
todo.count
```

>You can use `.count` to get the last index value by using `.count - 1`.

## Introduction to Dictionaries

A swift dictionary is basically a **key value pair**. Think of an actual dictionary which is composed of *terms and their definitions*. **To create a dictionary you start by typing square brackets `[]`.**

```swift
let airportCodes = [
  "LGA": "La Guardia",
  "LHR": "Heathrow",
  "CDG": "Charles de Gaulle",
  "HXG": "Hong Kong International",
  "DXB": "Dubai International"
]
airportCodes["LGA"]
// "La Guardia"
```

Note that the "returned" value isn't in the same order as they were entered. This is because dictionaries unlike arrays do not preserve any order. Dictionaries do not care about order, because we do not need order to refer to anything inside the dictionary. The rule of thumb is that if you need to maintain order then don't use dictionaries.

>The difference between an array and a dictionary is an array only takes a list of values where a dictionary takes a key value pair.

Don't forget that swift is type safe. This means all the keys and all the values must be the same type. However, it's possible to have your keys and your values to be different types:

```swift
var temp = [
  "Frankfort": 76.0,
  "Louisville": 77.0,
  "Lexington": 76.5
]
```

#### Modifying a Dictionary

You can change the value that is paired with a key much like you do with an array:

```swift
var temp = [
  "frankfort": 76.0,
  "louisville": 77.0,
  "lexington": 76.5
]
temp["frankfort"] = 71
```

**You can add a new key value pair using the `.updateValue()` method.**

```swift
var temp = [
  "frankfort": 76.0,
  "louisville": 77.0,
  "lexington": 76.5
]
temp["frankfort"] = 71
temp.updateValue(69, forKey: "bowling green")
```

**You can remove a key value pair two ways, one using the method `.removeValue()` and the other using subscripting.**

```swift
var temp = [
  "frankfort": 76.0,
  "louisville": 77.0,
  "lexington": 76.5
]
temp["frankfort"] = 71
temp.updateValue(69, forKey: "bowling green")
temp.removeValue(forKey: "louisville")
temp["frankfort"] = nil
```

In swift, `nil` represents nothingness. So in the above this is like saying we want the value for `frankfort` to be nothing.

#### Dealing with Non-Existing Data

When trying to access data that is outside the bounds of an array you will get an error. Dictionaries handle this better. Rather than crashing and giving you an error you will simply get a response of `nil` when trying to access a key value pair that doesnt exist.

>In other words arrays will always crash if you use an index value that doesn't exist. Dictionary keys however always return an optional value.

## For In Loop

>Going through an array and performing some task on each item in the array is a very common task and Swift has a build in control flow mechanism called a `for in` loop.

```swift
for name in array {
  // code
}
```

The following is a realistic example of a `for in` loop.

```swift
var todo: [String] = ["Finish collections course", "Buy groceries", "Respond to emails", "Pick up dry cleaning", "Order books online", "Mow the lawn"]
for task in todo {
    print(task)
}
```

>Note that the `print()` function prints something to the console area.

## For in Loop Over a Range

**It is also possible to loop over a range instead of an array.** This is more like something you would see in other programming languages. This can be done using two range operators: `1...5` and `1..<5`. The first example will loop from 1 to 5 and including 5. The second example will loop 1 to 5 and not including 5.

```swift
for i in 1...4 {
    print("Number \(i).")
}
// Number 1.
// Number 2.
// Number 3.
// Number 4.
for i in 1...3 {
    print("Number \(i).")
}
// Number 1.
// Number 2.
// Number 3.
```

## While and Repeat While

**A while `loop` performs a set of actions while a condition is true.** The syntax for a `while` loop looks like the following:

```swift
while condition {
    // code
}
```

A simple example using a `while` loop:

```swift
var x = 0
while x <= 5 {
    print("5 times \(x) is \(5*x).")
    x += 1
}
```

As always, it is important to ensure that a while loop condition can always become `false`. This is because an app will crash if it doesn't at some point become false, it will *run indefinitely*.

There is also a `repeat while` loop. **The difference is that a `while` loop is tested for the condition first where a `repeat while` loop is tested after it has ran once.** Therefore it will always run at least once.

```swift
repeat {
    print("7 times \(x) is \(7*x).")
    x += 1
} while x <= 5
```

In the above `"7 times 6 is 42.\n"` is returned first. This isn't needed so in this example a `repeat while` loop isn't needed.

## If Statement

An **if statement in Swift** looks like:

```swift
if condition {
    // code
}
```

A simple example:

```swift
var temp = 18
if temp < 40 && temp > 20{
    print("It's getting chilly. I recommend wearing a light sweater!")
} else if temp < 20 {
    print("It's really cold. Wear a warm jacket.")
} else {
    print("The weather is nice. Wear a t-shirt.")
}
```

>Swift comes with 3 logical conditions: and (`&&`), or (`||`), not (`!`). These are commonly used with `if` statements.

```swift
var results: [Int] = []
for n in 1...100 {
  if n % 7 == 0 && n % 2 != 0 {
    results.append(n)
  }
}
```

## Switch Statements

The `switch` statement is the last control flow. A `switch` statement is very powerful, and has more syntax than the other control flow patterns. 

>To create a `switch` statement you first start with the keyword `switch`. Then you give it a value that you can compare to multiple cases. Consider it a large `if else` statement. They also have what might be considered an `else` clause called `default`.

```swift
switch value to consider {
case value1:
    // respond to value1
case value2:
    // respond to value2
default:
    // do something else
}
```

Note that a `switch` statement is **type safe** as well.

```swift
let airportCodes = ["LGA", "LHR", "CDG", "HKG", "DXB"]
for airportCode in airportCodes {
    switch airportCode {
        case "LGA":print("New York")
        case "LHR": print("London")
        case "CDG": print("Paris")
        case "HKG": print("Hong Kong")
        default: print("I don't know which city \(airportCode) is in.")
    }
}
```

>Note that it is convention to name your constant the singular version of your array name, so that it's obvious to to the reader of your code that this array contains many airport codes, and when we iterate over each one, we assign a single value to the airport code constant.

You can have multiple values as well.

```swift
let airportCodes = ["LGA", "LHR", "CDG", "HKG", "DXB", "LGW", "JFK", "ORY"]
for airportCode in airportCodes {
    switch airportCode {
        case "LGA", "JFK": print("New York")
        case "LHR", "LGW": print("London")
        case "CDG", "ORY": print("Paris")
        case "HKG": print("Hong Kong")
        default: print("I don't know which city \(airportCode) is in.")
    }
}
```

You can use ranges as values as well.

```swift
switch randomTemperature {
    case 0..<32: print("Forget clothes, you are basically a popsicle.")
    case 32..<45: print("It's quite cold. You'll need a jacket.")
    case 45..<70: print("It's a bit chilly. Wear a light sweater.")
    case 70...100: print("It's quite hot! Wear a t-shirt.")
    default: print("The weather is awful. Don't go outside!")
}
```

#### Example Two:

```swift
var europeanCapitals: [String] = []
var asianCapitals: [String] = []
var otherCapitals: [String] = []
let world = [
  "BEL": "Brussels", 
  "LIE": "Vaduz", 
  "BGR": "Sofia", 
  "USA": "Washington D.C.", 
  "MEX": "Mexico City", 
  "BRA": "Brasilia", 
  "IND": "New Delhi", 
  "VNM": "Hanoi"]
for (key, value) in world {
    // Enter your code below
    switch key {
      case "BEL", "LIE", "BGR": europeanCapitals.append(value)
      case "IND", "VNM": asianCapitals.append(value)
      default: otherCapitals.append(value)
    }
    // End code
}
```

#### FizzBuzz Problem:

**The FizzBuzz problem comes up in interviews quite often.** If a number is divisible by `3` print the string `"Fizz"`, if it is divisible by `5` print out the string `"Buzz"`, and if it is divisible by both `3` and `5` then print out the string `"FizzBuzz"`. Finally, if it is not divisible by either then print out the number.

```swift
import GameKit
//let randomNum = GKRandomSource.sharedRandom().nextInt(upperBound: 75)
let fizz = randomNum%3
let buzz = randomNum%5
if (fizz == 0 && buzz == 0) {
    print("FizzBuzz")
} else if (fizz != 0 && buzz == 0) {
    print("Buzz")
} else if (fizz == 0 && buzz != 0) {
    print("Fizz")
} else {
    print(randomNum)
}
```

And doing this over a range of numbers:

```swift
for i in 1...100 {
    if (i%3 == 0) && (i%5 == 0) {
        print("Fizzbuzz")
    } else if (i%3 == 0) && (i%5 != 0) {
        print("Fizz")
    } else if (i%3 != 0) && (i%5 == 0) {
        print("Buzz")
    } else {
        print(i)
    }   
}
```

#### Quiz:

---

**Question**: What does the following statement evaluate to? `(!true || !false) && (true && !false)`

**Answer**: `true`

**Question**: both the AND and OR operators use short circuit evaluation.

**Answer**: True

**Question**: What advantages do a switch statement offer over an if statement?

**Answer**: A switch statement lets you switch on a range of values. A switch statement combines multiple pattern matches in a concise syntax. A switch statement can infer the type being switched on and provide compiler checks. A switch statement requires you to be exhaustive and consider every path your code can take.

**Question**: What operator is known as "less than or equal to"?

**Answer**: `<=`

---