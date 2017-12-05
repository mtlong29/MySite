---
layout: article

permalink: /notes/object-oriented-swift/

title: "Object Oriented Swift"

subtitle: "Treehouse - Beginner iOS Development"

excerpt: "Swift allows you to create custom data types using structures and classes. Both structures and classes achieve the same goal - they allow you to create custom data types to store and pass data around in your code, but they do this in different ways. Notes on this is found here."

categories: notes

date: 2017-11-06
---

{% include /globalSections/toc.html %}

Swift allows you to create custom data types using structures and classes. Both structures and classes achieve the same goal - they allow you to create custom data types to store and pass data around in your code, but they do this in different ways.

## Introduction to Structs

A structure or `struct` is a flexible data type that allows you to group together related values and model them as a unit.

When creating a `struct` you do not use camelCase, or lower case camelCase. Instead it is common that the name be capotalized as well as the first letter subsequent words. Such as `PointOfSomething`. This is referred to as upper case CamelCase.

{% highlight swift linenos %}
struct Point {

}
{% endhighlight %}

A `struct` can define constants or variables which we call properties to store values. Inside the body of the `struct` you can create `stored properties` and define their type by the following:

{% highlight swift linenos %}
struct Point {
  let x: Int
  let y: Int
}
{% endhighlight %}

Note that we are not assigning any value to these `stored properties`. You can access these `stored properties` and assign them a value outside the `struct`:

{% highlight swift linenos %}
struct Point {
  let x: Int
  let y: Int
}
let coordinatePoint = Point(x: 0, y:0)
{% endhighlight %}

## Instances of Objects

The `struct` definition below is a "blueprint":

{% highlight swift linenos %}
struct Point {
  let x: Int
  let y: Int
}
{% endhighlight %}

The following line is called an "instance of the `struct`".

{% highlight swift linenos %}
let coordinatePoint = Point(x: 0, y:0)
{% endhighlight %}

To create an "instance of the `struct`" we start with the name of the `struct` (Point in this example) followed by an open parentheses. Essentially, this is a special sort of function.

Objects are data structures that contain pieces of information. A `struct` is an object in this sense because it is a data structure that conains information in the form of stored properties.

By creating an object called Point and adding stored properties, we've indicated that this data the x and y coordinate, work together, they are a unit.

We can access the properties that we've added using dot notation much like we can access functions. Now, this instance of Point represents a particular point in our coordinate space or map. So if we want to know the x value at that point we can simply say `coordinatePoint.x`.

Another example:

{% highlight swift linenos %}
struct User {
  let name: String
  var email: String
}
let student = User(name: "matthew", email: "mail@address.com")
student.name
{% endhighlight %}

Another example:

{% highlight swift linenos %}
struct Book {
  let title: String
  let author: String
  let price: Double
}
let myBook = Book(title: "Animal Farm", author: "George Orwell", price: 6.00)
{% endhighlight %}

## Methods

A <a href="https://developer.apple.com/library/content/documentation/Swift/Conceptual/Swift_Programming_Language/Methods.html">method</a> is basically a function that is associated with a particular type:

{% highlight swift linenos %}
struct Point {
  let x: Int
  let y: Int

  /// returns the surrounding points in range of the current one
  func points(inRange range: Int = 1) -> [Point] {

    var results: [Point] = []

    let lowerBoundOfXRange = x - range
    let upperBoundOfXRange = x + range

    let lowerBoundOfYRange = y - range
    let upperBoundOfYRange = y + range

    for xCoordinate in lowerBoundOfXRange...upperBoundOfXRange {
      for yCoordinate in lowerBoundOfYRange...upperBoundOfYRange {
        let coordinatePoint = Point(x: xCoordinate, y: yCoordinate)
        results.append(coordinatePoint)
      }
    }

    return results
  }
}

let coordinatePoint = Point(x: 0, y:0)
coordinatePoint.x
coordinatePoint.points()
{% endhighlight %}

Note that if you place a comment directly above a function (must be three `///`). Xcode will make this the description of your function when you hold option and click it.

## Instance Methods

Instance methods are functions that belong to instances of a particular structure (or class, or enumeration).

The method hasn't been called yet. Once a method is called it becomes an instance:

{% highlight swift linenos %}
let coordinatePoint = Point(x: 0, y:0)
coordinatePoint.points()
let coordinatePointTwo = Point(x: 1, y:2)
coordinatePointTwo.points()
{% endhighlight %}

## Another Example of Structs and Instance Methods

{% highlight swift linenos %}
struct Person {
  let firstName: String
  let lastName: String
  func fullName() -> String {
    return "\(firstName) \(lastName)"
  }
}
let aPerson = Person(firstName: "Matthew", lastName: "Long")
let myFullName = aPerson.fullName()
{% endhighlight %}

