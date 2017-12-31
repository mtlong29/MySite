---
layout: article

permalink: /notes/object-initialization/

title: "Object Initialization with Swift"

subtitle: "Treehouse - Intermediate iOS Development"

excerpt: "Initializing an object in Swift, whether a value or reference type, can be both quite strict and flexible at the same time. Theses notes examine failable initializers, throwing initializers, initializer delegation, designated initializers, convenience initializers, initializing superclasses, and required initializers."

categories: notes

date: 2017-12-05
---

{% include /globalSections/toc.html %}

Initializing an object in Swift, whether a value or reference type, can be both quite strict and flexible at the same time. Theses notes examine **failable initializers, throwing initializers, initializer delegation, designated initializers, convenience initializers, initializing superclasses, and required initializers**.

## Basic Initialization Recap

[Initialization](https://developer.apple.com/library/mac/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html) is the process of preparing an instance of a `class`, `struct`, or `enum` for use by setting up initial values to own stored properties and performing any other setup.

>Initialization is carried out in a special method, an `init` method which like a regular method, can take parameters for us to assign values to our stored properties. These parameters follow all the standard rules as regular function parameters which includes local and external parameter names.

We can assign default values to stored properties or mark them as optional if there are variables which allows us to defer setting any values inside an `init` method. We also know that a `struct` gets a default initializer known as a "memberwise" initializer. 

```swift
struct Size {
  var width: Double
  var height: Double
}

let twoByTwo = Size(width: 2.0, height: 2.0)
```

And an `enum` with raw values also get a default initializer that accepts a raw value.

```swift
enum Day: Int {
  case sunday = 1
  case monday
  case tuesday
  case wednesday
  case thursday
  case friday
  case saturday
}

Day.monday.rawValue // 2
Day.friday.rawValue // 6
let day = Day(rawValue: 4) // wednesday
```

## Failable and Throwing Initializers

A common occurrence of not being able to initialize an object is if it relies on external data. Swift gives two ways to deal with this: [failable initializers](https://developer.apple.com/library/mac/documentation/Swift/Conceptual/Swift_Programming_Language/Initialization.html#//apple_ref/doc/uid/TP40014097-CH18-ID224) and throwing initalizers.

>A failable initializer, `init?() {}`, is optional. The result either contains the object if the initialization succeeded, or it contains `nil`, if the initialization failed.

Recall the `Day` `enum` above. The `rawValue` for a day that doesn't exist would return `nil`.

```swift
enum Day: Int {
  case sunday = 1
  case monday
  case tuesday
  case wednesday
  case thursday
  case friday
  case saturday
}

Day.monday.rawValue // 2
Day.friday.rawValue // 6
let dayFour = Day(rawValue: 4) // wednesday
let dayEight = Day(rawValue: 8) // nil
```

>By making an `init` method failable, you allow the compiler to consider the different paths of execution rather than handling it implicitly.

All we do to mark an initializer as failable, is to add a question mark or an exclamation point after the `init` keyword which indicates the form of the optional that will be produced by constructing an object with that initializer. **Once you mark an initializer is failable you can `return nil` to indicate that the initialization has failed.**

```swift
class Person {
  let name: String
  let age: Int
  
  init?(dict: [String: AnyObject]) {
    guard let name = dict["name"] as? String, let age = dict["age"] as? Int else {
      return nil
    }
    
    self.name = name
    self.age = age
  }
}
```

Sometimes initialization can fail, and you simply have no alternate path or don't want to take one. In this case we have a second specialized initializer, a throwing initializer, `init() throws {}`.  **Rather than indicating a `nil` return using a question mark, we can make the initializer a throwing method, that throws an error.**

```swift
enum PersonError: Error {
  case invalidData
}

class Person {
  let name: String
  let age: Int
  
  init (dict: [String: AnyObject]) throws {
    guard let name = dict["name"] as? String, let age = dict["age"] as? Int else {
      throw PersonError.invalidData
    }
    
    self.name = name
    self.age = age
  }
}
```

>It is possible to make an `init` method both throwable and failable. But this is *bad practice*. A simple rule is if you want to continue execution after initialization fails by adding an alternative path to your code, use a failable initializer. Otherwise, use a throwing initializer and halt program execution in some way to deal with that error.

## Initializer Delegation

It is possible to delegate initialization work and use multiple initalizers.

We have sort of seen what this looks like, because when initializing subclasses, we've called `super init` to delegate initialization of a base class. **Initializer delegation is a big more extensive than that, and differs based on whether using a value type or a reference type.**

Consider the following example:

```swift
struct Point {
  var x: Int = 0
  var y: Int = 0
}

struct Size {
  var width: Int = 0
  var height: Int = 0
}

struct Rectangle {
  var origin = Point()
  var size = Size()
  
  init(origin: Point, size: Size) {
    self.origin = origin
    self.size = size
  }
  
  init(x: Int, y: Int, height: Int, width: Int) {
    let origin = Point(x: x, y: y)
    let size = Size(width: width, height: height)
    
    self.origin = origin
    self.size = size
  }
}
```

Notice that `self.origin = origin` and `self.size = size` is used twice, in each initializer. We are repeating outselves. Instead of doing this we can delegate initiallization from the init method.

```swift
struct Point {
  var x: Int = 0
  var y: Int = 0
}

struct Size {
  var width: Int = 0
  var height: Int = 0
}

struct Rectangle {
  var origin = Point()
  var size = Size()
  
  init(origin: Point, size: Size) {
    self.origin = origin
    self.size = size
  }
  
  init(x: Int, y: Int, height: Int, width: Int) {
    let origin = Point(x: x, y: y)
    let size = Size(width: width, height: height)
    
    self.init(origin: origin, size: size)
  }
}
```

By calling `self.init`, we're instructing another initializer in the same type to finish up the initialization process. In this way, we can create many initializers that serve custom needs, different ways to construct the same class.

For example, say we wanted an instance of the center of a rectangle instead of the origin. We could create a new initializer for this:

```swift
struct Point {
  var x: Int = 0
  var y: Int = 0
}

struct Size {
  var width: Int = 0
  var height: Int = 0
}

struct Rectangle {
  var origin = Point()
  var size = Size()
  
  init(origin: Point, size: Size) {
    self.origin = origin
    self.size = size
  }
  
  init(x: Int, y: Int, height: Int, width: Int) {
    let origin = Point(x: x, y: y)
    let size = Size(width: width, height: height)
    
    self.init(origin: origin, size: size)
  }
}

let pointOne = Point(x: 2, y: 4) // x = 2, y = 4
let sizeOne = Size(width: 4, height: 8) // width = 4, height = 8
let rectOne = Rectangle(center: pointOne, size: sizeOne) // x = 0, y = 0, width = 4, height = 8
```

## Designated and Convenience Initializers

Unlike initialization in value types, where only the type properties have to be initialized. Initialization in a reference type involves assigning initial values to both the classes stored properties, as well as any properties inherited from its super or base class.

Classes in Swift have two different types of initializers to help ensure that all stored properties have initial values: designated initializers and convenience initializers.

#### Designated Initializer 

- Centeral point of initialization
- Classes must have at least one
- Responsible for initializing stored properties
- Responsible for calling super init

>Designated initializers are the central point of initialization. So typically classes only have one, in fact they must have at least one. This is why you get an error if an `init` method is not given.

The following is a designated initializer which is just a normal initializer.

```swift
class Vehicle {
  let name: String
  
  init (name: String) {
    self.name = name
  }
}
```

#### Convenience Initializer

To make an initializer a convenience initializer use the keyword, `convenience` followed by the init like always.

```swift
class Vehicle {
  let name: String
  
  init (name: String) {
    self.name = name
  }
  
  convenience init() {
    self.init(name: "Unnamed")
  }
}

Vehicle() // name: "Unnamed"
```

Convenience initializers are secondary, supporting initializers for a class. You can define a convenience initializer to call a designated initializer from the same class as the convenience iitializer with some of the designated initializer's parameters set to default values. You can also define a convenisnce initializer to create an instance of that class for a specific use case or input value type.

You do not have to provide convenience initializers if your class does not require them. Create convenience initializers whenever a shortcut to a common initialization pattern will save time or make initialization of the class clearer in intent.

#### Quiz:

---

**Question**: A ____ initializer is responsible for assigning values to stored properties and calling the superclass' initializer.

**Answer**: designated

**Question**: When one initializer calls another this process is known as initializer ____.

**Answer**: delegation

**Question**: When initializing an object using a failable initializer the result is what?

**Answer**: An optional that either contains the object, if the initialization succeeded, or contains `nil` if initialization failed.

**Question**: A convenience initializer can call a designated initializer in a superclass.

**Answer**: False. A convenience initializer can only call a designated initializer that is defined in the same class.

**Question**: A failable initializer is used when you want to handle failure gracefully and not half app execution.

**Answer**: True

**Question**: What indicates a failable initializer?

**Answer**: `init?()`

---

## Initializing Superclasses

Designated and convenience initializers are fairly simple when we only have to deal with a single class.

```swift
class Vehicle {
  let name: String
  
  init (name: String) {
    self.name = name
  }
  
  convenience init() {
    self.init(name: "Unnamed")
  }
}

class Car: Vehicle {
  let numberOfDoors: Int
  
  init(name: String, numberOfDoors: Int) {
    self.numberOfDoors = numberOfDoors
    super.init(name: name)
  }
}
```

We can add a convenience initializer, because the `numberOfDoors` are usually `4`.

```swift
class Vehicle {
  let name: String
  
  init (name: String) {
    self.name = name
  }
  
  convenience init() {
    self.init(name: "Unnamed")
  }
}

class Car: Vehicle {
  let numberOfDoors: Int
  
  init(name: String, numberOfDoors: Int) {
    self.numberOfDoors = numberOfDoors
    super.init(name: name)
  }
  
  convenience override init(name: String) {
    self.init(name: name, numberOfDoors: 4)
  }
}
```

Note that because we have already initialized the name in the `Vehicle` class we have to use the keyword `override` to override this initialization. Another possibility is the doors always defaulting to 4 and the name always being "Unnamed":

```swift
class Vehicle {
  let name: String
  
  init (name: String) {
    self.name = name
  }
  
  convenience init() {
    self.init(name: "Unnamed")
  }
}

class Car: Vehicle {
  let numberOfDoors: Int
  
  init(name: String, numberOfDoors: Int) {
    self.numberOfDoors = numberOfDoors
    super.init(name: name)
  }
  
  convenience override init(name: String) {
    self.init(name: name, numberOfDoors: 4)
  }
  
  convenience init() {
    self.init(name: "Unnamed")
  }
}

let exampleOne = Car(); // name: "Unnamed", numberOfDoors: 4
let exampleTwo = Car(name: "Legacy") // name: "Legacy", numberOfDoors: 4
let exampleThree = Car(name: "Mustang", numberOfDoors: 2) // name: "Mustang", numberOfDoors: 2
```

**Note that because this initializer is not in any of the superclasses designated initializers we don't use the keyword `override`.** There are quite a bit of rules with initializing superclasses

#### Rule #1

- Every class must have a designated initializer
- Responsible for calling superclasses designated initializer

#### Rule #2

- Classes can have any number of convenience initializers
- A convenience initializer must call other initalizers in the same class

#### Rule #3

- Convenience initializers must call a designated initializer eventually

Designated initializers always delegate initiation up the chain. Convenience initializers always delegate across the chain.

## Requiring Initializers

Sometimes we could want all subclasses of a particular superclass to implement a certain initializer. For that we have another keyword, `required`. By adding `required` to an `init` method, we're indicating that all subclasses must provide an implementation for this particular `init` method. **`UIKit` classes often have required initializers.**

```swift
import UIKit

class ViewController: UIViewController {
  init() {
    super.init(nibName: nil, bundle: nil)
  }
  
  required init?(coder aDecoder: NSCoder) {
    fatalError("init(coder:) has not been implemented")
  }
}
```

#### Quiz:

---

**Question**: When you call `fatalError()` inside an `init` method, compiler errors regarding property initialization disappear. Why?

**Answer**: The compiler verifies that this `init` method leads to a crash making property initialization unnecessary

**Question**: A convenience initalizer can only call a designated initializer.

**Answer**: False. A convenience initializer can call another convenience initializer defined in the same class.

**Question**: How do we specify that subclasses or value types that inherit from a `protocol` must implement an initializer?

**Answer**: Use the `required` keyword when defining the initializer

**Question**: Designated initializers always delegate instantiation up the chain. Convenience initializers always delegate across the chain.

**Answer**: True

**Question**: Classes can have more than one designated initializer

**Answer**: True

---