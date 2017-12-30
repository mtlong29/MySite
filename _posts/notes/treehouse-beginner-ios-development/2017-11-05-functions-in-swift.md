---
layout: article

permalink: /notes/functions-in-swift/

title: "Functions in Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "As always a function is a sequence of instructions that perform a specific task, packaged up as a unit. Functions can help your code become DRY (Dont Repeat Yourself). This is notes on how to use functions in Swift."

categories: notes

date: 2017-11-05
---

{% include /globalSections/toc.html %}

**As always a function is a sequence of instructions that perform a specific task, packaged up as a unit.** Functions can help your code become DRY (Dont Repeat Yourself). In other words whenever you write code that does the same thing more than once it is a good indication that you need a function for it.

## Function Syntax

>A function in Swift is declared using the `func` keyword, followed by the function name and then it's parameters inside a set of parentheses.

```swift
func area(length: Int, width: Int) {
  print(length * width)
}
area(length: 4, width: 10)
```

**Obviously a function is much useful when they return something**:

```swift
func area(length: Int, width: Int) -> Int {
  return length * width
}
area(length: 4, width: 10)
```

**A function that doesn't specify a `return` type it still returns a value type: `Void`.** This indicates to the compiler that it doesn't return anything. Therefore, you can actually use a function that doesn't anything. There are a number of ways to do this. The simplest way is to just leave off `-> Type`.

>Note like in other languages you can assign the returned value of a function to a variable or constant.

```swift
let areaOfFirstRoom = area(length: 12, width: 17)
```

#### Another Example:

```swift
func temperatureInFahrenheit(temperature: Double) -> Double {
  return ((temperature * 9) / 5) + 32
}
let fahrenheitTemp = temperatureInFahrenheit(temperature: 24.0)
```

#### Quiz:

---

**Question**: What keyword do we use to output a value from a function?

**Answer**: `return`

**Question**: Why will this code not compile?

```swift
func someFunction(a: Int) -> Bool {
  return a
}
```

**Answer**: The value we're returning does not match the return type

**Question**: What keyword do we use to create a function?

**Answer**: `func`

**Question**: A function contains a random assortment of code that executes a variety of tasks.

**Answer**: False

**Question**: What is wrong with the function declaration below?

```swift
func someFunction(Int, Int) -> Int {
  return 1
}
```

**Answer**: Function parameters require names

---

## Naming Conventions

>Just as we followed a set of rules for naming constants and variables, we have a set of guidelines as to how we name our functions.
 
There are several guidelines. One of the main rules is to follow the english language. In other words **make it so that the function can be read out loud as a correct grammatical sentence**. For example, `func move(x: Int) {}` does not read as an grammatically correct prepositional sentence: "move x". To make it a prepositional sentence you would add the word "to": `func move(toX: Int) {}`. This now reads as "move to x".

**Note that a preposition is a word that establishes a relationship between a noun and the rest of the sentence. For example, in "Erica climbed up the mountain", "up" is the preposition. In the sentence "Grab the folder with the stickers on it", "with" is the preposition.** Note that if there are more than one arguments then you move the preposition to the function name.

#### Another Example:

```swift
func remove(havingValue: String) {}
func areaWith(length: Int, width: Int) {}
```