## Initializers and Self

Structs in Swift get an automatic initializer method that helps us create an instance of the struct for use.

An initializer is nothing but a special instance method that sets up our class ready for use. Even though it's all done automatically right now, we can write out an initializer method manually to better understand what's going on under the hood:

While normal functions start with `func` initializers start with `init`.

{% highlight swift linenos %}
struct Point {
  let x: Int
  let y: Int

  init(x: Int, y: Int) {
    self.x=x
    self.y=y
  }
  
  /// returns the surrounding points in range of the current one
  func points(inRange range: Int = 1) -> [Point] {

    var results: [Point] = []

    let lowerBoundOfXRange = x - range
    let upperBoundOfXRange = x + range

    let lowerBoundOfYRange = y - range
    let upperBoundOfYRange = y + range

    for xCoordinate in lowerBoundOfXRange...upperBoundOfXRange {
      for yCoordinate in lowerBoundOfYRange...upperBoundOfYRange {
        let coordinatePoint = Point(x: xCoordinate, y: yCoordinate)
        results.append(coordinatePoint)
      }
    }

    return results
  }
}

let coordinatePoint = Point(x: 0, y:0)
coordinatePoint.x
coordinatePoint.points()
{% endhighlight %}

Now, rather than having an automatic initializer created for us, or a memberwise.

As an aside, you will see people use `self` to refer to properties inside an object all the time regardless of whether there is a naming confusion or not. Now this is because prior to the arrival of Swift, when we used Objective-C as the primary language, we always had to use `self` to refer to a stored property. So people just got used to writing it and still do.

Now, the Swift team's official recommendation is that you're required to use it when distinguishing between parameter or argument labels and property names we just did. Otherwise just let Swift infer it automatically.

It's common to always use `self` inside `init` methods but never in any other methods, unless you have to.

Another example:

{% highlight swift linenos %}
struct RGBColor {
  let red: Double
  let green: Double
  let blue: Double
  let alpha: Double
  let description: String
  init(red: Double, green: Double, blue: Double, alpha: Double) {
    self.red = red
    self.green = green
    self.blue = blue
    self.alpha = alpha
    self.description = ("red: \(red), green: \(green), blue: \(blue), alpha: \(alpha)")
  }
}
{% endhighlight %}

## struct syntax recap

A `struct` or structure is one of the objects that we can use in Swift to create custom data types. A `struct` can define stored properties to encapsulate values. A `struct` can also have functions that work on the data associated with these stored properties. And a function associated with an object is called a `method`.

Both the stored properties and the functions that we've seen are scoped to an instance of the `struct`, meaning we can't use it unless we specifically create an instance. To create an instance, we start with the name of the `struct` adn then using memberwise initializer method that Swift automatically creates to assign values to each of the stored properties, we can write out an intializer method ourselves by creating a special method using the `init` keyword.

The purpose of an initializer is to assign values to all the stored properties during creation. You cannot write an `init` method that does not assign an initial value to a stored property. Inside the `init` method, if we need to refer to an instance of the structure, we use the keyword `self`.

{% highlight swift linenos %}
struct Point {
  let x: Int
  let y: Int
  func availablePoints() -> [Point] {}
}
let point = Point(x: 0, y: 0)
{% endhighlight %}

Another example:

{% highlight swift linenos %}
struct Person {
  // These are properties, think of it as things your object HAS
  let name: String
  let age: Int

  // These are methods (functions associated with a type), they are things your object can DO
  func speak() {
    print("I am speaking!")
  }

  func brushTeeth() {
    print("Brushing Teeth")
  }

  // This is the initializer (its a special type of function)
  // You call this function to create an instance of your object
  // It's job is to make sure all of the properties of that object have values
  init(name: String, age: Int) {
    self.name = name
    self.age = age
  } 
}
// Remember Classes/Structures/Enumerations are BLUEPRINTS that define your own data types!
// Now that we have defined what a properties a person has 
// and what a person can do (it's methods), we can create one!

// We do this by calling our initializer function and passing it the values it requires
// To give its properties values

let aPerson: Person = Person(name: "Alia", age: 20)
{% endhighlight %}

## Introduction to Classes

A `class` and a `struct` have many similarities. However, with a `class` there is no automatic behavior with initialization which means we always have to write `init` outselves.

{% highlight swift linenos %}
class Enemy {
  var life: Int = 2
  let position: Point
  init(x: Int, y: Int) {
    self.position = Point(x: x, y: y)
  }
  func decreaseLife(by factor: Int) {
    life -= factor
  }
}
{% endhighlight %}

Another exampple:

{% highlight swift linenos %}
class Shape {
  var numberOfSides: Int
  init(numberOfSides: Int) {
    self.numberOfSides = numberOfSides
  }
}
let someShape = Shape(numberOfSides: 4)
{% endhighlight %}

