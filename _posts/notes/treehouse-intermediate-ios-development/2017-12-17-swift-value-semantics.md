---
layout: article

permalink: /notes/swift-value-semantics/

title: "Swift Value Semantics"

subtitle: "Treehouse - Intermediate iOS Development"

excerpt: "Types in Swift fall into one of two categories: first, “value types”, where each instance keeps a unique copy of its data, usually defined as a struct, enum, or tuple. The second, “reference types”, where instances share a single copy of the data, and the type is usually defined as a class. These notes take a closer look at what immutability means in the context of value types and reference types. Also notes on adding methods to a type and how we can prevent classes from being subclassed."

categories: notes

date: 2017-12-17
---

{% include /globalSections/toc.html %}

Types in Swift fall into one of two categories: first, **“value types”**, *where each instance keeps a unique copy of its data, usually defined as a `struct`, `enum`, or `tuple`*. The second, **“reference types”**, where *instances share a single copy of the data, and the type is usually defined as a `class`.*

These notes take a closer look at what immutability means in the context of value types and reference types. Also notes on adding methods to a type and how we can prevent classes from being subclassed.

Brush up on [value and reference type basics](https://developer.apple.com/swift/blog/?id=10) with the Swift docs.

## Value Semantics

There are many tricks that Swift can play on you if you're not familiar with many value semantics.

Value types in Swift includes **structures**, **enumerations**, **arrays**, and other native types. However, these notes are going to use a `struct` as an example. This concept applies to all other value types as well.

```swift
struct Point {
  var x: Double
  var y: Double
}

var p1 = Point(x: 1, y: 2) // x = 1, y = 2
var p2 = p1 // x = 1, y = 2

p1.x = 4 // x = 4, y = 2
p2 // x = 1, y = 2
```

As you can see, we are not assigning `p1` to `p2` directly, we're copying the underlying value and assigning a separate copy to `p2`. That is done automatically for us.

Note that if we create a constant, `p3`, with `let` then it is immutable and once a value is assigned to a constant, using the box analogy, that constant is closed and locked off.

```swift
struct Point {
  var x: Double
  var y: Double
}

let p3 = Point(x: 2, y: 4)
```

What if we created a new **structure** but the properties were constants?

```swift
struct AnotherPoint {
  let x: Double
  let y: Double
}

var p4 = AnotherPoint(x: 1, y: 2)
p4.x = 6 // Error: Cannot assign to property: 'x' is a 'let' constant
p4 = AnotherPoint(x: 4, y: 5) // x = 4, y = 5
```

Note that even though `p4` is a **variable** and not a **constant** we are unable to change the `x` value. However, we can assign another instance completely. *Because the underlying properties are constants they cannot be changed.*

Going back to `Point`, let's add an instance method that says move left and then take a certain number of steps:

```swift
struct Point {
  var x: Double
  var y: Double
  
  func moveLeft(steps: Double) {
    x -= steps // Error: Left side of mutating operator isn't mutatable: 'self' is immutable
  }
}
```

As you can see an error occurs. Why? When we change the value of `x` on the instance earlier using dot notation, there was some magic. Swift was performing some magic for us under the hood, value types are always immutable by design. Meaning that we cannot mutate or change the value. What's happening when we seemingly change the value is that Swift creates a copy of our `struct`. So with `p1` it's creating a copy of this `Point` instance. It's assigning a new value to the property `x` and then assigning this brand new `struct` back to the variable. This is why when it's assigned to a constant we cannot change the value of the stored property even if the property is declared as a variable.

There is an easy fix to this issue. If we add the keyword `mutating` to our method. What this does, is tells the compiler, *"hey, this is a value type, but this method is trying to mutate it. So go ahead and do your copy magic under the hood!"*.

```swift
struct Point {
  var x: Double
  var y: Double
  
  mutating func moveLeft(steps: Double) {
    x -= steps
  }
}
```

As you can see, value types do a bit of magic under the hood for us to keep things safe and immutable.

## Reference Semantics

Reference types are simpler to understand than value types, but they can cause some issues as well!

Using the same exercise as before, we create a `class` named `Robot` that has a property, `model` of type `String`, and then we create an instance called `someRobot` and another variable called `anotherRobot` and try to assign `anotherRobot` to `someRobot`:

```swift
class Robot {
  var model: String
  
  init(model: String) {
    self.model = model
  }
}

var someRobot = Robot(model: "T1000") // model "T1000"
var anotherRobot = someRobot // model "T1000"

someRobot.model = "T2000" // model "T2000"
anotherRobot.model // "T2000"
```

As you can see there are no errors, and `anotherRobot` changed the `model` from `T1000` to `T2000` when we changed it for `someRobot`. This makes sense with what we know about reference types. Assigning the instance to one variable to another, assigns that same object because *the variable is holding a reference to an object in memory rather than the object itself*.

What if we create a new instance of `Robot`, but this time make it a constant?

```swift
class Robot {
  var model: String
  
  init(model: String) {
    self.model = model
  }
}

let thirdRobot = Robot(model: "T3000") // model "T3000"
thirdRobot.model = "T4000" // model "T4000"
```

As you can see no errors arise. When we're assigning an instance of a reference type to a constant, the thing that is constant again isn't the object, it's the instance of `Robot` to `thirdRobot`. We can change the underlying object as much as we want.

>Unlike **value types** where the object is copied, assigned a new value and then reassigned to the variable or a constant when we mutate the stored properties. None of that happens with a **reference type**. You can change the underlying properties on a constant here, because we're working with that same object. Meaning the reference to the object doesn't change but the stored properties can be changed pretty easily.

You've got to be careful about this. As you can see it's not as cut and dry when you say *variables can change, and constants cannot*. It really depends on whether your object is a **value type** or **reference type**.

#### Quiz

---

**Question**: When we assign an instance of a reference type to a constant, the thing that's constant isn't the object, it's the reference to the object.

**Answer**: True

**Question**: We can modify properties in a reference type even when it is assigned to a constant.

**Answer**: True

**Question**: How does the `mutating` keyword change the behavior of a struct's instance method?

**Answer**: It indicates that the method will modify the struct's values allowing the compiler to create a copy of the struct.

**Question**: Assigning a value type to a variable means you can change the value assigned to the variable, but not the value itself.

**Answer**: True. Value types are inherently immutable so you cannot change them. When you modify a value type, a copy is created and assigned to the variable.

---

## Mixed Semantics

What happens when you mix **value types** and **reference types** in a single type?

Consider the following example:

```swift
struct Point {
  let x: Double
  let y: Double
}

struct Size {
  let width: Double
  let height: Double
}

struct Rect {
  let origin: Point
  let size: Size
}

struct Color {
  let red: Double
  let green: Double
  let blue: Double
  let alpha: Double
  
  static var blue: Color {
    return Color(red: 0.0, green: 0.0, blue: 1.0)
  }
  
  static var red: Color {
    return Color(red: 1.0, green: 0.0, blue: 0.0)
  }
  
  static var white: Color {
    return Color(red: 0.0, green: 0.0, blue: 0.0)
  }
  
  init(red: Double, green: Double, blue: Double, alpha: Double = 1.0) {
    self.red = red/255.0
    self.green = green/255.0
    self.blue = blue/255.0
    self.alpha = alpha
  }
}

class View {
  var frame: Rect
  var backgroundColor: Color = .white
  
  init(frame: Rect) {
    self.frame = frame
  }
}

struct Shape {
  let view: View
  
  init(x: Double, y: Double, width: Double, height: Double, color: Color) {
    let origin = Point(x: x, y: y)
    let size = Size(width: width, height: height)
    
    let rect = Rect(origin: origin, size: size)
    self.view = View(frame: rect)
    view.backgroundColor = color
  }
}
```

Create an instance of `Shape`. Can someone come along and change the color of the shape? 

We cannot do this. However, there will be no errors, and here in lies the danger of creating value types that use reference types within.


```swift
let square = Shape(x: 0, y: 0, width: 100, height: 100, color: .red)
square.view.backgroundColor = .blue
```

Remember, a view is a reference type. It's a class. And as long as we have a reference to it, we can change the values and nothing goes wrong because what is constant is the link to the object in memory, through reference and not the actual object.

Structs containing value types can lead to unexpected behaviors. You can mutate things as much as you want on the reference types and they don't trigger that copy behavior that we've come to expect in structs.

## Type Methods

Just like we can add properties to the type itself we can also add methods.

Adding on to the previous example, given an arbitrary point, we want to calculate the distance of that point from the origin.:

```swift
import Foundation

struct Map {
  static let origin = Point(x: 0, y: 0)
  
  static func distance(to point: Point) -> Double {
    let horizontalDistance = origin.x - point.x
    let verticalDistance = origin.y - point.y
    
    func square(_ value: Double) -> Double {
      return value * value
    }
    
    let horizontalDistanceSquared = square(horizontalDistance)
    let verticalDistanceSquared = square(verticalDistance)
    
    return sqrt(horizontalDistanceSquared + verticalDistanceSquared)
  }
}
```

The only information we need, given a point is the location of the origin which is a static property. And this could be a free function, but since it deals with an aspect of the `Map`, we're going to add it to our type.

To create a type method, we start with a keyword, `static`. After that, we write the method out just like we would any instance method. 

Note that with Swift we can write a helper method (*function in a function*), `square` that takes a value and returns the value multiplied by itself.

Also, note that the `sqrt` function is defined in the *Foundation framework*.

>`static` refers to two things. First, the method is associated at the type level rather than an instance. And second, that method is statically dispatched. A simple way to think about `static` dispatch is that the compiler knows which method you intend to call at compile time.

## Final Classes

**Type methods** in **value types** are pretty easy, you just use the `static` keyword.

In fact, most things are easier with **value types** than with **reference types**. With reference types, inheritance adds a few additional requirements.

```swift
class Calculator {
  class func squareRoot(_ value: Double) -> Double {
    return sqrt(value)
  }
}

Calculator.squareRoot(64) // 8

class NewtonCalculator: Calculator {}

NewtonCalculator.squareRoot(64) // 8
```

>When you annotate a method with a `class` keyword not only does it create a type method, but it allows you to override the method in subclasses to provide your own implementation.

```swift
class Calculator {
  class func squareRoot(_ value: Double) -> Double {
    return sqrt(value)
  }
}

Calculator.squareRoot(64) // 8

class NewtonCalculator: Calculator {
  override class func squareRoot(_ value: Double) -> Double {
    var guess = 1.0
    var newGuess: Double
    
    while true {
      newGuess = (value/guess + guess)/2
      if guess == newGuess {
        return guess
      }
      
      guess = newGuess
    }
  }
}

NewtonCalculator.squareRoot(64) // 8
```

Methods of this kind are **dynamically dispatched**, this means that when we call the `squareRoot` method, the compiler does not know which specific method we're calling.

For example, when we called the `squareRoot` method on the `NewtonCalculator` the first time around, before we used override, it ended up calling `squareRoot` on the base class `Calculator`. Therefore it is **dynamically dispatched**. It at run time figures out where the implementation is, which class it's defined in and then calls it in that specific class.

What if we wanted to not be able to override the method? 

By adding the keyword `final class` in front of the method name, we prevent the method from being overridden.

```swift
class Calculator {
  class func squareRoot(_ value: Double) -> Double {
    return sqrt(value)
  }
  
  final class func square(_ value: Double) -> Double {
    return value * value
  }
}

Calculator.squareRoot(64) // 8

class NewtonCalculator: Calculator {
  override class func squareRoot(_ value: Double) -> Double {
    var guess = 1.0
    var newGuess: Double
    
    while true {
      newGuess = (value/guess + guess)/2
      if guess == newGuess {
        return guess
      }
      
      guess = newGuess
    }
  }
  
  override class func square(_ value: Double) -> Double {
    return 1
  }
  // Error: class method overrides a 'final' class method
}

NewtonCalculator.squareRoot(64) // 8
```

Since the compiler knows the `final class` method is going to be the only implementation of this method. The method can be statically dispatched just like for value types. So if we were to call square a `NewtonCalculator` the compiler doesn't have to figure out if there's an implementation in `NewtonCalculator` and whether it should call that or if there is one in `calculator` and if it should call that.

Because this method is marked as final it knows that this is always the only implementation in fact, for reference types for class, static keyword we used is simply an alias for `final class`. We can replace the `final class` keyword with a single word `static` and get the same behavior.

>Which should you use `final class` or `static`? In general, always use `static` to create type methods. The only time you should create a dynamically dispatched type method, is *if your subclasses really need to override it*, which obviously is case by case.

Note that you can mark an entire class as final as well.

#### Quiz

---

**Question**: How do we prevent a reference type from being subclassed?

**Answer**: Use the final keyword

**Question**: In reference types, final class implements the same behavior as which keyword?

**Answer**: static

**Question**: How does the class keyword differ from static when creating type methods?

**Answer**: Indicates that the method can be overridden in subclasses.

---