[More on swift design guidelines](https://swift.org/documentation/api-design-guidelines/).

## Argument Labels

>An argument label is like a second name for an argument. Basically, you can have a **local name for an argument that can be used inside a function**. The **external name is used outside the function** such as when the function is called.

```swift
func remove(havingValue value: String) {
  print(value)
}
remove(havingValue: "Hi!")
```

In the above, `havingValue` is used outside the function `remove` while `value` is used inside. This is not necessary, but it occurs quite often. Many developers use this naming convention in order to have even more control on improving the readability of your functions.

#### Another Example:

```swift
func getRemainder(value a: Int, divisor b: Int) -> Int {
  return a%b
}
let result = getRemainder(value: 10, divisor: 3)
```

## Default Values

**Function parameters can take on default values.** The syntax for these are very simple. **You just set the parameter equal to the default value you want.** You can now call the function either without that parameter in which case it will default to the value given inside the function or you can call it and set a new value.

```swift
func area(length: Int, width: Int) -> Int {
  return length * width
}

func carpetCostHaving(length l: Int, width w: Int, carpetColor color: String = "tan") -> Int {
  let areaOfRoom = area(length: l, width: w)
  var price = 0
  switch color {
    case "gray": price = areaOfRoom * 1
    case "tan": price = areaOfRoom  * 2
    case "blue": price = areaOfRoom  * 4
    default: price = 0
  }
  return price
}

carpetCostHaving(length: 6, width: 8)
carpetCostHaving(length: 6, width: 6, carpetColor: "blue")

```

## Returning Complex Values

We often would like to return more than one value from a function call and in Swift we can achieve this using a construct known as a `tuple`.

>A `tuple` is simply a set of values wrapped in parentheses.

```swift
func area(length: Int, width: Int) -> Int {
  return length * width
}

func carpetCostHaving(length l: Int, width w: Int, carpetColor color: String = "tan") -> (Int, String) {
  let areaOfRoom = area(length: l, width: w)
  var price = 0
  switch color {
    case "gray": price = areaOfRoom * 1
    case "tan": price = areaOfRoom  * 2
    case "blue": price = areaOfRoom  * 4
    default: price = 0
  }
  return (price, color)
}

let roomOne = carpetCostHaving(length: 6, width: 8)
let roomTwo = carpetCostHaving(length: 6, width: 6, carpetColor: "blue")

roomOne.0
roomOne.1
```

With `tuples` you can also select a returned value using something similar to indexes. This is what the `roomOne.0` is referring to. `roomOne.0` is `96`. This obviously doesn't flow well with readability. We can give the returned values a name:

```swift
func area(length: Int, width: Int) -> Int {
  return length * width
}

func carpetCostHaving(length l: Int, width w: Int, carpetColor color: String = "tan") -> (price: Int, carpetColor: String) {
  let areaOfRoom = area(length: l, width: w)
  var price = 0
  switch color {
    case "gray": price = areaOfRoom * 1
    case "tan": price = areaOfRoom  * 2
    case "blue": price = areaOfRoom  * 4
    default: price = 0
  }
  return (price, color)
}

let roomOne = carpetCostHaving(length: 6, width: 8)
let roomTwo = carpetCostHaving(length: 6, width: 6, carpetColor: "blue")

roomOne.price
roomOne.carpetColor
```

Now the **function is much more readable**. It's worth noting you can still use the `.0` and `.1`.

## Function Scope

Code added inside a function is limited to the body of the function and doesn't exist outside of it. This concept is called scope.

>A variable created within a function only exists inside. These are called local variables. Variables created outside are called global variables. It is best to avoid global variables.

## Functions Without Argument Labels

>It is possible to tell Swift a function does not need to have an argument label. Built in functions like `append()` dont have labels. This can be done using an underscore, `_`.

```swift
func area(length: Int, width: Int) -> Int {
  return length * width
}

func carpetCostHaving(_ l: Int, _ w: Int, _ color: String = "tan") -> (price: Int, carpetColor: String) {
  let areaOfRoom = area(length: l, width: w)
  var price = 0
  switch color {
    case "gray": price = areaOfRoom * 1
    case "tan": price = areaOfRoom  * 2
    case "blue": price = areaOfRoom  * 4
    default: price = 0
  }
  return (price, color)
}

let roomOne = carpetCostHaving(6, 8)
let roomTwo = carpetCostHaving(6, 8, "blue")

roomOne.price
roomOne.carpetColor
```

This is how functions like `.append()` don't have labels.

#### Another Example:

```swift
func coordinates(for location: String) -> (Double, Double) {
  switch location {
    case "Eiffel Tower": return (48.8582, 2.2945)
    case "Great Pyramid": return (29.9792, 31.1344)
    case "Sydney Opera House": return (33.8587, 151.2140)
    default: return (0, 0)
  }
}
```