Another example:

{% highlight swift linenos %}
class Tower {
    let position: Point
    var range: Int = 1
    var strength: Int = 1
    init(x: Int, y: Int) {
        self.position = Point(x: x, y: y)
    }
}
{% endhighlight %}

Another example:

{% highlight swift linenos %}
struct Location {
  let latitude: Double
  let longitude: Double
}
class Business {
  let name: String
  let location: Location
  init(name: String, location: Location) {
    self.name = name
    self.location = location
  }
}
let someBusiness = Business(name: "PandF", location: Location(latitude: 1.0, longitude: 2.0))
{% endhighlight %}

## Helper Methods

When we write a method like the following we won't be calling directly using an instance of the class, we call these `helper methods`.

{% highlight swift linenos %}
class Tower {
  let position: Point
  var range: Int = 1
  var strength: Int = 1
  init(x: Int, y: Int) {
    self.position = Point(x: x, y: y)
  }
  func fire(at enemy: Enemy) {
    if isInRange(of: enemy) {
      enemy.decreaseLife(by: strength)
      print("Gotcha")
    } else {
      print("Darn! Out of range.")
    }
  }
  func isInRange(of enemy: Enemy) -> Bool {
    let availablePositions = position.points(inRange: range)
    for point in availablePositions {
      if point.x == enemy.position.x && point.y == enemy.position.y {
        return true
      }
    }
    return false
  }
}
{% endhighlight %}

It is a common pattern that you use methods to interact with objects instead of manipulating the properties directly.

To put any of this to use we have to create an instance.

#### Quiz

Questions: How do we refer to an instance of a `class` or a `struct` from within the definition of the object?

Answer: `self`

Questions: Instance methods should be narrow in scope and carry out a single task.

Answer: True

Questions: Methods that we do not call directly on an instance but help compute the output for another functions are informally called ____.

Answer: Helper methods

Questions: When creating objects we can only use primitive types (like String, Int, etc) as the types for stored properties.

Answer: False

Questions: Classes generate an automatic member wise initializer to create an instance of the class.

Answer: False

## Inheritance

The most visible difference between structs and classes support inheritance.

{% highlight swift linenos %}
class Enemy {
  var life: Int = 2
  let position: Point
  init(x: Int, y: Int) {
    self.position = Point(x: x, y: y)
  }
  func decreaseLife(by factor: Int) {
    life -= factor
  }
}

class SuperEnemy: Enemy {
  
}
{% endhighlight %}

In the above the body of `SuperEnemy` inherits everything in the body of `Enemy`. A big benefit of this is giving you the ability to write DRY code.

## Overriding Poperties

It is not just as simple as writing a new property to `override` a property in the "parent" class. When a subclass a superclass to create a new class, we're not just creating a new class and copying the contents of that base class into it, we create an inheritance chain. The subclass is connected to its superclass.

When we create an instance of Enemy, we pass in some value to assign to its stored properties. When we create an instance of SuperEnemy however, because it is connected to Enemy through its inheritance chain, we need to mke sure that Enemys properties is given some initial values as well.

There is an order to how we create the subclasses. If the subclass has properties of its own that the superclass doesnt have, we need to first provide the subclass with initial values.

So for example if SuperEnemy had any properties that we added that Enemy didn't have, our first job is to give some initial values to those new properties in SuperEnemy.

Now once the subclass has initial values then we need to provide values for the properties in the base class if they don't have default values.

So again, in this case, SuperEnemy is our subclass, Enemy is our base class. So once we give initial values to any of the new properties in SuperEnemy, we need to go up the inheritance chain, and it's called and give values to all the stored properties in Enemy that dont have default values.

In the new class the property `isSuper` is added. It is a type, `Bool` and we'll set that initial value to `true`.

To initialize this class, we can write an initializer method just like we've done before. We will initialize a SuperEnemy in the exact same way we do a regular Enemy. Subclasses inherit the initializer from the superclass. You can use the `override` keyword to override the initializer from the superclass. This allows you to change the body of the initializer.

In the initializer you can set the new life value.

{% highlight swift linenos %}
class Enemy {
  var life: Int = 2
  let position: Point
  init(x: Int, y: Int) {
    self.position = Point(x: x, y: y)
  }
  func decreaseLife(by factor: Int) {
    life -= factor
  }
}

class SuperEnemy: Enemy {
  let isSuper: Bool = true
  override init(x: Int, y: Int) {
    super.init(x: x, y: y)
    self.life = 50
  }
}
{% endhighlight %}

Inheritance is very powerful mechanism and allows you to create families of classes that build on top of one another.

Another example:

{% highlight swift linenos %}
class Vehicle {
  var numberOfDoors: Int
  var numberOfWheels: Int
    
  init(withDoors doors: Int, andWheels wheels: Int) {
    self.numberOfDoors = doors
    self.numberOfWheels = wheels
  }
}

class Car: Vehicle {
  let numberOfSeats: Int = 4
}

let someCar = Car(withDoors: 4, andWheels: 4)
{% endhighlight %}

## Overriding Methods

To tackle the SuperTower we're going to need a more powerful tower, such as a LaserTower. A LaserTower will need all the same properties of a normal Tower.

First off, when you're faced with the question of "should I create a new class all together or should I create a subclass?" you can answer this question by determining if, for example, a LaserTower "is a" Tower. In this case, yes it is.

We cannot access the stored properties without first initializing Tower. But before we can initialize Tower, we need to initialize LaserTower because our rules. The properties of subclass need to have initial values first and foremost before we can do anything with the superclass.

{% highlight swift linenos %}
class Tower {
  let position: Point
  var range: Int = 1
  var strength: Int = 1
  init(x: Int, y: Int) {
    self.position = Point(x: x, y: y)
  }
  func fire(at enemy: Enemy) {
    if isInRange(of: enemy) {
      enemy.decreaseLife(by: strength)
      print("Gotcha")
    } else {
      print("Darn! Out of range.")
    }
  }
  func isInRange(of enemy: Enemy) -> Bool {
    let availablePositions = position.points(inRange: range)
    for point in availablePositions {
      if point.x == enemy.position.x && point.y == enemy.position.y {
        return true
      }
    }
    return false
  }
}

class LaserTower: Tower {
  override init(x: Int, y: Int) {
    super.init(x: x, y: y)
    self.range = 100
    self.strength = 100
  }
  override func fire(at enemy: Enemy) {
    while enemy.life >= 0 {
      enemy.decreaseLife(by: strength)
    }
    print("Enemy destroyed!")
  }
}
{% endhighlight %}

Another example:

{% highlight swift linenos %}
class Person {
  let firstName: String
  let lastName: String
  
  init(firstName: String, lastName: String) {
    self.firstName = firstName
    self.lastName = lastName
  }
  
  func fullName() -> String {
    return "\(firstName) \(lastName)"
  }
}

class Doctor: Person {
  override func fullName() -> String {
    return "Dr. \(lastName)"
  }
}

let someDoctor = Doctor(firstName: "Matthew", lastName: "Long")
{% endhighlight %}

## Structs vs Classes

Both `struct`s and `class`es give us the ability to create custom data types that contain stored properties and instance methods.

The question is how do we know which one to use and when?

There is one fundamental difference between the two.

Classes implement inheritance and allow us to subclass objects. While thie is a powerful concept, there is another underlying difference that draws a much more distinct line in the sane:

{% highlight swift linenos %}
struct User {
  var fullName: String
  var email: String
  var age: Int
}

var someUser = User(fullName: "Matthew Long", email: "matt@gmail.com", age: 26)
var anotherUser = someUser
someUser.email = "matthew@gmail.com"
anotherUser.email
// matt@gmail.com

class Person {
  var fullName: String
  var email: String
  var age: Int
  init(name: String, email: String, age: Int) {
    self.fullName = name
    self.email = email
    self.age = age
  }
}

var somePerson = Person(name: "Billy", email: "billy@gmail.com", age: 34)
var anotherPerson = somePerson
somePerson.email = "william@gmail.com"
anotherPerson.email
// william@gmail.com
{% endhighlight %}

As you can see when using the `struct` the email does not update to the new value. However, when using the `class` the email does update to the new value.

### Value and Reference Types

A value type is a type, whose underlying value is copied when it is assigned to a new variable or constant or when it is passed into a function. A reference type, on the other hand is not copied when assigned to a new variable or constant or when passed into a function.

Rather than a copy, a reference to the existing instance is used. In our code, we started with a `struct`.

All structs are value types, which means that the values are copied. When we've assigned some user to another user, we didn't really assign some use to another user. What this did was copy the values and assign the new values to another user. This leaves us with two copies of the `struct`. When we modify the value of `someUser`, it doesn't affect another user in any way.

In contract, a `class` is a reference type. When you assign a reference type to another variable, we simply assign a reference.

### Simple Rule For Which to Use

A simple rule, for now, is to use `struct`s to represent simple values as mentioned. A coordinate point is just a set of values. It doesn't really have an identity.

`class`es, on the other hand, are really good at representing more than just values. 

#### Quiz

Question: An `Int` is a value type.

Answer: True

Question: An `Array` is a reference type.

Answer: False

Question: Reference types are not copied when they are assigned to a variable or constant, or when they are passed to a function. Rather than a copy, a reference to the same existing instance is used instead.

Answer: True

Question: A value type is a type whose value is copied when it is assigned to a variable or constant, or when it is passed to a function.

Answer: True